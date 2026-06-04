using AgroVis.Api.Data;
using AgroVis.Api.Entities;
using AgroVis.Api.Enums;
using Microsoft.EntityFrameworkCore;

namespace AgroVis.Api.Repositories;

public class AlertaRepository : IAlertaRepository
{
    private readonly AgroVisDbContext _context;

    public AlertaRepository(AgroVisDbContext context)
    {
        _context = context;
    }

    public async Task<List<Alerta>> ListarAsync(
        int? plantacaoId,
        TipoAlerta? tipo,
        NivelRisco? nivelRisco,
        bool? resolvido
    )
    {
        var query = _context.Alertas
            .AsNoTracking()
            .Include(alerta => alerta.Plantacao)
            .AsQueryable();

        if (plantacaoId.HasValue)
        {
            query = query.Where(alerta => alerta.PlantacaoId == plantacaoId.Value);
        }

        if (tipo.HasValue)
        {
            query = query.Where(alerta => alerta.Tipo == tipo.Value);
        }

        if (nivelRisco.HasValue)
        {
            query = query.Where(alerta => alerta.NivelRisco == nivelRisco.Value);
        }

        if (resolvido.HasValue)
        {
            query = query.Where(alerta => alerta.Resolvido == resolvido.Value);
        }

        return await query
            .OrderBy(alerta => alerta.Resolvido)
            .ThenByDescending(alerta => alerta.NivelRisco)
            .ThenByDescending(alerta => alerta.CriadoEm)
            .ToListAsync();
    }

    public async Task<Alerta?> BuscarPorIdAsync(int id)
    {
        return await _context.Alertas
            .AsNoTracking()
            .Include(alerta => alerta.Plantacao)
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