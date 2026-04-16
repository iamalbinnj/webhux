import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { getMongoClient } from './mongoClient.js';

const client = await getMongoClient();
const db = client.db('webhux');

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  // === Required for different domains on Railway ===
  trustedOrigins: [
    process.env.FRONTEND_URL || 'https://webhux-web-production.up.railway.app',
    'http://localhost:3000',
    'https://webhux-web-production.up.railway.app',
  ],

  baseURL: process.env.API_BASE_URL || 'https://webhux-api-production.up.railway.app',

  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none' as const,
      secure: true,           // Must be true in production (HTTPS)
      httpOnly: true,
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
});