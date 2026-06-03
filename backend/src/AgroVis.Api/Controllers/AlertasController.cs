using AgroVis.Api.Dtos;
using AgroVis.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AgroVis.Api.Controllers;

[ApiController]
[Route("api/alertas")]
public class AlertasController : ControllerBase
{
    private readonly IAlertaService _alertaService;

    public AlertasController(IAlertaService alertaService)
    {
        _alertaService = alertaService;
    }

    [HttpGet]
    public async Task<ActionResult<List<AlertaResponseDto>>> Listar()
    {
        var alertas = await _alertaService.ListarAsync();

        return Ok(alertas);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<AlertaResponseDto>> BuscarPorId(int id)
    {
        var alerta = await _alertaService.BuscarPorIdAsync(id);

        if (alerta is null)
        {
            return NotFound(new
            {
                mensagem = "Alerta não encontrado."
            });
        }

        return Ok(alerta);
    }

    [HttpPost]
    public async Task<ActionResult<AlertaResponseDto>> Criar(AlertaCreateDto dto)
    {
        var alertaCriado = await _alertaService.CriarAsync(dto);

        return CreatedAtAction(
            nameof(BuscarPorId),
            new { id = alertaCriado.Id },
            alertaCriado
        );
    }

    [HttpPatch("{id:int}/resolver")]
    public async Task<IActionResult> MarcarComoResolvido(int id)
    {
        var atualizado = await _alertaService.MarcarComoResolvidoAsync(id);

        if (!atualizado)
        {
            return NotFound(new
            {
                mensagem = "Alerta não encontrado."
            });
        }

        return NoContent();
    }
}