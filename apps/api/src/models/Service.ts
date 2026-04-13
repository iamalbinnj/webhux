import mongoose, { Schema, Document, Model } from 'mongoose'
import crypto from 'crypto'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  18,
)
const ALGO = 'aes-256-gcm'

let cachedEncryptionKey: Buffer | null = null

function getEncryptionKey(): Buffer {
  if (cachedEncryptionKey) {
    return cachedEncryptionKey
  }
  const raw = process.env.SECRET_KEY?.trim()
  if (!raw) {
    throw new Error(
      'SECRET_KEY is not set. Use a 64-character hex string (32 bytes), or any passphrase (hashed to 32 bytes).',
    )
  }
  const fromHex = Buffer.from(raw, 'hex')
  if (fromHex.length === 32) {
    cachedEncryptionKey = fromHex
    return cachedEncryptionKey
  }
  cachedEncryptionKey = crypto.createHash('sha256').update(raw, 'utf8').digest()
  return cachedEncryptionKey
}

function encryptSecret(secret: string) {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv(ALGO, getEncryptionKey(), iv)
  const encrypted = Buffer.concat([
    cipher.update(secret, 'utf8'),
    cipher.final(),
  ])
  const tag = cipher.getAuthTag()
  return (
    iv.toString('hex') +
    ':' +
    tag.toString('hex') +
    ':' +
    encrypted.toString('hex')
  )
}

// Decryption function
function decryptSecret(encrypted: string) {
  const [ivHex, tagHex, encryptedHex] = encrypted.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const tag = Buffer.from(tagHex, 'hex')
  const encryptedText = Buffer.from(encryptedHex, 'hex')
  const decipher = crypto.createDecipheriv(ALGO, getEncryptionKey(), iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]).toString('utf8')
}

export interface IService extends Document {
  publicId: string
  projectId: mongoose.Types.ObjectId
  secretKey: string
  name: string
  createdAt: Date
  updatedAt: Date
  getSecret(): string
}

const ServiceSchema: Schema<IService> = new Schema(
  {
    publicId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: () => 'srv_' + nanoid(),
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
      default: () => crypto.randomBytes(32).toString('hex'),
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

ServiceSchema.pre<IService>("save", async function () {
  if (!this.secretKey.includes(":")) {
    this.secretKey = encryptSecret(this.secretKey);
  }
});

ServiceSchema.methods.getSecret = function () {
  return decryptSecret(this.secretKey)
}

ServiceSchema.statics.findByPublicId = function (publicId: string) {
  return this.findOne({ publicId })
}

export const Service: Model<IService> = mongoose.model<IService>(
  'Service',
  ServiceSchema,
)
