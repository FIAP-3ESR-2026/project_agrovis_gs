using System.ComponentModel.DataAnnotations;

namespace AgroVis.Api.Entities;

public class Plantacao
{
    public int Id { get; set; }

    [Required]
    [MaxLength(120)]
    public string NomePropriedade { get; set; } = string.Empty;

    [Required]
    [MaxLength(80)]
    public string Cultura { get; set; } = string.Empty;

    [MaxLength(120)]
    public string Localizacao { get; set; } = string.Empty;

    public double AreaHectares { get; set; }

    public DateTime CriadoEm { get; set; } = DateTime.UtcNow;

    public List<LeituraClimatica> LeiturasClimaticas { get; set; } = new();

    public List<Alerta> Alertas { get; set; } = new();
}