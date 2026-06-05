namespace AgroVis.Api.Dtos;

public class DashboardPlantacaoResponseDto
{
    public int PlantacaoId { get; set; }

    public string NomePropriedade { get; set; } = string.Empty;

    public string Cultura { get; set; } = string.Empty;

    public string Localizacao { get; set; } = string.Empty;

    public double AreaHectares { get; set; }

    public int TotalAlertas { get; set; }

    public int AlertasPendentes { get; set; }

    public int AlertasResolvidos { get; set; }

    public int AlertasCriticos { get; set; }

    public int AlertasAltos { get; set; }

    public double? UltimaTemperaturaCelsius { get; set; }

    public double? UltimaUmidadePercentual { get; set; }

    public double? UltimaVelocidadeVentoKmh { get; set; }

    public double? UltimaPrecipitacaoMm { get; set; }

    public DateTime? DataUltimaLeitura { get; set; }

    public string StatusGeral { get; set; } = string.Empty;

    public string RecomendacaoOperacional { get; set; } = string.Empty;

    public List<AlertaResumoDto> UltimosAlertas { get; set; } = new();
}