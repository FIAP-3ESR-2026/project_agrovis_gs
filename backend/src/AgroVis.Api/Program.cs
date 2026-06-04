using AgroVis.Api.Data;
using AgroVis.Api.Entities;
using AgroVis.Api.Enums;
using AgroVis.Api.Repositories;
using AgroVis.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// --- Configuração dos Serviços (DI) ---
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Repositories e Services
builder.Services.AddScoped<IPlantacaoRepository, PlantacaoRepository>();
builder.Services.AddScoped<IPlantacaoService, PlantacaoService>();

builder.Services.AddScoped<ILeituraClimaticaRepository, LeituraClimaticaRepository>();
builder.Services.AddScoped<ILeituraClimaticaService, LeituraClimaticaService>();

builder.Services.AddScoped<IAlertaRepository, AlertaRepository>();
builder.Services.AddScoped<IAlertaService, AlertaService>();

builder.Services.AddScoped<ISateliteRepository, SateliteRepository>();
builder.Services.AddScoped<ISateliteService, SateliteService>();

builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();
builder.Services.AddScoped<IDashboardService, DashboardService>();

// Banco de Dados
builder.Services.AddDbContext<AgroVisDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// --- Migrações e Carga Inicial de Dados (Seed) ---
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AgroVisDbContext>();
    
    // Garante que o banco SQLite foi criado
    context.Database.EnsureCreated();

    // Seed: Plantações
    if (!context.Plantacoes.Any())
    {
        var plantacao = new Plantacao
        {
            NomePropriedade = "Fazenda Sol Nascente",
            Cultura = "Soja",
            Localizacao = "Ribeirão Preto - SP",
            AreaHectares = 120.5
        };

        context.Plantacoes.Add(plantacao);
        context.SaveChanges();
    }

    // Seed: Satélites
    if (!context.Satelites.Any())
    {
        var satelite = new Satelite
        {
            Nome = "AgroSat Sentinel-1",
            Origem = "Nova Economia Espacial",
            TipoSensor = "Multiespectral e climático"
        };

        context.Satelites.Add(satelite);
        context.SaveChanges();
    }

    // Seed: Alertas
    if (!context.Alertas.Any())
    {
        var plantacaoInicial = context.Plantacoes.First();

        var alerta = new Alerta
        {
            Titulo = "Risco elevado de seca",
            Mensagem = "A plantação apresenta baixa umidade e previsão de ausência de chuvas nos próximos dias.",
            Tipo = TipoAlerta.Seca,
            NivelRisco = NivelRisco.Alto,
            PlantacaoId = plantacaoInicial.Id
        };

        context.Alertas.Add(alerta);
        context.SaveChanges();
    }
} 


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();