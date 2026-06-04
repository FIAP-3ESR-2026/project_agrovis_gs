using AgroVis.Api.Dtos;

namespace AgroVis.Api.Services;

public interface ISateliteService
{
    Task<List<SateliteResponseDto>> ListarAsync();

    Task<SateliteResponseDto?> BuscarPorIdAsync(int id);

    Task<SateliteResponseDto> CriarAsync(SateliteCreateDto dto);

    Task<bool> AtualizarAsync(int id, SateliteUpdateDto dto);

    Task<bool> ExcluirAsync(int id);

    Task<bool> PossuiLeiturasAsync(int id);
}