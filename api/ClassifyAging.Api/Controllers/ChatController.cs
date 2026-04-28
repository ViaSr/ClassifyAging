using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ClassifyAging.Api.Options;
using ClassifyAging.Api.Services;
using ClassifyAging.Api.DTOs;
using System.Text.Json;

namespace ClassifyAging.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly AiChatService _chatService;
    private readonly IOptionsMonitor<ChatOptions> _options;

    public ChatController(AiChatService chatService, IOptionsMonitor<ChatOptions> options)
    {
        _chatService = chatService;
        _options = options;
    }

    /// Reports is AI feature is set to enabled/true in ChatOptions. UI polls this to decide between rendering the chat widget and an "offline" notice.
    [HttpGet("status")]
    public ActionResult<ChatStatusResponse> Status()
    {
        return Ok(new ChatStatusResponse(_options.CurrentValue.Enabled));
    }

    /// Send a message to the AI. Optionally include conversation history for context(REVISIT).
    [HttpPost]
    public async Task<ActionResult<ChatResponse>> Chat([FromBody] ChatRequest request)
    {
        if (!_options.CurrentValue.Enabled)
            return StatusCode(503, new { error = "Chat is currently disabled." });

        if (string.IsNullOrWhiteSpace(request.Message))
            return BadRequest("Message cannot be empty.");

        var reply = await _chatService.GetResponseAsync(request);
        return Ok(new ChatResponse(reply));
    }

    [HttpPost("stream")]
    public async Task StreamChat([FromBody] ChatRequest request, CancellationToken ct)
    {
        if (!_options.CurrentValue.Enabled)
        {
            Response.StatusCode = 503;
            await Response.WriteAsJsonAsync(new { error = "Chat is currently disabled." }, ct);
            return;
        }

        Response.ContentType = "text/event-stream";
        Response.Headers.Append("Cache-Control", "no-cache");
        Response.Headers.Append("X-Accel-Buffering", "no"); // disables nginx buffering

        await foreach (var chunk in _chatService.StreamResponseAsync(request, ct))
        {
            await Response.WriteAsync($"data: {JsonSerializer.Serialize(chunk)}\n\n", ct);
            await Response.Body.FlushAsync(ct);
        }
    }
}
