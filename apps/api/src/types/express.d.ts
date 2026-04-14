import { Request } from 'express'

export interface AuthUser {
  id: string
  email: string
  name: string
}

export interface AuthRequest extends Request {
  user: AuthUser
}

import 'express'

declare global {
  namespace Express {
    interface User {
      id: string
      email: string
      name: string
    }

    interface Request {
      user: User
    }
  }
}

export {}