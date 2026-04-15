// src/hooks/useWebhookLogs.ts
"use client";
import { useState, useEffect, useRef } from "react";
import { fetchServiceWebhook } from "@/api/services.api";
import type { WebhookLog, WebhookRaw } from "@/types/webhook.types";

export function useWebhookLogs(projectId: string, serviceId: string) {
  const [logs, setLogs] = useState<WebhookLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchLogs = async () => {
    if (!serviceId) return;

    try {
      const data: WebhookRaw[] = await fetchServiceWebhook(projectId, serviceId);

      const normalized: WebhookLog[] = data.map((item) => {
        let parsedPayload: Record<string, unknown> = {};

        // Handle different possible payload structures safely
        if (item.payload && typeof item.payload === "object" && item.payload !== null) {
          const payloadObj = item.payload as Record<string, unknown>;

          if ("payload" in payloadObj && typeof payloadObj.payload === "string") {
            // Nested string payload case
            try {
              parsedPayload = JSON.parse(payloadObj.payload);
            } catch {
              parsedPayload = {};
            }
          } else {
            // Direct object payload
            parsedPayload = payloadObj;
          }
        }

        return {
          id: item._id,
          _id: item._id,
          serviceId: "",                    // you can populate this if available
          status: "success" as const,
          receivedAt: item.createdAt,
          payloadPreview: JSON.stringify(parsedPayload).slice(0, 80),
          payload: parsedPayload,
        };
      });

      setLogs(normalized);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load webhook logs";
      setError(errorMessage);
      console.error("Webhook logs fetch error:", err);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      setIsLoading(true);
      await fetchLogs();
      setIsLoading(false);
    };

    loadInitial();

    // Auto-poll every 15 seconds
    intervalRef.current = setInterval(fetchLogs, 15000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [projectId, serviceId]);   // ← Added projectId as dependency too

  return { 
    logs, 
    isLoading, 
    error, 
    refetch: fetchLogs 
  };
}