// src/hooks/useCreateProject.ts
'use client';

import { useState } from 'react';
import { createProject } from '@/api/projects.api';
import type { CreateProjectPayload } from '@/types/project.types';

export function useCreateProject(onSuccess: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (payload: CreateProjectPayload) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await createProject(payload);
      console.log('✅ Project created successfully');
      onSuccess();        // This must be called
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create project';
      setError(message);
      console.error('Create project error:', err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { create, isSubmitting, error };
}