'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser } from '@/api/auth.api';
import { setToken, removeToken, setUser, removeUser, getUser } from '@/lib/auth';
import type { LoginPayload, RegisterPayload, User } from '@/types/auth.types';

export function useAuth() {
  const router = useRouter();
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user from cookie on mount
  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUserState(savedUser);
    }
  }, []);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginUser(payload);
      setToken(response.token);
      setUser(response.user);
      setUserState(response.user);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await registerUser(payload);
      setToken(response.token);
      setUser(response.user);
      setUserState(response.user);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
    setUserState(null);
    router.push('/login');
  };

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
  };
}