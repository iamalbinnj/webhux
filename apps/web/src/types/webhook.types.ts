// src/types/webhook.types.ts
export interface WebhookLog {
  id: string;
  _id?: string;
  serviceId: string;
  status: 'success' | 'failed';
  receivedAt: string;
  payloadPreview: string;
  payload?: Record<string, unknown>;   // for detail view
  headers?: Record<string, string>;
}

// export interface WebhookDetail extends WebhookLog {}

export interface DashboardStats {
  totalProjects: number;
  totalServices: number;
  totalWebhooks: number;
  recentActivity: WebhookLog[];
}

export interface WebhookRaw {
  _id: string;
  payload: unknown; // we’ll refine this later if needed
  createdAt: string;
}