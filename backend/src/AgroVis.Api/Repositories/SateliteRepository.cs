using AgroVis.Api.Data;
using AgroVis.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace AgroVis.Api.Repositories;

public class SateliteRepository : ISateliteRepository
{
    private readonly AgroVisDbContext _context;

    public SateliteRepository(AgroVisDbContext context)
    {
        _context = context;
    }

    public async Task<List<Satelite>> ListarAsync()
    {
        return await _context.Satelites
            .AsNoTracking()
            .OrderByDescending(satelite => satelite.CriadoEm)
            .ToListAsync();
    }

    public async Task<Satelite?> BuscarPorIdAsync(int id)
    {
        return await _context.Satelites
            .AsNoTracking()
            .FirstOrDefaultAsync(satelite => satelite.Id == id);
    }

    public async Task<Satelite> CriarAsync(Satelite satelite)
    {
        _context.Satelites.Add(satelite);
        await _context.SaveChangesAsync();

        return satelite;
    }

    public async Task<bool> AtualizarAsync(Satelite satelite)
    {
        var sateliteExistente = await _context.Satelites.FindAsync(satelite.Id);

        if (sateliteExistente is null)
        {
            return false;
        }

        sateliteExistente.Nome = satelite.Nome;
        sateliteExistente.Origem = satelite.Origem;
        sateliteExistente.TipoSensor = satelite.TipoSensor;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ExcluirAsync(int id)
    {
        var satelite = await _context.Satelites.FindAsync(id);

        if (satelite is null)
        {
            return false;
        }

        _context.Satelites.Remove(satelite);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> PossuiLeiturasAsync(int id)
    {
        return await _context.LeiturasClimaticas
            .AnyAsync(leitura => leitura.SateliteId == id);
    }
}