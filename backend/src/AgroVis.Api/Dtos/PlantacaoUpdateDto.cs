using System.ComponentModel.DataAnnotations;

namespace AgroVis.Api.Dtos;

public class PlantacaoUpdateDto
{
    [Required(ErrorMessage = "O nome da propriedade é obrigatório.")]
    [MaxLength(120)]
    public string NomePropriedade { get; set; } = string.Empty;

    [Required(ErrorMessage = "A cultura é obrigatória.")]
    [MaxLength(80)]
    public string Cultura { get; set; } = string.Empty;

    [Required(ErrorMessage = "A localização é obrigatória.")]
    [MaxLength(120)]
    public string Localizacao { get; set; } = string.Empty;

    [Range(0.1, double.MaxValue, ErrorMessage = "A área deve ser maior que zero.")]
    public double AreaHectares { get; set; }
}