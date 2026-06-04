const API_BASE_URL = "http://192.168.15.2:5234";

export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da API.");
  }

  return response.json();
}

export { API_BASE_URL };