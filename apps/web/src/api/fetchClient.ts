// src/api/fetchClient.ts
import { API_BASE_URL } from '@/lib/constants';

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

  console.log(`[API] ${options.method || 'GET'} ${fullUrl}`);

  const response = await fetch(fullUrl, {
    method: options.method ?? 'GET',
    headers,
    credentials: 'include',        // ← This is crucial for cookies
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error(`API Error ${response.status}:`, errorData);
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