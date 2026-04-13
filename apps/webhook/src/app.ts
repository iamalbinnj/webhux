import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: "Healthy Webhook" });
});

app.use('/webhook', routes);

export default app;