namespace AgroVis.Api.Dtos;

public class LeituraClimaticaResponseDto
{
    public int Id { get; set; }

    public double TemperaturaCelsius { get; set; }

    public double UmidadePercentual { get; set; }

    public double VelocidadeVentoKmh { get; set; }

    public double PrecipitacaoMm { get; set; }

    public string ObservacaoVisual { get; set; } = string.Empty;

    public DateTime DataLeitura { get; set; }

    public int SateliteId { get; set; }

    public int PlantacaoId { get; set; }

    public string? NomeSatelite { get; set; }

    public string? NomePropriedade { get; set; }
}