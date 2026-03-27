using Microsoft.AspNetCore.Mvc;
using ClassifyAging.Api.Services;
using ClassifyAging.Api.DTOs;

namespace ClassifyAging.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly AiChatService _chatService;

    public ChatController(AiChatService chatService)
    {
        _chatService = chatService;
    }

    /// <summary>
    /// Send a message to the AI research assistant. Optionally include conversation history for context.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<ChatResponse>> Chat([FromBody] ChatRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Message))
            return BadRequest("Message cannot be empty.");

        var reply = await _chatService.GetResponseAsync(request);
        return Ok(new ChatResponse(reply));
    }
}
