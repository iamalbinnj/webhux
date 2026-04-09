import { ApiError } from '../middleware/errorHandler'
import { Project, IProject } from '../models/Project'

interface UpdateProjectPayload {
  name?: string;
  description?: string;
}

export class ProjectService {
  async create(data: {
    name: string
    description?: string
  }): Promise<IProject> {
    const project = await Project.create({
      name: data.name,
      description: data.description,
    })

    return project
  }

  async getAll() {
    const projects = await Project.find()
    return projects
  }

  async getById(id: string) {
    const project = await Project.findById(id)

    if (!project) {
      throw new ApiError(`Project with id ${id} not found`, 404)
    }

    return project
  }

  async update(id: string, payload: UpdateProjectPayload) {
    const project = await Project.findById(id)

    if (!project) {
      throw new ApiError(`Project with id ${id} not found`, 404)
    }

    Object.assign(project, payload);
    await project.save();

    return project
  }

  async delete(id: string) {
    const project = await Project.findById(id)

    if (!project) {
      throw new ApiError(`Project with id ${id} not found`, 404)
    }

    await Project.deleteOne({ _id: id });

    return;
  }
}
