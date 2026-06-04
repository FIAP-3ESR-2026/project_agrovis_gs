using AgroVis.Api.Enums;

namespace AgroVis.Api.Dtos;

public class AlertaResponseDto
{
    public int Id { get; set; }

    public string Titulo { get; set; } = string.Empty;

    public string Mensagem { get; set; } = string.Empty;

    public TipoAlerta Tipo { get; set; }

    public string TipoDescricao { get; set; } = string.Empty;

    public NivelRisco NivelRisco { get; set; }

    public string NivelRiscoDescricao { get; set; } = string.Empty;

    public bool Resolvido { get; set; }

    public DateTime CriadoEm { get; set; }

    public int PlantacaoId { get; set; }

    public string? NomePropriedade { get; set; }

    public string? Cultura { get; set; }
}