using AgroVis.Api.Entities;
using AgroVis.Api.Enums;

namespace AgroVis.Api.Repositories;

public interface IAlertaRepository
{
    Task<List<Alerta>> ListarAsync(
        int? plantacaoId,
        TipoAlerta? tipo,
        NivelRisco? nivelRisco,
        bool? resolvido
    );

    Task<Alerta?> BuscarPorIdAsync(int id);

    Task<Alerta> CriarAsync(Alerta alerta);

    Task<bool> MarcarComoResolvidoAsync(int id);
}