const API_BASE_URL = "http://localhost:5234";

export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da API.");
  }

  return response.json();
}

export async function apiPost<TBody, TResponse>(
  endpoint: string,
  body: TBody
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar dados para a API.");
  }

  return response.json();
}

export async function apiPatch<T>(endpoint: string): Promise<T | null> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar dados da API.");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export { API_BASE_URL };