namespace AgroVis.Api.Dtos;

public class SateliteResponseDto
{
    public int Id { get; set; }

    public string Nome { get; set; } = string.Empty;

    public string Origem { get; set; } = string.Empty;

    public string TipoSensor { get; set; } = string.Empty;

    public DateTime CriadoEm { get; set; }
}