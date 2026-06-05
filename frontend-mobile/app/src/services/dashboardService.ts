import { apiGet } from "./api";
import { DashboardPlantacao } from "../types/agrovis";

export async function buscarDashboardPlantacao(
  plantacaoId: string
): Promise<DashboardPlantacao> {
  return apiGet<DashboardPlantacao>(`/api/dashboard/plantacao/${plantacaoId}`);
}