import dotenv from "dotenv"
import { setServers } from "node:dns"
import { resolve } from "node:path"

const packageDirectory = __dirname

dotenv.config({ path: resolve(packageDirectory, "../../../.env") })

const mongoDnsServers = process.env.MONGODB_DNS_SERVERS
  ?.split(",")
  .map((server) => server.trim())
  .filter(Boolean)

if (mongoDnsServers?.length) {
  setServers(mongoDnsServers)
}

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  apiPort: process.env.API_PORT ? Number(process.env.API_PORT) : 8080,
  webhookPort: process.env.WEBHOOK_PORT ? Number(process.env.WEBHOOK_PORT) : 5000,
  db: {
    uri: process.env.MONGO_URI || "",
  },
}
