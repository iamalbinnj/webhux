import type { WebhookRaw } from "./webhook.types";

export interface Service {
  id: string;
  _id?: string;
  projectId: string;
  name: string;
  secretKey?: string;
  publicId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateServicePayload {
  name: string;
  secretKey?: string;
}

/** RAW response from backend */
export interface ServiceResponse {
  service: {
    _id: string;
    projectId: string;
    name: string;
    secretKey?: string;
    publicId: string;
    createdAt: string;
    updatedAt?: string;
  };
  webhooks: WebhookRaw[];
}