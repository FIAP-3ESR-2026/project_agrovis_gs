using AgroVis.Api.Data;
using AgroVis.Api.Entities;
using AgroVis.Api.Enums;
using AgroVis.Api.Repositories;
using AgroVis.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddDbContext<AgroVisDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<IAlertaRepository, AlertaRepository>();
builder.Services.AddScoped<IAlertaService, AlertaService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AgroVisDbContext>();

    context.Database.EnsureCreated();

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

        var alerta = new Alerta
        {
            Titulo = "Risco elevado de seca",
            Mensagem = "A plantação apresenta baixa umidade e previsão de ausência de chuvas nos próximos dias.",
            Tipo = TipoAlerta.Seca,
            NivelRisco = NivelRisco.Alto,
            PlantacaoId = plantacao.Id
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