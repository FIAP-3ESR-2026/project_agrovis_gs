using AgroVis.Api.Dtos;

namespace AgroVis.Api.Services;

public interface IPlantacaoService
{
    Task<List<PlantacaoResponseDto>> ListarAsync();

    Task<PlantacaoResponseDto?> BuscarPorIdAsync(int id);

    Task<PlantacaoResponseDto> CriarAsync(PlantacaoCreateDto dto);

    Task<bool> AtualizarAsync(int id, PlantacaoUpdateDto dto);

    Task<bool> ExcluirAsync(int id);
}