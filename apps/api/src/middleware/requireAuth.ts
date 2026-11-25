import type { NextFunction, Response } from 'express'
import type { Request } from 'express'

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authorization = req.headers.authorization
    const authApiUrl = process.env.AUTH_API_URL
    if (!authApiUrl || !authorization?.startsWith('Bearer ')) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' })
      return
    }

    const response = await fetch(`${authApiUrl}/me`, {
      headers: { Authorization: authorization },
    })
    if (!response.ok) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' })
      return
    }

    const result = (await response.json()) as {
      user?: { id: string; email: string; name: string }
    }
    if (!result.user) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' })
      return
    }

    req.user = result.user

    next()
  } catch (err) {
    next(err)
  }
}

