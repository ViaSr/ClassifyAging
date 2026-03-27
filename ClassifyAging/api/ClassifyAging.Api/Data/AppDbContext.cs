using Microsoft.EntityFrameworkCore;
using ClassifyAging.Api.Models;

namespace ClassifyAging.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Hallmark> Hallmarks => Set<Hallmark>();
    public DbSet<Resource> Resources => Set<Resource>();
    public DbSet<ResourceTag> ResourceTags => Set<ResourceTag>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Hallmark>(entity =>
        {
            entity.HasIndex(h => h.Slug).IsUnique();
            entity.HasMany(h => h.Resources)
                  .WithMany(r => r.Hallmarks)
                  .UsingEntity("HallmarkResource");
        });

        modelBuilder.Entity<Resource>(entity =>
        {
            entity.HasMany(r => r.Tags)
                  .WithMany(t => t.Resources)
                  .UsingEntity("ResourceResourceTag");
        });

        modelBuilder.Entity<ResourceTag>(entity =>
        {
            entity.HasIndex(t => t.Slug).IsUnique();
        });
    }
}
