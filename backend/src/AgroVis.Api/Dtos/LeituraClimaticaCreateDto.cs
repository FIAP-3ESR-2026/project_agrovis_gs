using System.ComponentModel.DataAnnotations;

namespace AgroVis.Api.Dtos;

public class LeituraClimaticaCreateDto
{
    [Range(-20, 60, ErrorMessage = "A temperatura deve estar entre -20 e 60 graus Celsius.")]
    public double TemperaturaCelsius { get; set; }

    [Range(0, 100, ErrorMessage = "A umidade deve estar entre 0% e 100%.")]
    public double UmidadePercentual { get; set; }

    [Range(0, 300, ErrorMessage = "A velocidade do vento deve ser maior ou igual a zero.")]
    public double VelocidadeVentoKmh { get; set; }

    [Range(0, 500, ErrorMessage = "A precipitação deve ser maior ou igual a zero.")]
    public double PrecipitacaoMm { get; set; }

    [MaxLength(300)]
    public string ObservacaoVisual { get; set; } = string.Empty;

    [Required]
    public int SateliteId { get; set; }

    [Required]
    public int PlantacaoId { get; set; }
}