using AgroVis.Api.Dtos;
using AgroVis.Api.Entities;
using AgroVis.Api.Enums;
using AgroVis.Api.Repositories;

namespace AgroVis.Api.Services;

public class DashboardService : IDashboardService
{
    private readonly IDashboardRepository _dashboardRepository;

    public DashboardService(IDashboardRepository dashboardRepository)
    {
        _dashboardRepository = dashboardRepository;
    }

    public async Task<DashboardPlantacaoResponseDto?> ObterResumoPlantacaoAsync(int plantacaoId)
    {
        var plantacao = await _dashboardRepository.BuscarResumoPorPlantacaoAsync(plantacaoId);

        if (plantacao is null)
        {
            return null;
        }

        var alertas = plantacao.Alertas;
        var leituras = plantacao.LeiturasClimaticas;

        var ultimaLeitura = leituras
            .OrderByDescending(leitura => leitura.DataLeitura)
            .FirstOrDefault();

        var alertasPendentes = alertas
            .Where(alerta => !alerta.Resolvido)
            .ToList();

        var totalAlertas = alertas.Count;
        var totalPendentes = alertasPendentes.Count;
        var totalResolvidos = alertas.Count(alerta => alerta.Resolvido);
        var totalCriticos = alertasPendentes.Count(alerta => alerta.NivelRisco == NivelRisco.Critico);
        var totalAltos = alertasPendentes.Count(alerta => alerta.NivelRisco == NivelRisco.Alto);

        var statusGeral = DefinirStatusGeral(totalCriticos, totalAltos, totalPendentes, ultimaLeitura);
        var recomendacao = DefinirRecomendacaoOperacional(statusGeral);

        return new DashboardPlantacaoResponseDto
        {
            PlantacaoId = plantacao.Id,
            NomePropriedade = plantacao.NomePropriedade,
            Cultura = plantacao.Cultura,
            Localizacao = plantacao.Localizacao,
            AreaHectares = plantacao.AreaHectares,

            TotalAlertas = totalAlertas,
            AlertasPendentes = totalPendentes,
            AlertasResolvidos = totalResolvidos,
            AlertasCriticos = totalCriticos,
            AlertasAltos = totalAltos,

            UltimaTemperaturaCelsius = ultimaLeitura?.TemperaturaCelsius,
            UltimaUmidadePercentual = ultimaLeitura?.UmidadePercentual,
            UltimaVelocidadeVentoKmh = ultimaLeitura?.VelocidadeVentoKmh,
            UltimaPrecipitacaoMm = ultimaLeitura?.PrecipitacaoMm,
            DataUltimaLeitura = ultimaLeitura?.DataLeitura,

            StatusGeral = statusGeral,
            RecomendacaoOperacional = recomendacao,

            UltimosAlertas = alertas
                .OrderBy(alerta => alerta.Resolvido)
                .ThenByDescending(alerta => alerta.NivelRisco)
                .ThenByDescending(alerta => alerta.CriadoEm)
                .Take(5)
                .Select(MapearAlertaResumo)
                .ToList()
        };
    }

    private static string DefinirStatusGeral(
        int alertasCriticos,
        int alertasAltos,
        int alertasPendentes,
        LeituraClimatica? ultimaLeitura)
    {
        if (alertasCriticos > 0)
        {
            return "Crítico";
        }

        if (alertasAltos > 0)
        {
            return "Atenção";
        }

        if (ultimaLeitura is not null &&
            ultimaLeitura.UmidadePercentual <= 30 &&
            ultimaLeitura.PrecipitacaoMm <= 2)
        {
            return "Risco de seca";
        }

        if (ultimaLeitura is not null &&
            ultimaLeitura.TemperaturaCelsius >= 38)
        {
            return "Calor extremo";
        }

        if (alertasPendentes > 0)
        {
            return "Monitoramento";
        }

        return "Estável";
    }

    private static string DefinirRecomendacaoOperacional(string statusGeral)
    {
        return statusGeral switch
        {
            "Crítico" => "Priorize a análise imediata dos alertas críticos e avalie ações emergenciais na área monitorada.",
            "Atenção" => "Acompanhe os alertas de alto risco e verifique as condições da plantação nas próximas horas.",
            "Risco de seca" => "Avalie a necessidade de irrigação preventiva e acompanhe a previsão de chuva.",
            "Calor extremo" => "Monitore o estresse térmico da cultura e avalie medidas de proteção contra altas temperaturas.",
            "Monitoramento" => "Continue acompanhando os alertas pendentes e mantenha a análise climática atualizada.",
            _ => "A plantação não apresenta sinais críticos no momento. Continue o monitoramento preventivo."
        };
    }

    private static AlertaResumoDto MapearAlertaResumo(Alerta alerta)
    {
        return new AlertaResumoDto
        {
            Id = alerta.Id,
            Titulo = alerta.Titulo,
            Tipo = alerta.Tipo,
            TipoDescricao = alerta.Tipo.ToString(),
            NivelRisco = alerta.NivelRisco,
            NivelRiscoDescricao = alerta.NivelRisco.ToString(),
            Resolvido = alerta.Resolvido,
            CriadoEm = alerta.CriadoEm
        };
    }
}