namespace ClassifyAging.Api.Models;

public class ResourceTag
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public ICollection<Resource> Resources { get; set; } = new List<Resource>();
}
