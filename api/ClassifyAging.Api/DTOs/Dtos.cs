namespace ClassifyAging.Api.DTOs;

public record HallmarkDto(
    int Id,
    string Name,
    string Slug,
    string Summary,
    string Description,
    string Category,
    string IconName,
    int SortOrder
);

public record ResourceDto(
    int Id,
    string Title,
    string Description,
    string Url,
    string Type,
    string Difficulty,
    string? Authors,
    int? Year,
    string? ImageUrl,
    List<string> Hallmarks,
    List<string> Tags
);

public record ResourceQueryParams(
    string? Search,
    string? Type,
    string? Difficulty,
    string? Hallmark,
    string? Tag,
    int Page = 1,
    int PageSize = 20
);

public record PagedResult<T>(
    List<T> Items,
    int TotalCount,
    int Page,
    int PageSize,
    int TotalPages
);

public record ChatRequest(string Message, List<ChatMessage>? History);
public record ChatMessage(string Role, string Content);
public record ChatResponse(string Reply);
public record ChatStatusResponse(bool Enabled);
