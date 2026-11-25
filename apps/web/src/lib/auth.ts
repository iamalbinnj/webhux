import { TOKEN_KEY, USER_KEY } from './constants';
import type { User } from '@/types/auth.types';

export function setToken(token: string): void {
  if (typeof window !== 'undefined') window.localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | undefined {
  return typeof window === 'undefined' ? undefined : window.localStorage.getItem(TOKEN_KEY) ?? undefined;
}

export function removeToken(): void {
  if (typeof window !== 'undefined') window.localStorage.removeItem(TOKEN_KEY);
}

export function setUser(user: User): void {
  if (typeof window !== 'undefined') window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  const userStr = typeof window === 'undefined' ? null : window.localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}

export function removeUser(): void {
  if (typeof window !== 'undefined') window.localStorage.removeItem(USER_KEY);
}
