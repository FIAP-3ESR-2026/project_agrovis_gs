using AgroVis.Api.Data;
using AgroVis.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace AgroVis.Api.Repositories;

public class AlertaRepository : IAlertaRepository
{
    private readonly AgroVisDbContext _context;

    public AlertaRepository(AgroVisDbContext context)
    {
        _context = context;
    }

    public async Task<List<Alerta>> ListarAsync()
    {
        return await _context.Alertas
            .AsNoTracking()
            .OrderByDescending(alerta => alerta.CriadoEm)
            .ToListAsync();
    }

    public async Task<Alerta?> BuscarPorIdAsync(int id)
    {
        return await _context.Alertas
            .AsNoTracking()
            .FirstOrDefaultAsync(alerta => alerta.Id == id);
    }

    public async Task<Alerta> CriarAsync(Alerta alerta)
    {
        _context.Alertas.Add(alerta);
        await _context.SaveChangesAsync();

        return alerta;
    }

    public async Task<bool> MarcarComoResolvidoAsync(int id)
    {
        var alerta = await _context.Alertas.FindAsync(id);

        if (alerta is null)
        {
            return false;
        }

        alerta.Resolvido = true;

        await _context.SaveChangesAsync();

        return true;
    }
}