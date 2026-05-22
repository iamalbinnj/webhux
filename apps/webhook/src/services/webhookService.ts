import { Service } from '@webhux/db'
import { Webhook } from '@webhux/db'

export class WebhookService {
  async create(id: string, payload: unknown) {
    console.log("public id",id)
    console.log("payload",payload)

    if (!id) {
      throw new Error('publicId is required')
    }

    const service = await Service.findOne({ publicId: id })

    if (!service) {
      throw new Error('Invalid publicId')
    }

    const webhook = await Webhook.create({
      serviceId: service._id,
      publicId: id,
      payload: payload as Record<string, unknown>,
    })

    return webhook
  }
}
