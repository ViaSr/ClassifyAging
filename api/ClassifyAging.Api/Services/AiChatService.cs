using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using ClassifyAging.Api.DTOs;
using ClassifyAging.Api.Options;
using Microsoft.Extensions.Options;
using System.Runtime.CompilerServices;

namespace ClassifyAging.Api.Services;

public class AiChatService
{
    private readonly HttpClient _httpClient;
    private readonly string? _apiKey;
    private readonly IOptionsMonitor<ChatOptions> _options;
    private readonly ILogger<AiChatService> _logger;

    private const string SystemPrompt = """
        You are the ClassifyAging Research Assistant — an expert in the biology of aging (senescence) 
        and the scientific, economic, and policy arguments for reclassifying aging as a treatable disease.

        Your knowledge covers:
        - The 12 hallmarks of aging (López-Otín et al., 2023): genomic instability, telomere attrition, 
          epigenetic alterations, loss of proteostasis, disabled macroautophagy, deregulated nutrient sensing, 
          mitochondrial dysfunction, cellular senescence, stem cell exhaustion, altered intercellular 
          communication, chronic inflammation, and dysbiosis.
        - Geroprotective interventions: senolytics (dasatinib+quercetin, fisetin, navitoclax), rapamycin/rapalogs, 
          metformin, NAD+ precursors (NMN, NR), spermidine, epigenetic reprogramming (Yamanaka factors), 
          caloric restriction, and exercise.
        - Key clinical trials: TAME (Targeting Aging with Metformin), UNITY Biotechnology senolytic trials, 
          Altos Labs reprogramming research.
        - Policy milestones: WHO ICD-11 XT9T extension code, FDA's evolving stance on aging indications.
        - The economic argument: slowing aging by 2.2 years is estimated at $83 trillion in value over 50 years.
        - The philosophical and ethical case: aging causes more suffering than any single disease.

        Guidelines:
        - Be scientifically accurate. Cite specific studies, researchers, and data when possible.
        - Be persuasive but honest. Acknowledge limitations and ongoing debates in the field.
        - When asked about specific interventions, include both the evidence for and any risks or caveats.
        - Frame aging as a biological process with identifiable mechanisms, biomarkers, and emerging treatments.
        - Be accessible to non-scientists while maintaining scientific rigor.
        - If you don't know something, say so rather than speculating.
        - Keep responses focused and concise — aim for 2-4 paragraphs unless more detail is requested.
        """;

    public AiChatService(
        IConfiguration configuration,
        IHttpClientFactory httpClientFactory,
        IOptionsMonitor<ChatOptions> options,
        ILogger<AiChatService> logger)
    {
        _httpClient = httpClientFactory.CreateClient("Anthropic");
        _apiKey = configuration["AnthropicApiKey"];
        _options = options;
        _logger = logger;

        if (string.IsNullOrEmpty(_apiKey))
            _logger.LogWarning("AnthropicApiKey not configured. Chat endpoints will fail when called.");
    }

    public async Task<string> GetResponseAsync(ChatRequest request)
    {
        var messages = new List<object>();

        // Include conversation history if provided
        if (request.History != null)
        {
            foreach (var msg in request.History)
            {
                messages.Add(new { role = msg.Role, content = msg.Content });
            }
        }

        // Add the current user message
        messages.Add(new { role = "user", content = request.Message });

        if (string.IsNullOrEmpty(_apiKey))
            return "The AI assistant is not configured on this server.";

        var payload = new
        {
            model = _options.CurrentValue.Model,
            max_tokens = 1024,
            system = SystemPrompt,
            messages
        };

        var json = JsonSerializer.Serialize(payload);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        _httpClient.DefaultRequestHeaders.Clear();
        _httpClient.DefaultRequestHeaders.Add("x-api-key", _apiKey);
        _httpClient.DefaultRequestHeaders.Add("anthropic-version", "2023-06-01");

        try
        {
            var response = await _httpClient.PostAsync("https://api.anthropic.com/v1/messages", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("Claude API error {StatusCode}: {Body}", response.StatusCode, responseBody);
                return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
            }

            using var doc = JsonDocument.Parse(responseBody);
            var textContent = doc.RootElement
                .GetProperty("content")
                .EnumerateArray()
                .Where(c => c.GetProperty("type").GetString() == "text")
                .Select(c => c.GetProperty("text").GetString())
                .FirstOrDefault();

            return textContent ?? "I wasn't able to generate a response. Please try rephrasing your question.";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calling Claude API");
            return "I'm sorry, I encountered an error processing your question. Please try again.";
        }
    }
    public async IAsyncEnumerable<string> StreamResponseAsync(
    ChatRequest request,
    [EnumeratorCancellation] CancellationToken ct = default)
{
    var messages = new List<object>();
    if (request.History != null)
    {
        foreach (var msg in request.History)
            messages.Add(new { role = msg.Role, content = msg.Content });
    }
    messages.Add(new { role = "user", content = request.Message });

    if (string.IsNullOrEmpty(_apiKey))
    {
        yield return "The AI assistant is not configured on this server.";
        yield break;
    }

    var payload = new
    {
        model = _options.CurrentValue.Model,
        max_tokens = 1024,
        system = SystemPrompt,
        messages,
        stream = true,
    };

    var json = JsonSerializer.Serialize(payload);
    using var httpRequest = new HttpRequestMessage(
        HttpMethod.Post, "https://api.anthropic.com/v1/messages")
    {
        Content = new StringContent(json, Encoding.UTF8, "application/json"),
    };
    httpRequest.Headers.Add("x-api-key", _apiKey);
    httpRequest.Headers.Add("anthropic-version", "2023-06-01");

    // KEY: ResponseHeadersRead — don't buffer the whole body
    using var response = await _httpClient.SendAsync(
        httpRequest, HttpCompletionOption.ResponseHeadersRead, ct);

    if (!response.IsSuccessStatusCode)
    {
        var body = await response.Content.ReadAsStringAsync(ct);
        _logger.LogError("Claude API error {Status}: {Body}", response.StatusCode, body);
        yield return "I'm having trouble connecting to my knowledge base right now.";
        yield break;
    }

    using var stream = await response.Content.ReadAsStreamAsync(ct);
    using var reader = new StreamReader(stream);

    while (!reader.EndOfStream)
    {
        var line = await reader.ReadLineAsync(ct);
        if (string.IsNullOrEmpty(line)) continue;      // blank line = event terminator
        if (!line.StartsWith("data: ")) continue;      // skip "event:" lines, pings, etc.

        var dataJson = line["data: ".Length..];

        using var doc = JsonDocument.Parse(dataJson);
        var root = doc.RootElement;
        if (root.TryGetProperty("type", out var typeProp) &&
            typeProp.GetString() == "content_block_delta" &&
            root.TryGetProperty("delta", out var delta) &&
            delta.TryGetProperty("text", out var text))
        {
            yield return text.GetString() ?? "";
        }
    }
}
}
