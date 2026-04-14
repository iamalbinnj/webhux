import { Router } from 'express'
import { AuthController } from '../../controllers/auth.controller.js'
import { requireAuth } from '../../middleware/requireAuth.js'

const router = Router()
const controller = new AuthController()

router.post('/register', controller.register)
router.post('/login', controller.login)
router.post('/logout', requireAuth, controller.logout)

router.get('/session', requireAuth, controller.session)

export default router