using AgroVis.Api.Dtos;
using AgroVis.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AgroVis.Api.Controllers;

[ApiController]
[Route("api/leituras-climaticas")]
public class LeiturasClimaticasController : ControllerBase
{
    private readonly ILeituraClimaticaService _leituraService;

    public LeiturasClimaticasController(ILeituraClimaticaService leituraService)
    {
        _leituraService = leituraService;
    }

    [HttpGet]
    public async Task<ActionResult<List<LeituraClimaticaResponseDto>>> Listar()
    {
        var leituras = await _leituraService.ListarAsync();

        return Ok(leituras);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<LeituraClimaticaResponseDto>> BuscarPorId(int id)
    {
        var leitura = await _leituraService.BuscarPorIdAsync(id);

        if (leitura is null)
        {
            return NotFound(new
            {
                mensagem = "Leitura climática não encontrada."
            });
        }

        return Ok(leitura);
    }

    [HttpPost]
    public async Task<ActionResult<LeituraClimaticaResponseDto>> Criar(LeituraClimaticaCreateDto dto)
    {
        var leituraCriada = await _leituraService.CriarAsync(dto);

        if (leituraCriada is null)
        {
            return BadRequest(new
            {
                mensagem = "Plantação ou satélite informado não existe."
            });
        }

        return CreatedAtAction(
            nameof(BuscarPorId),
            new { id = leituraCriada.Id },
            leituraCriada
        );
    }
}