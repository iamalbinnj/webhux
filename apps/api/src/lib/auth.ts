import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { getMongoClient } from './mongoClient.js';
import { config } from '@webhux/config';

const client = await getMongoClient();
const db = client.db('webhux');
const apiBaseURL =
  process.env.API_BASE_URL ||
  process.env.BACKEND_URL ||
  `http://localhost:${config.port}`;
const isProduction = config.nodeEnv === 'production';

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  // === Required for different domains on Railway ===
  trustedOrigins: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
  ],

  baseURL: apiBaseURL,

  advanced: {
    defaultCookieAttributes: {
      sameSite: isProduction ? 'none' as const : 'lax' as const,
      secure: isProduction,
      httpOnly: true,
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
});
