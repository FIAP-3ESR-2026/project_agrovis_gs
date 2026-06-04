using AgroVis.Api.Dtos;
using AgroVis.Api.Entities;
using AgroVis.Api.Enums;
using AgroVis.Api.Repositories;

namespace AgroVis.Api.Services;

public class AlertaService : IAlertaService
{
    private readonly IAlertaRepository _alertaRepository;

    public AlertaService(IAlertaRepository alertaRepository)
    {
        _alertaRepository = alertaRepository;
    }

    public async Task<List<AlertaResponseDto>> ListarAsync(
        int? plantacaoId,
        TipoAlerta? tipo,
        NivelRisco? nivelRisco,
        bool? resolvido
    )
    {
        var alertas = await _alertaRepository.ListarAsync(
            plantacaoId,
            tipo,
            nivelRisco,
            resolvido
        );

        return alertas.Select(MapearParaResponse).ToList();
    }

    public async Task<AlertaResponseDto?> BuscarPorIdAsync(int id)
    {
        var alerta = await _alertaRepository.BuscarPorIdAsync(id);

        if (alerta is null)
        {
            return null;
        }

        return MapearParaResponse(alerta);
    }

    public async Task<AlertaResponseDto> CriarAsync(AlertaCreateDto dto)
    {
        var alerta = new Alerta
        {
            Titulo = dto.Titulo,
            Mensagem = dto.Mensagem,
            Tipo = dto.Tipo,
            NivelRisco = dto.NivelRisco,
            PlantacaoId = dto.PlantacaoId
        };

        var alertaCriado = await _alertaRepository.CriarAsync(alerta);

        return MapearParaResponse(alertaCriado);
    }

    public async Task<bool> MarcarComoResolvidoAsync(int id)
    {
        return await _alertaRepository.MarcarComoResolvidoAsync(id);
    }

    private static AlertaResponseDto MapearParaResponse(Alerta alerta)
    {
        return new AlertaResponseDto
        {
            Id = alerta.Id,
            Titulo = alerta.Titulo,
            Mensagem = alerta.Mensagem,
            Tipo = alerta.Tipo,
            TipoDescricao = alerta.Tipo.ToString(),
            NivelRisco = alerta.NivelRisco,
            NivelRiscoDescricao = alerta.NivelRisco.ToString(),
            Resolvido = alerta.Resolvido,
            CriadoEm = alerta.CriadoEm,
            PlantacaoId = alerta.PlantacaoId,
            NomePropriedade = alerta.Plantacao?.NomePropriedade,
            Cultura = alerta.Plantacao?.Cultura
        };
    }
}