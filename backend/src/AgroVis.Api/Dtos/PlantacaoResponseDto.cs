namespace AgroVis.Api.Dtos;

public class PlantacaoResponseDto
{
    public int Id { get; set; }

    public string NomePropriedade { get; set; } = string.Empty;

    public string Cultura { get; set; } = string.Empty;

    public string Localizacao { get; set; } = string.Empty;

    public double AreaHectares { get; set; }

    public DateTime CriadoEm { get; set; }
}