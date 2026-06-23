import { Router } from 'express'
import authRoutes from './authRoute.js'
import { authRateLimit } from '@webhux/rate-limit'

const router = Router()

router.use('/auth', authRateLimit ,authRoutes)

export default router