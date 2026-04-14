import { ApiError } from '../middleware/errorHandler.js'
import { Project, IProject } from '../models/Project.js'

interface UpdateProjectPayload {
  name?: string
  description?: string
}

export class ProjectService {
  async create(data: {
    name: string
    description?: string
    userId: string
  }): Promise<IProject> {
    const project = await Project.create({
      name: data.name,
      description: data.description,
      userId: data.userId,
    })

    return project
  }

  async getAll(userId: string) {
    const projects = await Project.find({ userId })
    return projects
  }

  async getById(id: string, userId: string) {
    const project = await Project.findById({ _id: id, userId })

    if (!project) {
      throw new ApiError(`Project with id ${id} not found`, 404)
    }

    return project
  }

  async update(id: string, userId: string, payload: UpdateProjectPayload) {
    const project = await Project.findById({ _id: id, userId })

    if (!project) {
      throw new ApiError(`Project with id ${id} not found`, 404)
    }

    Object.assign(project, payload)
    await project.save()

    return project
  }

  async delete(id: string, userId: string) {
    const project = await Project.findById({ _id: id, userId })

    if (!project) {
      throw new ApiError(`Project with id ${id} not found`, 404)
    }

    await Project.deleteOne({ _id: id })

    return
  }
}
