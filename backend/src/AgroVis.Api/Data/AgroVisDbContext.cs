using AgroVis.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace AgroVis.Api.Data;

public class AgroVisDbContext : DbContext
{
    public AgroVisDbContext(DbContextOptions<AgroVisDbContext> options) : base(options)
    {
    }

    public DbSet<Satelite> Satelites => Set<Satelite>();
    public DbSet<Plantacao> Plantacoes => Set<Plantacao>();
    public DbSet<LeituraClimatica> LeiturasClimaticas => Set<LeituraClimatica>();
    public DbSet<Alerta> Alertas => Set<Alerta>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Satelite>()
            .HasMany(s => s.LeiturasClimaticas)
            .WithOne(l => l.Satelite)
            .HasForeignKey(l => l.SateliteId);

        modelBuilder.Entity<Plantacao>()
            .HasMany(p => p.LeiturasClimaticas)
            .WithOne(l => l.Plantacao)
            .HasForeignKey(l => l.PlantacaoId);

        modelBuilder.Entity<Plantacao>()
            .HasMany(p => p.Alertas)
            .WithOne(a => a.Plantacao)
            .HasForeignKey(a => a.PlantacaoId);
    }
}