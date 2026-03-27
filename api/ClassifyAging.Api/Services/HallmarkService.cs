using Microsoft.EntityFrameworkCore;
using ClassifyAging.Api.Data;
using ClassifyAging.Api.DTOs;

namespace ClassifyAging.Api.Services;

public class HallmarkService
{
    private readonly AppDbContext _context;

    public HallmarkService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<HallmarkDto>> GetAllAsync()
    {
        return await _context.Hallmarks
            .OrderBy(h => h.SortOrder)
            .Select(h => new HallmarkDto(
                h.Id, h.Name, h.Slug, h.Summary, h.Description,
                h.Category, h.IconName, h.SortOrder
            ))
            .ToListAsync();
    }

    public async Task<HallmarkDto?> GetBySlugAsync(string slug)
    {
        return await _context.Hallmarks
            .Where(h => h.Slug == slug)
            .Select(h => new HallmarkDto(
                h.Id, h.Name, h.Slug, h.Summary, h.Description,
                h.Category, h.IconName, h.SortOrder
            ))
            .FirstOrDefaultAsync();
    }
}
