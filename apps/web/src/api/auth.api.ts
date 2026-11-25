import { AUTH_API_URL } from '@/lib/constants';
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '@/types/auth.types';

async function authRequest<T>(endpoint: string, body?: unknown): Promise<T> {
  const response = await fetch(`${AUTH_API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Authentication failed (${response.status})`);
  return data as T;
}

export const loginUser = (payload: LoginPayload) => authRequest<AuthResponse>('/login', payload);
export const registerUser = (payload: RegisterPayload) => authRequest<AuthResponse>('/register', payload);
let refreshPromise: Promise<{ success: boolean; accessToken: string }> | null = null;
export const refreshAuth = () => {
  if (!refreshPromise) {
    refreshPromise = authRequest<{ success: boolean; accessToken: string }>('/refresh')
      .finally(() => { refreshPromise = null; });
  }
  return refreshPromise;
};
export const logoutUser = () => authRequest<{ success: boolean }>('/logout');

export const getCurrentUser = async (accessToken: string) => {
  const response = await fetch(`${AUTH_API_URL}/me`, {
    headers: { Authorization: `Bearer ${accessToken}` }, credentials: 'include',
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Authentication failed (${response.status})`);
  return data as { success: boolean; user: User };
};
