import { apiGet } from "./api";
import { Plantacao } from "../types/agrovis";

export async function listarPlantacoes(): Promise<Plantacao[]> {
  return apiGet<Plantacao[]>("/api/plantacoes");
}

export async function buscarPlantacaoPorId(id: string): Promise<Plantacao> {
  return apiGet<Plantacao>(`/api/plantacoes/${id}`);
}