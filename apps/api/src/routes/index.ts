import { Router } from 'express';
import privateRoutes from './private/index.js';
import publicRoutes from './public/index.js'

const router = Router();

//Private Route
router.use('/api/v1', publicRoutes);
router.use('/api/v1', privateRoutes);

export default router;