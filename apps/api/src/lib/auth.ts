import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { getMongoClient } from './mongoClient.js'

const client = await getMongoClient()
const db = client.db('webhux')

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  cookie: {
    sameSite: 'none',   
    secure: true,       
    httpOnly: true,
  },
})