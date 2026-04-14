import { Request, Response, NextFunction } from 'express'
import { ProjectService } from '../services/projectService.js'
import { successResponse, successWithCount } from '../utils/apiResponse.js'

export class ProjectController {
  private projectService = new ProjectService()

  createProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user.id
      const project = await this.projectService.create({ ...req.body, userId })

      successResponse(res, project, 'Project created', 201)
    } catch (error) {
      next(error)
    }
  }

  getAllProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user.id
      const projects = await this.projectService.getAll(userId)

      successWithCount(res, projects, 'Projects fetched successfully', projects.length, 200)
    } catch (error) {
      next(error)
    }
  }

  getProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user.id
      const { id } = req.params as { id: string };

      const projects = await this.projectService.getById(id, userId)

      successResponse(res, projects, 'Projects fetched successfully', 200)
    } catch (error) {
      next(error)
    }
  }

  updateProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user.id
      const { id } = req.params as { id: string };
      const payload = req.body;

      const updatedProject = await this.projectService.update(id, userId, payload)

      successResponse(res, updatedProject, 'Projects updated successfully', 200)
    } catch (error) {
      next(error)
    }
  }

  deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user.id
      const { id } = req.params as { id: string };

      const updatedProject = await this.projectService.delete(id, userId)

      successResponse(res, updatedProject, 'Projects deleted successfully', 200)
    } catch (error) {
      next(error)
    }
  }
}
