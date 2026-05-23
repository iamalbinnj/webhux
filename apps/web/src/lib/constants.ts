// src/lib/constants.ts
// NEXT_PUBLIC_* vars are inlined at build time by Next.js.
// On Render, pass these as Docker build arguments (not just runtime env vars).
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://webhux-api-latest.onrender.com/api/v1';

export const TOKEN_KEY = 'webhux_token';
export const USER_KEY = 'webhux_user';