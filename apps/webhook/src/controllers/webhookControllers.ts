import { Request, Response, NextFunction } from 'express'
import { WebhookService } from '../services/webhookService'
import { successResponse } from '../utils/apiResponse'

export class WebhookController {
  private webhookService = new WebhookService()

  createWebhook = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params as { id: string }
      const payload = req.body;
      const webhook = await this.webhookService.create(id, payload)
      successResponse(res, webhook, 'Webhook created', 201)
    } catch (error) {
      next(error)
    }
  }
}
