/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IService extends Document {
  publicId: string
  projectId: mongoose.Types.ObjectId
  secretKey: string
  name: string
  createdAt: Date
  updatedAt: Date
}

const ServiceSchema: Schema<IService> = new Schema(
  {
    publicId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    secretKey: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true },
)


// auto-generate publicId
ServiceSchema.pre('validate', async function (next) {
  if (!this.publicId) {
    const { customAlphabet } = await import('nanoid')
    const nanoid = customAlphabet(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      18,
    )
    this.publicId = nanoid()
  }
  if (typeof next === 'function') {
    next()
  }
})


// simple getter (no decryption now)
ServiceSchema.methods.getSecret = function () {
  return this.secretKey
}

ServiceSchema.statics.findByPublicId = function (publicId: string) {
  return this.findOne({ publicId })
}

export const Service: Model<IService> = mongoose.model<IService>(
  'Service',
  ServiceSchema,
)