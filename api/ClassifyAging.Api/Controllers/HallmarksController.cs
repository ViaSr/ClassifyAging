using Microsoft.AspNetCore.Mvc;
using ClassifyAging.Api.Services;
using ClassifyAging.Api.DTOs;

namespace ClassifyAging.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HallmarksController : ControllerBase
{
    private readonly HallmarkService _service;

    public HallmarksController(HallmarkService service)
    {
        _service = service;
    }

    /// Get all 12 hallmarks of aging, ordered by category and sort order.
    [HttpGet]
    public async Task<ActionResult<List<HallmarkDto>>> GetAll()
    {
        var hallmarks = await _service.GetAllAsync();
        return Ok(hallmarks);
    }

 
    /// Get a single hallmark by its URL slug.
    [HttpGet("{slug}")]
    public async Task<ActionResult<HallmarkDto>> GetBySlug(string slug)
    {
        var hallmark = await _service.GetBySlugAsync(slug);
        if (hallmark == null) return NotFound();
        return Ok(hallmark);
    }
}
