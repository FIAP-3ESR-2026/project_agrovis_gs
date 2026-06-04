using AgroVis.Api.Entities;

namespace AgroVis.Api.Repositories;

public interface IDashboardRepository
{
    Task<Plantacao?> BuscarResumoPorPlantacaoAsync(int plantacaoId);
}