import { Request, Response, NextFunction } from 'express'
import { ServiceService } from '../services/serviceService.js'
import { successResponse, successWithCount } from '../utils/apiResponse.js'

export class ServiceController {
  private serviceService = new ServiceService()

  createService = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const service = await this.serviceService.create({
        ...req.body,
        projectId: req.params.projectId,
      })

      successResponse(res, service, 'Service created', 201)
    } catch (error) {
      next(error)
    }
  }

  getAllService = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { projectId } = req.params as { projectId: string };
      const services = await this.serviceService.getAll(projectId)

      successWithCount(res, services, 'Services fetched successfully', services.length, 200)
    } catch (error) {
      next(error)
    }
  }

  getService = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id, projectId } = req.params as { id: string; projectId: string; };

      const service = await this.serviceService.getById(id, projectId)

      successResponse(res, service, 'Services fetched successfully', 200)
    } catch (error) {
      next(error)
    }
  }

  getDecryptedSecret = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id, projectId } = req.params as { id: string; projectId: string }

      const service = await this.serviceService.getById(id, projectId)

      successResponse(
        res,
        { secretKey: service.service.secretKey },
        'Secret fetched successfully',
        200,
      )
    } catch (error) {
      next(error)
    }
  }

  updateService = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id, projectId } = req.params as { id: string; projectId: string; };
      const payload = req.body;

      const updatedService = await this.serviceService.update(id, projectId, payload)

      successResponse(res, updatedService, 'Service updated successfully', 200)
    } catch (error) {
      next(error)
    }
  }

  deleteService = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id, projectId } = req.params as { id: string; projectId: string; };

      const updatedService = await this.serviceService.delete(id, projectId)

      successResponse(res, updatedService, 'Service deleted successfully', 200)
    } catch (error) {
      next(error)
    }
  }
}
