import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../services/auth.service.js'

export class AuthController {
  private authService = new AuthService()

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.authService.register(req.body)
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.authService.login(req.body, res)
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.authService.logout(req.headers)
      res.json({ status: 'success', message: 'Logged out' })
    } catch (err) {
      next(err)
    }
  }

  session = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await this.authService.getSession(req.headers)
      res.json({ status: 'success', data: session })
    } catch (err) {
      next(err)
    }
  }
}