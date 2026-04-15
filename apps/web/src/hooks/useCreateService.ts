'use client';

import { useState } from 'react';
import { createService } from '@/api/services.api';
import type { CreateServicePayload } from '@/types/service.types';

export function useCreateService(projectId: string, onSuccess: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (payload: CreateServicePayload) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await createService(projectId, payload);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create service');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { create, isSubmitting, error };
}