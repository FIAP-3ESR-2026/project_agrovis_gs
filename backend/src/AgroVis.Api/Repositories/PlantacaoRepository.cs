using AgroVis.Api.Data;
using AgroVis.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace AgroVis.Api.Repositories;

public class PlantacaoRepository : IPlantacaoRepository
{
    private readonly AgroVisDbContext _context;

    public PlantacaoRepository(AgroVisDbContext context)
    {
        _context = context;
    }

    public async Task<List<Plantacao>> ListarAsync()
    {
        return await _context.Plantacoes
            .AsNoTracking()
            .OrderByDescending(plantacao => plantacao.CriadoEm)
            .ToListAsync();
    }

    public async Task<Plantacao?> BuscarPorIdAsync(int id)
    {
        return await _context.Plantacoes
            .AsNoTracking()
            .FirstOrDefaultAsync(plantacao => plantacao.Id == id);
    }

    public async Task<Plantacao> CriarAsync(Plantacao plantacao)
    {
        _context.Plantacoes.Add(plantacao);
        await _context.SaveChangesAsync();

        return plantacao;
    }

    public async Task<bool> AtualizarAsync(Plantacao plantacao)
    {
        var plantacaoExistente = await _context.Plantacoes.FindAsync(plantacao.Id);

        if (plantacaoExistente is null)
        {
            return false;
        }

        plantacaoExistente.NomePropriedade = plantacao.NomePropriedade;
        plantacaoExistente.Cultura = plantacao.Cultura;
        plantacaoExistente.Localizacao = plantacao.Localizacao;
        plantacaoExistente.AreaHectares = plantacao.AreaHectares;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ExcluirAsync(int id)
    {
        var plantacao = await _context.Plantacoes.FindAsync(id);

        if (plantacao is null)
        {
            return false;
        }

        _context.Plantacoes.Remove(plantacao);
        await _context.SaveChangesAsync();

        return true;
    }
}