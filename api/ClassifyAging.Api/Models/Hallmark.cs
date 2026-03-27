namespace ClassifyAging.Api.Models;

public class Hallmark
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public required string Summary { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; } // Primary, Antagonistic, Integrative
    public required string IconName { get; set; }
    public int SortOrder { get; set; }
    public ICollection<Resource> Resources { get; set; } = new List<Resource>();
}
