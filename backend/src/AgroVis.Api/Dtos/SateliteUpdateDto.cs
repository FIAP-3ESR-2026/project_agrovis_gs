using System.ComponentModel.DataAnnotations;

namespace AgroVis.Api.Dtos;

public class SateliteUpdateDto
{
    [Required(ErrorMessage = "O nome do satélite é obrigatório.")]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "A origem do satélite é obrigatória.")]
    [MaxLength(80)]
    public string Origem { get; set; } = string.Empty;

    [Required(ErrorMessage = "O tipo de sensor é obrigatório.")]
    [MaxLength(120)]
    public string TipoSensor { get; set; } = string.Empty;
}