using AgroVis.Api.Dtos;
using AgroVis.Api.Entities;
using AgroVis.Api.Repositories;

namespace AgroVis.Api.Services;

public class PlantacaoService : IPlantacaoService
{
    private readonly IPlantacaoRepository _plantacaoRepository;

    public PlantacaoService(IPlantacaoRepository plantacaoRepository)
    {
        _plantacaoRepository = plantacaoRepository;
    }

    public async Task<List<PlantacaoResponseDto>> ListarAsync()
    {
        var plantacoes = await _plantacaoRepository.ListarAsync();

        return plantacoes.Select(MapearParaResponse).ToList();
    }

    public async Task<PlantacaoResponseDto?> BuscarPorIdAsync(int id)
    {
        var plantacao = await _plantacaoRepository.BuscarPorIdAsync(id);

        if (plantacao is null)
        {
            return null;
        }

        return MapearParaResponse(plantacao);
    }

    public async Task<PlantacaoResponseDto> CriarAsync(PlantacaoCreateDto dto)
    {
        var plantacao = new Plantacao
        {
            NomePropriedade = dto.NomePropriedade,
            Cultura = dto.Cultura,
            Localizacao = dto.Localizacao,
            AreaHectares = dto.AreaHectares
        };

        var plantacaoCriada = await _plantacaoRepository.CriarAsync(plantacao);

        return MapearParaResponse(plantacaoCriada);
    }

    public async Task<bool> AtualizarAsync(int id, PlantacaoUpdateDto dto)
    {
        var plantacao = new Plantacao
        {
            Id = id,
            NomePropriedade = dto.NomePropriedade,
            Cultura = dto.Cultura,
            Localizacao = dto.Localizacao,
            AreaHectares = dto.AreaHectares
        };

        return await _plantacaoRepository.AtualizarAsync(plantacao);
    }

    public async Task<bool> ExcluirAsync(int id)
    {
        return await _plantacaoRepository.ExcluirAsync(id);
    }

    private static PlantacaoResponseDto MapearParaResponse(Plantacao plantacao)
    {
        return new PlantacaoResponseDto
        {
            Id = plantacao.Id,
            NomePropriedade = plantacao.NomePropriedade,
            Cultura = plantacao.Cultura,
            Localizacao = plantacao.Localizacao,
            AreaHectares = plantacao.AreaHectares,
            CriadoEm = plantacao.CriadoEm
        };
    }
}