// services/trumunus.api.ts

type ApiResponse<T = any> = {
  status: string;
  message?: string;
  data?: T;
};

const API_URL = process.env.NEXT_PUBLIC_TRUMUNUS_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_TRUMUNUS_API_KEY ?? "";

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_TRUMUNUS_API_URL não configurada");
}

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

/**
 * Fetch genérico da API Trumunus
 */
async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  try {
    const { method = "GET", body } = options;

    const response = await fetch(`${API_URL}/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "trumunus-agent": API_KEY,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Erro ao consultar ${endpoint}`);
    }

    const result: ApiResponse<T> = await response.json();

    return result.data as T;
  } catch (error) {
    return {} as T;
  }
}


export function getMatchById(id: string) {
  return apiFetch("matches/" + id, { method: "GET" });
}

export function getCompetitionById(id: string) {
  return apiFetch("competitions/" + id, { method: "GET" });
}

export function getCompetitionClassification(id: string) {
  return apiFetch("competitions/classification/" + id, { method: "GET" });
}

export function getCompetitionCurrentMatches(id: string, results?: boolean): any {
  const url = results ? `competitions/current-matches/${id}/${results}` : `competitions/current-matches/${id}/`;
  return apiFetch(url, { method: "GET" });
}

export function getCompetitionEditionMatches(id: string, results?: boolean): any {
  const url = `matches/by-date/${new Date().toISOString().slice(0, 10)}/next/1000/0/competitions/editions/${id}`;
  return apiFetch(url, { method: "GET" });
}

export function getClassificationByCompetitionEdition(competitionEditionId: string) {
    const url = `competitions/editions/classification/${competitionEditionId}`;
  return apiFetch(url, { method: "GET" });
  }

export function getCompetitionEditionById(id: string) {
  return apiFetch("competitions/editions/" + id, { method: "GET" });
}

export function getTeamById(id: string) {
  return apiFetch("teams/" + id, { method: "GET" });
}

export function getPlayerById(id: string) {
  return apiFetch("players/" + id, { method: "GET" });
}