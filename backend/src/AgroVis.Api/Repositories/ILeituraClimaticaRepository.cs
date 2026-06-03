using AgroVis.Api.Entities;

namespace AgroVis.Api.Repositories;

public interface ILeituraClimaticaRepository
{
    Task<List<LeituraClimatica>> ListarAsync();

    Task<LeituraClimatica?> BuscarPorIdAsync(int id);

    Task<LeituraClimatica> CriarAsync(LeituraClimatica leitura);

    Task<bool> PlantacaoExisteAsync(int plantacaoId);

    Task<bool> SateliteExisteAsync(int sateliteId);
}