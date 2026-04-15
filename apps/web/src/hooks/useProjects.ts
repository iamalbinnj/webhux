// src/hooks/useProjects.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchProjects } from '@/api/projects.api';
import type { Project } from '@/types/project.types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await fetchProjects();

      console.log("Fetched projects:", data);
      
      // Safety check
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError(err instanceof Error ? err.message : 'Failed to load projects');
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);   // ← Empty dependency array is correct here

  return {
    projects,
    isLoading,
    error,
    refetch,
    isCreateOpen,
    setIsCreateOpen,
  };
}