import mongoose, { Schema, Document } from 'mongoose'

export interface IWebhook extends Document {
  serviceId: mongoose.Types.ObjectId
  publicId: string
  payload: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

const WebhookSchema = new Schema(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    payload: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const Webhook = mongoose.model<IWebhook>('Webhook', WebhookSchema)
