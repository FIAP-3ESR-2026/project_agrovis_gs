using AgroVis.Api.Dtos;
using AgroVis.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AgroVis.Api.Controllers;

[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("plantacao/{plantacaoId:int}")]
    public async Task<ActionResult<DashboardPlantacaoResponseDto>> ObterResumoPlantacao(int plantacaoId)
    {
        var resumo = await _dashboardService.ObterResumoPlantacaoAsync(plantacaoId);

        if (resumo is null)
        {
            return NotFound(new
            {
                mensagem = "Plantação não encontrada para geração do dashboard."
            });
        }

        return Ok(resumo);
    }
}