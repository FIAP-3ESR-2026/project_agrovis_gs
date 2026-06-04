using AgroVis.Api.Entities;

namespace AgroVis.Api.Repositories;

public interface ISateliteRepository
{
    Task<List<Satelite>> ListarAsync();

    Task<Satelite?> BuscarPorIdAsync(int id);

    Task<Satelite> CriarAsync(Satelite satelite);

    Task<bool> AtualizarAsync(Satelite satelite);

    Task<bool> ExcluirAsync(int id);

    Task<bool> PossuiLeiturasAsync(int id);
}