import Cookies from 'js-cookie';
import { TOKEN_KEY, USER_KEY } from './constants';
import type { User } from '@/types/auth.types';

export function setToken(token: string): void {
  Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true, sameSite: 'strict' });
}

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY);
}

export function removeToken(): void {
  Cookies.remove(TOKEN_KEY);
}

export function setUser(user: User): void {
  Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7, secure: true, sameSite: 'strict' });
}

export function getUser(): User | null {
  const userStr = Cookies.get(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}

export function removeUser(): void {
  Cookies.remove(USER_KEY);
}