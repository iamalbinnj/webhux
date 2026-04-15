'use client';

import { useState, useEffect } from 'react';
import { fetchServiceById } from '@/api/services.api';
import type { Service } from '@/types/service.types';

export function useServiceDetail(projectId: string, serviceId: string) {
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("serviceprojectid", projectId)
  console.log("serviceserviceId", serviceId)

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await fetchServiceById(projectId, serviceId);
        console.log("serviceData",data)
        setService(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load service');
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId && serviceId) load();
  }, [projectId, serviceId]);

  return { service, isLoading, error };
}