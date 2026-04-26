# ClassifyAging #
See the full website here https://classifyaging.onrender.com


**Aging is the leading cause of human suffering and death. It's time we treated it like one.**


ClassifyAging is a full-stack advocacy and research platform making the scientific case for reclassifying biological aging (senescence) as a treatable disease — not an inevitability.

## The Argument

Every major disease that kills humans — cancer, cardiovascular disease, Alzheimer's, diabetes — shares a single dominant risk factor: **age**. Yet aging itself is not classified as a disease by the FDA, blocking funding, clinical trials, and drug approvals that could target the root cause rather than individual symptoms.


The science is clear:
- Aging has identifiable biomarkers (telomere attrition, epigenetic drift, cellular senescence)
- Aging causes measurable, progressive functional decline
- Aging dramatically increases morbidity and mortality
- Emerging interventions (senolytics, rapamycin analogs, epigenetic reprogramming) demonstrate it is **treatable**

The only barrier to classification is cultural inertia — not evidence.

## Tech Stack
A full-stack web platform built with .NET 8 and React, making the 
scientific case for reclassifying biological aging as a treatable 
disease. Includes a research library, data visualizations, and an 
AI-powered research assistant built on the Claude API.

### Backend — .NET 8 Web API
- ASP.NET Core 8 with clean architecture (Controllers → Services → Repositories)
- Entity Framework Core with SQLite (swappable to SQL Server/PostgreSQL)
- RESTful API with Swagger/OpenAPI documentation
- AI chat endpoint powered by Claude API

### Frontend — React + Vite
- Interactive data visualizations (Chart.js / Recharts)
- Searchable research resource library
- AI-powered research assistant chat panel
- Responsive, accessible design

## Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- An [Anthropic API key](https://console.anthropic.com/) for the AI chat feature

### Run the API
```bash
cd api/ClassifyAging.Api
dotnet restore
dotnet run
```
The API will be available at `https://localhost:5001` with Swagger UI at `/swagger`.

### Run the Frontend
```bash
cd client
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`.

### Configuration
Copy `api/ClassifyAging.Api/appsettings.example.json` to `appsettings.json` and add your Anthropic API key:
```json
{
  "AnthropicApiKey": "your-key-here"
}
```

## Project Structure
```
ClassifyAging/
├── api/
│   └── ClassifyAging.Api/
│       ├── Controllers/       # API endpoints
│       ├── Services/          # Business logic
│       ├── Models/            # Entity models
│       ├── DTOs/              # Data transfer objects
│       ├── Data/              # EF Core context & seed data
│       └── Program.cs         # App entry point
├── client/
│   └── src/
│       ├── components/        # Reusable UI components
│       ├── pages/             # Page-level components
│       ├── services/          # API client functions
│       └── hooks/             # Custom React hooks
└── README.md
```

## Roadmap

- [x] **Phase 1 — MVP**: Landing page, hallmarks explainer, resource library, AI chat assistant
- [ ] **Phase 2 — Engagement**: Petition system, share toolkit, blog/CMS, RAG-enhanced AI
- [ ] **Phase 3 — Community**: User accounts, discussion forum, citizen science data collection

## Key Resources

- [WHO ICD-11 Extension Code XT9T](https://icd.who.int/) — "Ageing-related" classification
- [TAME Trial](https://www.afar.org/tame-trial) — First FDA clinical trial targeting aging itself
- [Hallmarks of Aging (López-Otín et al., 2023)](https://doi.org/10.1016/j.cell.2022.11.001) — The foundational framework

## Contributing

This is an open-source advocacy project. If you're a researcher, developer, or someone who believes aging should be treated as the disease it is — contributions are welcome.

## License

MIT
