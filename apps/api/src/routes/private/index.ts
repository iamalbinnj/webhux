import { Router } from 'express';
import projectRoute from './projectRoute'

const router = Router();

router.use('/projects', projectRoute);

export default router;