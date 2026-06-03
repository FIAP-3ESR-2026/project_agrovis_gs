using AgroVis.Api.Data;
using AgroVis.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace AgroVis.Api.Repositories;

public class LeituraClimaticaRepository : ILeituraClimaticaRepository
{
    private readonly AgroVisDbContext _context;

    public LeituraClimaticaRepository(AgroVisDbContext context)
    {
        _context = context;
    }

    public async Task<List<LeituraClimatica>> ListarAsync()
    {
        return await _context.LeiturasClimaticas
            .AsNoTracking()
            .Include(leitura => leitura.Satelite)
            .Include(leitura => leitura.Plantacao)
            .OrderByDescending(leitura => leitura.DataLeitura)
            .ToListAsync();
    }

    public async Task<LeituraClimatica?> BuscarPorIdAsync(int id)
    {
        return await _context.LeiturasClimaticas
            .AsNoTracking()
            .Include(leitura => leitura.Satelite)
            .Include(leitura => leitura.Plantacao)
            .FirstOrDefaultAsync(leitura => leitura.Id == id);
    }

    public async Task<LeituraClimatica> CriarAsync(LeituraClimatica leitura)
    {
        _context.LeiturasClimaticas.Add(leitura);
        await _context.SaveChangesAsync();

        var leituraCriada = await BuscarPorIdAsync(leitura.Id);

        return leituraCriada ?? leitura;
    }

    public async Task<bool> PlantacaoExisteAsync(int plantacaoId)
    {
        return await _context.Plantacoes.AnyAsync(plantacao => plantacao.Id == plantacaoId);
    }

    public async Task<bool> SateliteExisteAsync(int sateliteId)
    {
        return await _context.Satelites.AnyAsync(satelite => satelite.Id == sateliteId);
    }
}