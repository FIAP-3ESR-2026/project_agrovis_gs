using System.ComponentModel.DataAnnotations;

namespace AgroVis.Api.Entities;

public class LeituraClimatica
{
    public int Id { get; set; }

    public double TemperaturaCelsius { get; set; }

    public double UmidadePercentual { get; set; }

    public double VelocidadeVentoKmh { get; set; }

    public double PrecipitacaoMm { get; set; }

    [MaxLength(300)]
    public string ObservacaoVisual { get; set; } = string.Empty;

    public DateTime DataLeitura { get; set; } = DateTime.UtcNow;

    public int SateliteId { get; set; }

    public Satelite? Satelite { get; set; }

    public int PlantacaoId { get; set; }

    public Plantacao? Plantacao { get; set; }
}