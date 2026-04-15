import { apiGet, apiPost } from './fetchClient';
import type { Project, CreateProjectPayload, ProjectRaw } from '@/types/project.types';
import type { ApiResponse } from '@/types/api.types';

const normalizeProject = (item: ProjectRaw): Project => ({
  id: item._id,
  _id: item._id,
  name: item.name,
  description: item.description,
  userId: item.userId,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
  serviceCount: item.serviceCount ?? 0,
});

export const fetchProjects = async (): Promise<Project[]> => {
  const res = await apiGet<ApiResponse<ProjectRaw[]>>('/projects');
  return res.data.map(normalizeProject);
};

export const fetchProjectById = async (id: string): Promise<Project> => {
  const res = await apiGet<ApiResponse<ProjectRaw>>(`/projects/${id}`);
  return normalizeProject(res.data);
};

export const createProject = async (
  payload: CreateProjectPayload
): Promise<Project> => {
  const res = await apiPost<ApiResponse<ProjectRaw>>('/projects', payload);
  return normalizeProject(res.data);
};