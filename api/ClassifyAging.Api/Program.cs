using Microsoft.EntityFrameworkCore;
using ClassifyAging.Api.Data;
using ClassifyAging.Api.Options;
using ClassifyAging.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")
        ?? "Data Source=classifyaging.db"));

// Options
builder.Services.Configure<ChatOptions>(builder.Configuration.GetSection(ChatOptions.SectionName));

// Services
builder.Services.AddScoped<HallmarkService>();
builder.Services.AddScoped<ResourceService>();
builder.Services.AddSingleton<AiChatService>();
builder.Services.AddHttpClient("Anthropic");

// API
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "ClassifyAging API",
        Version = "v1",
        Description = "API for the ClassifyAging advocacy platform — making the case for reclassifying aging as a treatable disease."
    });
});

// CORS for React dev server
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Initialize database with seed data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await DbInitializer.InitializeAsync(context);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("DevCors");

// Serve the built React SPA from wwwroot/ in production.
// In Development the wwwroot folder is typically empty (client runs on Vite :5173),
// so these middlewares are effectively no-ops and the SPA fallback only fires for
// unmatched API routes. In a published deploy, wwwroot contains the Vite build output
// and MapFallbackToFile hands React Router every non-/api route.
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
