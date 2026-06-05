using AgroVis.Api.Dtos;
using AgroVis.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AgroVis.Api.Controllers;

[ApiController]
[Route("api/plantacoes")]
public class PlantacoesController : ControllerBase
{
    private readonly IPlantacaoService _plantacaoService;

    public PlantacoesController(IPlantacaoService plantacaoService)
    {
        _plantacaoService = plantacaoService;
    }

    [HttpGet]
    public async Task<ActionResult<List<PlantacaoResponseDto>>> Listar()
    {
        var plantacoes = await _plantacaoService.ListarAsync();

        return Ok(plantacoes);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PlantacaoResponseDto>> BuscarPorId(int id)
    {
        var plantacao = await _plantacaoService.BuscarPorIdAsync(id);

        if (plantacao is null)
        {
            return NotFound(new
            {
                mensagem = "Plantação não encontrada."
            });
        }

        return Ok(plantacao);
    }

    [HttpPost]
    public async Task<ActionResult<PlantacaoResponseDto>> Criar(PlantacaoCreateDto dto)
    {
        var plantacaoCriada = await _plantacaoService.CriarAsync(dto);

        return CreatedAtAction(
            nameof(BuscarPorId),
            new { id = plantacaoCriada.Id },
            plantacaoCriada
        );
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Atualizar(int id, PlantacaoUpdateDto dto)
    {
        var atualizada = await _plantacaoService.AtualizarAsync(id, dto);

        if (!atualizada)
        {
            return NotFound(new
            {
                mensagem = "Plantação não encontrada."
            });
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Excluir(int id)
    {
        var excluida = await _plantacaoService.ExcluirAsync(id);

        if (!excluida)
        {
            return NotFound(new
            {
                mensagem = "Plantação não encontrada."
            });
        }

        return NoContent();
    }
}