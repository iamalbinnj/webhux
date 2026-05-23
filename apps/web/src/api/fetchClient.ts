// src/api/fetchClient.ts
import { API_BASE_URL } from '@/lib/constants';

if (!API_BASE_URL) {
  throw new Error(
    '[fetchClient] API_BASE_URL is not defined. ' +
    'Ensure NEXT_PUBLIC_API_URL is passed as a Docker build argument on Render.'
  );
}

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

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[API] ${options.method || 'GET'} ${fullUrl}`);
  }

  const response = await fetch(fullUrl, {
    method: options.method ?? 'GET',
    headers,
    credentials: 'include', // required for cookie-based auth
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
export const apiPatch = <T>(url: string, body: unknown) =>
  fetchClient<T>(url, { method: 'PATCH', body });
export const apiDelete = <T>(url: string) =>
  fetchClient<T>(url, { method: 'DELETE' });
