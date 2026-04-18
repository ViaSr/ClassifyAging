namespace ClassifyAging.Api.Options;

public class ChatOptions
{
    public const string SectionName = "Chat";

    public bool Enabled { get; set; }
    public string Model { get; set; } = "claude-sonnet-4-6";
}
