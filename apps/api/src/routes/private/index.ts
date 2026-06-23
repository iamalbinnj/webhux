import { Router } from 'express';
import projectRoute from './projectRoute.js'
import serviceRoute from './serviceRoute.js'
import { requireAuth } from '../../middleware/requireAuth.js'
import { apiRateLimit } from '@webhux/rate-limit'

const router = Router();

router.use(requireAuth);

router.use('/projects', apiRateLimit, projectRoute);
router.use('/services', apiRateLimit, serviceRoute);

export default router;