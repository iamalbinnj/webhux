import type { NextFunction, Response } from 'express'
import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../lib/auth.js'
import type { AuthRequest } from '../types/express.js'

export async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })

    console.log('requireAuth hit:', req.path);

    console.log('SESSION →', JSON.stringify(session, null, 2))

    if (!session) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' })
      return
    }

    req.user = session.user

    next()
  } catch (err) {
    next(err)
  }
}

