// src/hooks/useProjectDetail.ts
'use client';

import { useState, useEffect } from 'react';
import { fetchProjectById } from '@/api/projects.api';
import { fetchServicesByProject } from '@/api/services.api';
import type { Project } from '@/types/project.types';
import type { Service } from '@/types/service.types';

export function useProjectDetail(projectId: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    if (!projectId) return;

    try {
      setIsLoading(true);
      const [projectData, servicesData] = await Promise.all([
        fetchProjectById(projectId),
        fetchServicesByProject(projectId),
      ]);

      setProject(projectData);
      setServices(Array.isArray(servicesData) ? servicesData : []);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to load project');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [projectId]);

  return { project, services, isLoading, error, refetch };
}