// src/hooks/useDashboardStats.ts
'use client';

import { useState, useEffect } from 'react';
import { fetchProjects } from '@/api/projects.api';
import { fetchServicesByProject } from '@/api/services.api';
import { fetchWebhookLogs } from '@/api/webhooks.api';
import type { DashboardStats, WebhookLog } from '@/types/webhook.types';

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalServices: 0,
    totalWebhooks: 0,
    recentActivity: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      try {
        setIsLoading(true);
        const projects = await fetchProjects();

        if (!isMounted) return;

        let totalWebhooks = 0;
        let recentActivity: WebhookLog[] = [];

        if (Array.isArray(projects)) {
          for (const project of projects) {
            try {
              const services = await fetchServicesByProject(project.id);
              if (!Array.isArray(services)) continue;

              for (const service of services) {
                try {
                  const logs = await fetchWebhookLogs(project.id, service.id);
                  if (Array.isArray(logs)) {
                    totalWebhooks += logs.length;
                    recentActivity = [...recentActivity, ...logs];
                  }
                } catch (e) {
                  // Skip failed service logs
                }
              }
            } catch (e) {
              console.warn(`Failed to fetch services for project ${project.id}`);
            }
          }
        }

        recentActivity.sort((a, b) => 
          new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
        );

        if (isMounted) {
          setStats({
            totalProjects: Array.isArray(projects) ? projects.length : 0,
            totalServices: Array.isArray(projects) 
              ? projects.reduce((acc, p) => acc + (p.serviceCount || 0), 0) 
              : 0,
            totalWebhooks,
            recentActivity: recentActivity.slice(0, 10),
          });
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load stats');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return { stats, isLoading, error };
}