export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
}   
