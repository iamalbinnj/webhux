// src/api/fetchClient.ts
import { API_BASE_URL } from '@/lib/constants';
import { getToken } from '@/lib/auth';
import { refreshAuth } from '@/api/auth.api';
import { removeToken, setToken } from '@/lib/auth';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
}

async function fetchClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const fullUrl = `${API_BASE_URL}${endpoint}`;
  const send = (token?: string) => fetch(fullUrl, {
    method: options.method ?? 'GET',
    headers: { ...headers, ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    credentials: 'include',
    ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
  });

  let response = await send(getToken());
  if (response.status === 401 && getToken()) {
    try {
      const refreshed = await refreshAuth();
      setToken(refreshed.accessToken);
      response = await send(refreshed.accessToken);
    } catch {
      removeToken();
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error ${response.status}`);
  }

  return response.json();
}

export const apiGet = <T>(url: string) => fetchClient<T>(url);
export const apiPost = <T>(url: string, body: unknown) =>
  fetchClient<T>(url, { method: 'POST', body });
export const apiPut = <T>(url: string, body: unknown) =>
  fetchClient<T>(url, { method: 'PUT', body });
export const apiDelete = <T>(url: string) =>
  fetchClient<T>(url, { method: 'DELETE' });
