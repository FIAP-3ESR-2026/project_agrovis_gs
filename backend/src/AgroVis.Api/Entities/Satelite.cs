using System.ComponentModel.DataAnnotations;

namespace AgroVis.Api.Entities;

public class Satelite
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [MaxLength(80)]
    public string Origem { get; set; } = string.Empty;

    [MaxLength(120)]
    public string TipoSensor { get; set; } = string.Empty;

    public DateTime CriadoEm { get; set; } = DateTime.UtcNow;

    public List<LeituraClimatica> LeiturasClimaticas { get; set; } = new();
}