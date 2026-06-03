using AgroVis.Api.Entities;

namespace AgroVis.Api.Repositories;

public interface IPlantacaoRepository
{
    Task<List<Plantacao>> ListarAsync();

    Task<Plantacao?> BuscarPorIdAsync(int id);

    Task<Plantacao> CriarAsync(Plantacao plantacao);

    Task<bool> AtualizarAsync(Plantacao plantacao);

    Task<bool> ExcluirAsync(int id);
}