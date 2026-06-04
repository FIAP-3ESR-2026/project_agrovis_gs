using AgroVis.Api.Dtos;

namespace AgroVis.Api.Services;

public interface IDashboardService
{
    Task<DashboardPlantacaoResponseDto?> ObterResumoPlantacaoAsync(int plantacaoId);
}