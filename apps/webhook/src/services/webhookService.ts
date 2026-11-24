import { Service } from '@webhux/db'
import { Webhook } from '@webhux/db'

const serviceCache = new Map<string, { serviceId: string; expires: number }>()
const CACHE_TTL_MS = 60_000

export class WebhookService {
  async create(id: string, payload: unknown) {
    console.log("public id",id)
    console.log("payload",payload)

    if (!id) {
      throw new Error('publicId is required')
    }

    let serviceId: string
    const hit = serviceCache.get(id)

    if (hit && hit.expires > Date.now()) {
      serviceId = hit.serviceId
    } else {
      const service = await Service.findOne({ publicId: id }).select('_id').lean()

      if (!service) {
        throw new Error('Invalid publicId')
      }

      serviceId = service._id.toString()
      serviceCache.set(id, {
        serviceId,
        expires: Date.now() + CACHE_TTL_MS,
      })
    }

    const webhook = await Webhook.create({
      serviceId,
      publicId: id,
      payload: payload as Record<string, unknown>,
    })

    return webhook
  }
}
