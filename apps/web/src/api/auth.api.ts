// src/api/auth.api.ts
import { apiPost } from './fetchClient';
import type { LoginPayload, RegisterPayload, AuthResponse } from '@/types/auth.types';

export const loginUser = (payload: LoginPayload) =>
  apiPost<AuthResponse>('/auth/login', payload);

export const registerUser = (payload: RegisterPayload) =>
  apiPost<AuthResponse>('/auth/register', payload);