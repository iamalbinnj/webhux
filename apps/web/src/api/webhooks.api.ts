// src/api/webhooks.api.ts
import { apiGet } from './fetchClient';
import type { WebhookLog, WebhookRaw } from '@/types/webhook.types';

interface ServiceWebhookResponse {
  webhooks: WebhookRaw[];
}

interface ApiResponse<T> {
  status: string;
  data: T;
}

const normalizeWebhook = (item: WebhookRaw): WebhookLog => {
  let parsedPayload: Record<string, unknown> = {};

  try {
    if (
      typeof item.payload === 'object' &&
      item.payload !== null &&
      'payload' in item.payload &&
      typeof (item.payload as { payload: unknown }).payload === 'string'
    ) {
      parsedPayload = JSON.parse(
        (item.payload as { payload: string }).payload
      );
    } else if (
      typeof item.payload === 'object' &&
      item.payload !== null
    ) {
      parsedPayload = item.payload as Record<string, unknown>;
    }
  } catch {
    parsedPayload = {};
  }

  return {
    id: item._id,
    _id: item._id,
    serviceId: '',
    status: 'success',
    receivedAt: item.createdAt,
    payloadPreview: JSON.stringify(parsedPayload).slice(0, 80),
    payload: parsedPayload,
  };
};

// All webhook data comes from service
export const fetchWebhookLogs = async (
  projectId: string,
  serviceId: string
): Promise<WebhookLog[]> => {
  const res = await apiGet<ApiResponse<ServiceWebhookResponse>>(
    `/services/${projectId}/${serviceId}`
  );

  return res.data.webhooks.map(normalizeWebhook);
};

// If you don't have a separate webhook detail endpoint yet, we can use the same logs
export const fetchWebhookDetail = async (
  projectId: string,
  serviceId: string,
  webhookId: string
): Promise<WebhookLog> => {
  const logs = await fetchWebhookLogs(projectId, serviceId);

  const webhook = logs.find(w => w.id === webhookId);

  if (!webhook) {
    throw new Error('Webhook not found');
  }

  return webhook;
};