using AgroVis.Api.Dtos;
using AgroVis.Api.Enums;

namespace AgroVis.Api.Services;

public interface IAlertaService
{
    Task<List<AlertaResponseDto>> ListarAsync(
        int? plantacaoId,
        TipoAlerta? tipo,
        NivelRisco? nivelRisco,
        bool? resolvido
    );

    Task<AlertaResponseDto?> BuscarPorIdAsync(int id);

    Task<AlertaResponseDto> CriarAsync(AlertaCreateDto dto);

    Task<bool> MarcarComoResolvidoAsync(int id);
}