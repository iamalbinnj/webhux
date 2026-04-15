// src/types/project.types.ts
export interface Project {
  id: string;
  _id?: string;
  name: string;
  description?: string;
  userId?: string;
  createdAt: string;
  updatedAt?: string;
  serviceCount?: number;
}

export interface ProjectRaw {
  _id: string;
  name: string;
  description?: string;
  userId?: string;
  createdAt: string;
  updatedAt?: string;
  serviceCount?: number;
}

export interface CreateProjectPayload {
  name: string;
  description?: string;
}