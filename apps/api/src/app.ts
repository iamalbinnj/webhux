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
app.use(
  cors({
    origin: [FRONTEND_URL, 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
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
