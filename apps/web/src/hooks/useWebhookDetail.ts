// src/hooks/useWebhookDetail.ts
'use client';

import { useState, useEffect } from 'react';
import { fetchWebhookDetail } from '@/api/webhooks.api';
import type { WebhookLog  } from '@/types/webhook.types';

export function useWebhookDetail(projectId: string, serviceId: string | null, webhookId: string | null) {
  const [webhook, setWebhook] = useState<WebhookLog  | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!serviceId || !webhookId) {
        setWebhook(null);
        return;
      }

      try {
        setIsLoading(true);
        const data = await fetchWebhookDetail(projectId, serviceId, webhookId);
        setWebhook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load webhook detail');
        setWebhook(null);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [serviceId, webhookId]);

  return { webhook, isLoading, error };
}