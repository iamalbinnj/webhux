import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Middleware
app.use(cors());
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