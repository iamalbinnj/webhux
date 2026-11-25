// src/lib/constants.ts
// NEXT_PUBLIC_* vars are inlined at build time by Next.js.
// On Render, pass these as Docker build arguments (not just runtime env vars).
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1';
export const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL ?? 'https://auth.webhux.xubi.org/api/v1/auth';

export const TOKEN_KEY = 'webhux_token';
export const USER_KEY = 'webhux_user';
