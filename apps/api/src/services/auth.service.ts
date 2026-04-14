import { Response } from 'express'
import { auth } from '../lib/auth.js'
import { fromNodeHeaders } from 'better-auth/node'
import type { IncomingHttpHeaders } from 'http'

export class AuthService {
  async register(data: { name: string; email: string; password: string }) {
    return await auth.api.signUpEmail({
      body: data,
    })
  }

  async login(data: { email: string; password: string }, res: Response) {
    const response = await auth.api.signInEmail({
      body: data,
      asResponse: true,
    })

    response.headers.forEach((value, key) => {
      res.set(key, value)
    })

    return response.json()
  }

  async logout(headers: IncomingHttpHeaders) {
    return await auth.api.signOut({
      headers: fromNodeHeaders(headers),
    })
  }

  async getSession(headers: IncomingHttpHeaders) {
    return await auth.api.getSession({
      headers: fromNodeHeaders(headers),
    })
  }
}
