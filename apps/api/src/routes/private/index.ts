import { Router } from 'express';
import projectRoute from './projectRoute.js'
import serviceRoute from './serviceRoute.js'
import { requireAuth } from '../../middleware/requireAuth.js'

const router = Router();

router.use(requireAuth);

router.use('/projects', projectRoute);
router.use('/services', serviceRoute);

export default router;