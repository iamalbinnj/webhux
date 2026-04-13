import { Router } from 'express';
import projectRoute from './projectRoute'
import serviceRoute from './serviceRoute'

const router = Router();

router.use('/projects', projectRoute);
router.use('/services', serviceRoute);

export default router;