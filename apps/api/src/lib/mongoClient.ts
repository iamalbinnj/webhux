import { MongoClient } from 'mongodb'
import config from '../config/config.js'

let clientPromise: Promise<MongoClient> | null = null

export function getMongoClient(): Promise<MongoClient> {
  if (!clientPromise) {
    const client = new MongoClient(config.db.uri)
    clientPromise = client.connect()
  }
  return clientPromise
}