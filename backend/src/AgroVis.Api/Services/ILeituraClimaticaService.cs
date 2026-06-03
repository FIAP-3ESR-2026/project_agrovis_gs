using AgroVis.Api.Dtos;

namespace AgroVis.Api.Services;

public interface ILeituraClimaticaService
{
    Task<List<LeituraClimaticaResponseDto>> ListarAsync();

    Task<LeituraClimaticaResponseDto?> BuscarPorIdAsync(int id);

    Task<LeituraClimaticaResponseDto?> CriarAsync(LeituraClimaticaCreateDto dto);
}