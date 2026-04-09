import { Request, Response, NextFunction } from 'express'
import { ProjectService } from '../services/projectService'
import { successResponse, successWithCount } from '../utils/apiResponse'

export class ProjectController {
  private projectService = new ProjectService()

  createProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const project = await this.projectService.create(req.body)

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
      const projects = await this.projectService.getAll()

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
      const { id } = req.params as { id: string };

      const projects = await this.projectService.getById(id)

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
      const { id } = req.params as { id: string };
      const payload = req.body;

      const updatedProject = await this.projectService.update(id, payload)

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
      const { id } = req.params as { id: string };

      const updatedProject = await this.projectService.delete(id)

      successResponse(res, updatedProject, 'Projects deleted successfully', 200)
    } catch (error) {
      next(error)
    }
  }
}
