using AgroVis.Api.Dtos;

namespace AgroVis.Api.Services;

public interface IAlertaService
{
    Task<List<AlertaResponseDto>> ListarAsync();

    Task<AlertaResponseDto?> BuscarPorIdAsync(int id);

    Task<AlertaResponseDto> CriarAsync(AlertaCreateDto dto);

    Task<bool> MarcarComoResolvidoAsync(int id);
}