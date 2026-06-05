import { getApiBaseUrl } from "../config/apiConfig";

const API_BASE_URL = getApiBaseUrl();

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    if (response.status === 204) {
      return null as T;
    }

    return response.json();
  } catch (error) {
    console.log("Erro de comunicação com a API:", error);
    throw new Error(
      "Não foi possível conectar com a API do AgroVis. Verifique se o backend está rodando."
    );
  }
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint);
}

export async function apiPost<TBody, TResponse>(
  endpoint: string,
  body: TBody
): Promise<TResponse> {
  return apiRequest<TResponse>(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function apiPatch<T>(endpoint: string): Promise<T | null> {
  return apiRequest<T | null>(endpoint, {
    method: "PATCH",
  });
}

export { API_BASE_URL };