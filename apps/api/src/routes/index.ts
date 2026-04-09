import { Router } from 'express';
import privateRoutes from './private';

const router = Router();

//Private Route
router.use('/api/v1', privateRoutes);

export default router;