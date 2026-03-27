using Microsoft.EntityFrameworkCore;
using ClassifyAging.Api.Data.Seed;

namespace ClassifyAging.Api.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(AppDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        // Skip if already seeded
        if (await context.Hallmarks.AnyAsync())
            return;

        var hallmarks = SeedData.GetHallmarks();
        var tags = SeedData.GetTags();
        var resources = SeedData.GetResources();

        context.Hallmarks.AddRange(hallmarks);
        context.ResourceTags.AddRange(tags);
        context.Resources.AddRange(resources);
        await context.SaveChangesAsync();

        // Link resources to hallmarks
        foreach (var (resourceId, hallmarkId) in SeedData.GetResourceHallmarkLinks())
        {
            var resource = await context.Resources.FindAsync(resourceId);
            var hallmark = await context.Hallmarks.FindAsync(hallmarkId);
            if (resource != null && hallmark != null)
                resource.Hallmarks.Add(hallmark);
        }

        // Link resources to tags
        foreach (var (resourceId, tagId) in SeedData.GetResourceTagLinks())
        {
            var resource = await context.Resources.FindAsync(resourceId);
            var tag = await context.ResourceTags.FindAsync(tagId);
            if (resource != null && tag != null)
                resource.Tags.Add(tag);
        }

        await context.SaveChangesAsync();
    }
}
