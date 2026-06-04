import { apiGet, apiPost } from "./api";
import {
  LeituraClimatica,
  LeituraClimaticaCreate,
} from "../types/agrovis";

export async function listarLeiturasClimaticas(): Promise<LeituraClimatica[]> {
  return apiGet<LeituraClimatica[]>("/api/leituras-climaticas");
}

export async function criarLeituraClimatica(
  leitura: LeituraClimaticaCreate
): Promise<LeituraClimatica> {
  return apiPost<LeituraClimaticaCreate, LeituraClimatica>(
    "/api/leituras-climaticas",
    leitura
  );
}