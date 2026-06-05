using AgroVis.Api.Enums;

namespace AgroVis.Api.Dtos;

public class AlertaCreateDto
{
    public string Titulo { get; set; } = string.Empty;

    public string Mensagem { get; set; } = string.Empty;

    public TipoAlerta Tipo { get; set; }

    public NivelRisco NivelRisco { get; set; }

    public int PlantacaoId { get; set; }
}