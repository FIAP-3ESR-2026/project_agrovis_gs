using AgroVis.Api.Dtos;
using AgroVis.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AgroVis.Api.Controllers;

[ApiController]
[Route("api/satelites")]
public class SatelitesController : ControllerBase
{
    private readonly ISateliteService _sateliteService;

    public SatelitesController(ISateliteService sateliteService)
    {
        _sateliteService = sateliteService;
    }

    [HttpGet]
    public async Task<ActionResult<List<SateliteResponseDto>>> Listar()
    {
        var satelites = await _sateliteService.ListarAsync();

        return Ok(satelites);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<SateliteResponseDto>> BuscarPorId(int id)
    {
        var satelite = await _sateliteService.BuscarPorIdAsync(id);

        if (satelite is null)
        {
            return NotFound(new
            {
                mensagem = "Satélite não encontrado."
            });
        }

        return Ok(satelite);
    }

    [HttpPost]
    public async Task<ActionResult<SateliteResponseDto>> Criar(SateliteCreateDto dto)
    {
        var sateliteCriado = await _sateliteService.CriarAsync(dto);

        return CreatedAtAction(
            nameof(BuscarPorId),
            new { id = sateliteCriado.Id },
            sateliteCriado
        );
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Atualizar(int id, SateliteUpdateDto dto)
    {
        var atualizado = await _sateliteService.AtualizarAsync(id, dto);

        if (!atualizado)
        {
            return NotFound(new
            {
                mensagem = "Satélite não encontrado."
            });
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var possuiLeituras = await _sateliteService.PossuiLeiturasAsync(id);

        if (possuiLeituras)
        {
            return Conflict(new
            {
                mensagem = "Não é possível excluir este satélite, pois ele possui leituras climáticas vinculadas."
            });
        }

        var excluido = await _sateliteService.ExcluirAsync(id);

        if (!excluido)
        {
            return NotFound(new
            {
                mensagem = "Satélite não encontrado."
            });
        }

        return NoContent();
    }
}