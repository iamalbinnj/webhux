import { ApiError } from '../middleware/errorHandler.js'
import { Service, IService } from '../models/Service.js'
import { Project } from '../models/Project.js'
import { Webhook } from '../models/Webhook.js'

interface UpdateServicePayload {
  name?: string
  secretKey?: string
}

export class ServiceService {
  async create(data: {
    name: string
    projectId: string
    secretKey: string
  }): Promise<IService> {
    const project = await Project.findById(data.projectId)

    if (!project) {
      throw new ApiError(`Project with ID ${data.projectId} not found`, 404)
    }

    const service = await Service.create({
      projectId: data.projectId,
      name: data.name,
      secretKey: data.secretKey,
    })

    return service
  }

  async getAll(projectId: string) {
    const services = await Service.find({ projectId })

    if (!services) {
      const projectID = await Project.findById(projectId)

      if (!projectID) {
        throw new ApiError(`Project ID ${projectID} not found`, 404)
      }

      throw new ApiError(`Service not found`, 404)
    }
    return services
  }

  async getById(id: string, projectId: string) {
    const service = await Service.findOne({
      _id: id,
      projectId: projectId,
    })

    if (!service) {
      const project = await Project.findById(projectId)

      if (!project) {
        throw new ApiError(`Project with ID ${projectId} not found`, 404)
      }

      throw new ApiError(
        `Service with ID ${id} not found or does not belong to this project`,
        404,
      )
    }

    const webhooks = await Webhook.find({ serviceId: service._id }).select(
      'publicId payload createdAt',
    ) // only what you need

    return {
      service,
      webhooks,
    }
  }

  async update(
    id: string,
    projectId: string,
    payload: UpdateServicePayload,
  ): Promise<IService> {
    const service = await Service.findOneAndUpdate(
      {
        _id: id,
        projectId: projectId,
      },
      { $set: payload },
      {
        new: true,
        runValidators: true,
      },
    )

    if (!service) {
      const projectExists = await Project.findById(projectId)
      if (!projectExists) {
        throw new ApiError(`Project with ID ${projectId} not found`, 404)
      }

      throw new ApiError(
        `Service with ID ${id} not found or does not belong to this project`,
        404,
      )
    }

    return service
  }

  async delete(id: string, projectId: string): Promise<void> {
    const service = await Service.findOneAndDelete({
      _id: id,
      projectId: projectId,
    })

    if (!service) {
      const projectExists = await Project.findById(projectId)
      if (!projectExists) {
        throw new ApiError(`Project with ID ${projectId} not found`, 404)
      }

      throw new ApiError(
        `Service with ID ${id} not found or does not belong to this project`,
        404,
      )
    }

    return
  }
}
