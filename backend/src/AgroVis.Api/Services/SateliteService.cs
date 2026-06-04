using AgroVis.Api.Dtos;
using AgroVis.Api.Entities;
using AgroVis.Api.Repositories;

namespace AgroVis.Api.Services;

public class SateliteService : ISateliteService
{
    private readonly ISateliteRepository _sateliteRepository;

    public SateliteService(ISateliteRepository sateliteRepository)
    {
        _sateliteRepository = sateliteRepository;
    }

    public async Task<List<SateliteResponseDto>> ListarAsync()
    {
        var satelites = await _sateliteRepository.ListarAsync();

        return satelites.Select(MapearParaResponse).ToList();
    }

    public async Task<SateliteResponseDto?> BuscarPorIdAsync(int id)
    {
        var satelite = await _sateliteRepository.BuscarPorIdAsync(id);

        if (satelite is null)
        {
            return null;
        }

        return MapearParaResponse(satelite);
    }

    public async Task<SateliteResponseDto> CriarAsync(SateliteCreateDto dto)
    {
        var satelite = new Satelite
        {
            Nome = dto.Nome,
            Origem = dto.Origem,
            TipoSensor = dto.TipoSensor
        };

        var sateliteCriado = await _sateliteRepository.CriarAsync(satelite);

        return MapearParaResponse(sateliteCriado);
    }

    public async Task<bool> AtualizarAsync(int id, SateliteUpdateDto dto)
    {
        var satelite = new Satelite
        {
            Id = id,
            Nome = dto.Nome,
            Origem = dto.Origem,
            TipoSensor = dto.TipoSensor
        };

        return await _sateliteRepository.AtualizarAsync(satelite);
    }

    public async Task<bool> ExcluirAsync(int id)
    {
        return await _sateliteRepository.ExcluirAsync(id);
    }

    public async Task<bool> PossuiLeiturasAsync(int id)
    {
        return await _sateliteRepository.PossuiLeiturasAsync(id);
    }

    private static SateliteResponseDto MapearParaResponse(Satelite satelite)
    {
        return new SateliteResponseDto
        {
            Id = satelite.Id,
            Nome = satelite.Nome,
            Origem = satelite.Origem,
            TipoSensor = satelite.TipoSensor,
            CriadoEm = satelite.CriadoEm
        };
    }
}