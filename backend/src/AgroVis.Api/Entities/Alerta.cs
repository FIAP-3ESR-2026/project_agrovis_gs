using System.ComponentModel.DataAnnotations;
using AgroVis.Api.Enums;

namespace AgroVis.Api.Entities;

public class Alerta
{
    public int Id { get; set; }

    [Required]
    [MaxLength(120)]
    public string Titulo { get; set; } = string.Empty;

    [Required]
    [MaxLength(500)]
    public string Mensagem { get; set; } = string.Empty;

    public TipoAlerta Tipo { get; set; }

    public NivelRisco NivelRisco { get; set; }

    public bool Resolvido { get; set; } = false;

    public DateTime CriadoEm { get; set; } = DateTime.UtcNow;

    public int PlantacaoId { get; set; }

    public Plantacao? Plantacao { get; set; }
}