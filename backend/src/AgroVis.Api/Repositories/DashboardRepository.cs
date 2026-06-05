using AgroVis.Api.Data;
using AgroVis.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace AgroVis.Api.Repositories;

public class DashboardRepository : IDashboardRepository
{
    private readonly AgroVisDbContext _context;

    public DashboardRepository(AgroVisDbContext context)
    {
        _context = context;
    }

    public async Task<Plantacao?> BuscarResumoPorPlantacaoAsync(int plantacaoId)
    {
        return await _context.Plantacoes
            .AsNoTracking()
            .Include(plantacao => plantacao.Alertas)
            .Include(plantacao => plantacao.LeiturasClimaticas)
            .FirstOrDefaultAsync(plantacao => plantacao.Id == plantacaoId);
    }
}