using Microsoft.AspNetCore.Mvc;
using ClassifyAging.Api.Services;
using ClassifyAging.Api.DTOs;

namespace ClassifyAging.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResourcesController : ControllerBase
{
    private readonly ResourceService _service;

    public ResourcesController(ResourceService service)
    {
        _service = service;
    }

    /// Search and filter resources with pagination.
    [HttpGet]
    public async Task<ActionResult<PagedResult<ResourceDto>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] string? type,
        [FromQuery] string? difficulty,
        [FromQuery] string? hallmark,
        [FromQuery] string? tag,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = new ResourceQueryParams(search, type, difficulty, hallmark, tag, page, pageSize);
        var result = await _service.GetAsync(query);
        return Ok(result);
    }

    /// Get a single resource by ID.
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ResourceDto>> GetById(int id)
    {
        var resource = await _service.GetByIdAsync(id);
        if (resource == null) return NotFound();
        return Ok(resource);
    }
}
