import { apiGet, apiPost } from "./fetchClient";
import type {
  Service,
  CreateServicePayload,
  ServiceResponse,
} from "@/types/service.types";
import type { ApiResponse } from "@/types/api.types";
import type { WebhookRaw } from "@/types/webhook.types";

const normalizeService = (item: ServiceResponse["service"]): Service => ({
  id: item._id,
  _id: item._id,
  projectId: item.projectId,
  name: item.name,
  secretKey: item.secretKey,
  publicId: item.publicId,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
});

export const fetchServicesByProject = async (
  projectId: string,
): Promise<Service[]> => {
  const res = await apiGet<ApiResponse<ServiceResponse["service"][]>>(
    `/services/${projectId}`,
  );

  return res.data.map(normalizeService);
};

export const fetchServiceById = async (
  projectId: string,
  serviceId: string,
): Promise<Service> => {
  const res = await apiGet<ApiResponse<ServiceResponse>>(
    `/services/${projectId}/${serviceId}`,
  );

  return normalizeService(res.data.service);
};

export const fetchServiceWebhook = async (
  projectId: string,
  serviceId: string,
): Promise<WebhookRaw[]> => {
  const res = await apiGet<ApiResponse<ServiceResponse>>(
    `/services/${projectId}/${serviceId}`,
  );

  return res.data.webhooks;
};

export const createService = async (
  projectId: string,
  payload: CreateServicePayload,
): Promise<Service> => {
  const res = await apiPost<ApiResponse<ServiceResponse["service"]>>(
    `/services/${projectId}`,
    payload,
  );

  return normalizeService(res.data);
};

export const generateSecretKey = () =>
  apiPost<{ key: string }>("/services/generate-key", {});