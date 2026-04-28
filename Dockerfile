#Stage 1: Build the React client
FROM node:20-alpine AS client-build
WORKDIR /client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Build the .NET API
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS api-build
WORKDIR /src
COPY api/ClassifyAging.Api/*.csproj ./
RUN dotnet restore
COPY api/ClassifyAging.Api/ ./
COPY --from=client-build /client/dist ./wwwroot
RUN dotnet publish -c Release -o /app /p:UseAppHost=false

# Stage 3: Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=api-build /app ./
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "ClassifyAging.Api.dll"]
