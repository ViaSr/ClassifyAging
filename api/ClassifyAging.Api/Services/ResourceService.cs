using Microsoft.EntityFrameworkCore;
using ClassifyAging.Api.Data;
using ClassifyAging.Api.DTOs;

namespace ClassifyAging.Api.Services;

public class ResourceService
{
    private readonly AppDbContext _context;

    public ResourceService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<ResourceDto>> GetAsync(ResourceQueryParams query)
    {
        var q = _context.Resources
            .Include(r => r.Hallmarks)
            .Include(r => r.Tags)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var search = query.Search.ToLower();
            q = q.Where(r =>
                r.Title.ToLower().Contains(search) ||
                r.Description.ToLower().Contains(search) ||
                (r.Authors != null && r.Authors.ToLower().Contains(search))
            );
        }

        if (!string.IsNullOrWhiteSpace(query.Type))
            q = q.Where(r => r.Type == query.Type);

        if (!string.IsNullOrWhiteSpace(query.Difficulty))
            q = q.Where(r => r.Difficulty == query.Difficulty);

        if (!string.IsNullOrWhiteSpace(query.Hallmark))
            q = q.Where(r => r.Hallmarks.Any(h => h.Slug == query.Hallmark));

        if (!string.IsNullOrWhiteSpace(query.Tag))
            q = q.Where(r => r.Tags.Any(t => t.Slug == query.Tag));

        var totalCount = await q.CountAsync();
        var totalPages = (int)Math.Ceiling(totalCount / (double)query.PageSize);

        var items = await q
            .OrderByDescending(r => r.Year ?? 0)
            .ThenBy(r => r.Title)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(r => new ResourceDto(
                r.Id, r.Title, r.Description, r.Url, r.Type, r.Difficulty,
                r.Authors, r.Year, r.ImageUrl,
                r.Hallmarks.Select(h => h.Slug).ToList(),
                r.Tags.Select(t => t.Slug).ToList()
            ))
            .ToListAsync();

        return new PagedResult<ResourceDto>(items, totalCount, query.Page, query.PageSize, totalPages);
    }

    public async Task<ResourceDto?> GetByIdAsync(int id)
    {
        return await _context.Resources
            .Include(r => r.Hallmarks)
            .Include(r => r.Tags)
            .Where(r => r.Id == id)
            .Select(r => new ResourceDto(
                r.Id, r.Title, r.Description, r.Url, r.Type, r.Difficulty,
                r.Authors, r.Year, r.ImageUrl,
                r.Hallmarks.Select(h => h.Slug).ToList(),
                r.Tags.Select(t => t.Slug).ToList()
            ))
            .FirstOrDefaultAsync();
    }
}
