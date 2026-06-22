import { Response } from 'express'
import { auth } from '../lib/auth.js'
import { fromNodeHeaders } from 'better-auth/node'
import type { IncomingHttpHeaders } from 'http'

export class AuthService {
  async register(data: { name: string; email: string; password: string }, res: Response) {
    const response = await auth.api.signUpEmail({
      body: data,
      asResponse: true,
    })

    copyAuthResponseHeaders(response, res)

    return response.json()
  }

  async login(data: { email: string; password: string }, res: Response) {
    const response = await auth.api.signInEmail({
      body: data,
      asResponse: true,
    })

    copyAuthResponseHeaders(response, res)

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

function copyAuthResponseHeaders(response: globalThis.Response, res: Response) {
  const headers = response.headers as Headers & {
    getSetCookie?: () => string[];
  }
  const setCookies = headers.getSetCookie?.()

  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      return
    }

    res.set(key, value)
  })

  if (setCookies?.length) {
    res.append('Set-Cookie', setCookies)
    return
  }

  const setCookie = response.headers.get('set-cookie')
  if (setCookie) {
    res.set('Set-Cookie', setCookie)
  }
}
