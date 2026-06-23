import type { ApiResponse } from './api.types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export type AuthResponse = ApiResponse<AuthData>;

export interface AuthData {
  token?: string;
  session?: {
    token?: string;
  };
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
}   
