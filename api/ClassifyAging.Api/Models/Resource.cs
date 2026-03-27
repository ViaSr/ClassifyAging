namespace ClassifyAging.Api.Models;

public class Resource
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Url { get; set; }
    public required string Type { get; set; } // Paper, Organization, ClinicalTrial, Book, Video, News
    public required string Difficulty { get; set; } // Beginner, Intermediate, Advanced
    public string? Authors { get; set; }
    public int? Year { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Many-to-many with Hallmarks via join table
    public ICollection<Hallmark> Hallmarks { get; set; } = new List<Hallmark>();
    public ICollection<ResourceTag> Tags { get; set; } = new List<ResourceTag>();
}
