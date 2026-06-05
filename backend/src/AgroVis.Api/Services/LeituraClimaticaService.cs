using AgroVis.Api.Dtos;
using AgroVis.Api.Entities;
using AgroVis.Api.Enums;
using AgroVis.Api.Repositories;

namespace AgroVis.Api.Services;

public class LeituraClimaticaService : ILeituraClimaticaService
{
    private readonly ILeituraClimaticaRepository _leituraRepository;
    private readonly IAlertaRepository _alertaRepository;

    public LeituraClimaticaService(
        ILeituraClimaticaRepository leituraRepository,
        IAlertaRepository alertaRepository)
    {
        _leituraRepository = leituraRepository;
        _alertaRepository = alertaRepository;
    }

    public async Task<List<LeituraClimaticaResponseDto>> ListarAsync()
    {
        var leituras = await _leituraRepository.ListarAsync();

        return leituras.Select(MapearParaResponse).ToList();
    }

    public async Task<LeituraClimaticaResponseDto?> BuscarPorIdAsync(int id)
    {
        var leitura = await _leituraRepository.BuscarPorIdAsync(id);

        if (leitura is null)
        {
            return null;
        }

        return MapearParaResponse(leitura);
    }

    public async Task<LeituraClimaticaResponseDto?> CriarAsync(LeituraClimaticaCreateDto dto)
    {
        var plantacaoExiste = await _leituraRepository.PlantacaoExisteAsync(dto.PlantacaoId);
        var sateliteExiste = await _leituraRepository.SateliteExisteAsync(dto.SateliteId);

        if (!plantacaoExiste || !sateliteExiste)
        {
            return null;
        }

        var leitura = new LeituraClimatica
        {
            TemperaturaCelsius = dto.TemperaturaCelsius,
            UmidadePercentual = dto.UmidadePercentual,
            VelocidadeVentoKmh = dto.VelocidadeVentoKmh,
            PrecipitacaoMm = dto.PrecipitacaoMm,
            ObservacaoVisual = dto.ObservacaoVisual,
            SateliteId = dto.SateliteId,
            PlantacaoId = dto.PlantacaoId
        };

        var leituraCriada = await _leituraRepository.CriarAsync(leitura);

        await GerarAlertasAutomaticosAsync(leituraCriada);

        return MapearParaResponse(leituraCriada);
    }

    private async Task GerarAlertasAutomaticosAsync(LeituraClimatica leitura)
    {
        if (leitura.UmidadePercentual <= 30 && leitura.PrecipitacaoMm <= 2)
        {
            await CriarAlertaAsync(
                leitura.PlantacaoId,
                "Risco de seca identificado",
                "A leitura climática indica baixa umidade e ausência de chuva significativa. Recomenda-se avaliar irrigação preventiva.",
                TipoAlerta.Seca,
                NivelRisco.Alto
            );
        }

        if (leitura.TemperaturaCelsius >= 38)
        {
            await CriarAlertaAsync(
                leitura.PlantacaoId,
                "Temperatura extrema detectada",
                "A temperatura registrada está acima do limite seguro para a cultura monitorada.",
                TipoAlerta.Temperatura,
                NivelRisco.Alto
            );
        }

        if (leitura.PrecipitacaoMm >= 80)
        {
            await CriarAlertaAsync(
                leitura.PlantacaoId,
                "Risco de alagamento",
                "O volume de chuva registrado é elevado e pode afetar a drenagem da área monitorada.",
                TipoAlerta.Enchente,
                NivelRisco.Critico
            );
        }

        if (leitura.VelocidadeVentoKmh >= 70)
        {
            await CriarAlertaAsync(
                leitura.PlantacaoId,
                "Vento forte detectado",
                "A velocidade do vento registrada pode causar danos físicos à plantação.",
                TipoAlerta.Clima,
                NivelRisco.Medio
            );
        }
    }

    private async Task CriarAlertaAsync(
        int plantacaoId,
        string titulo,
        string mensagem,
        TipoAlerta tipo,
        NivelRisco nivelRisco)
    {
        var alerta = new Alerta
        {
            PlantacaoId = plantacaoId,
            Titulo = titulo,
            Mensagem = mensagem,
            Tipo = tipo,
            NivelRisco = nivelRisco
        };

        await _alertaRepository.CriarAsync(alerta);
    }

    private static LeituraClimaticaResponseDto MapearParaResponse(LeituraClimatica leitura)
    {
        return new LeituraClimaticaResponseDto
        {
            Id = leitura.Id,
            TemperaturaCelsius = leitura.TemperaturaCelsius,
            UmidadePercentual = leitura.UmidadePercentual,
            VelocidadeVentoKmh = leitura.VelocidadeVentoKmh,
            PrecipitacaoMm = leitura.PrecipitacaoMm,
            ObservacaoVisual = leitura.ObservacaoVisual,
            DataLeitura = leitura.DataLeitura,
            SateliteId = leitura.SateliteId,
            PlantacaoId = leitura.PlantacaoId,
            NomeSatelite = leitura.Satelite?.Nome,
            NomePropriedade = leitura.Plantacao?.NomePropriedade
        };
    }
}