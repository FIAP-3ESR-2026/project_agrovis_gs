using AgroVis.Api.Entities;

namespace AgroVis.Api.Repositories;

public interface IAlertaRepository
{
    Task<List<Alerta>> ListarAsync();

    Task<Alerta?> BuscarPorIdAsync(int id);

    Task<Alerta> CriarAsync(Alerta alerta);

    Task<bool> MarcarComoResolvidoAsync(int id);
}