import { Router } from 'express';
import { WebhookController } from '../controllers/webhookControllers';

const router = Router();

const webhookController = new WebhookController();

//Create Project
router.post('/:id', webhookController.createWebhook);

export default router;