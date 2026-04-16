import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
const app: Application = express();

const FRONTEND_URL = process.env.FRONTEND_URL;

if (!FRONTEND_URL) {
  throw new Error('FRONTEND_URL is not defined');
}

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://webhux-web-production.up.railway.app',
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: "Healthy some" });
});
app.use('/', routes);

// Error handling middleware
app.use(errorHandler);

export default app;
