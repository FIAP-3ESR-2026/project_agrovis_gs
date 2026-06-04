import { apiGet } from "./api";
import { Alerta } from "../types/agrovis";

export async function listarAlertasPendentes(): Promise<Alerta[]> {
  return apiGet<Alerta[]>("/api/alertas?resolvido=false");
}

export async function listarTodosAlertas(): Promise<Alerta[]> {
  return apiGet<Alerta[]>("/api/alertas");
}