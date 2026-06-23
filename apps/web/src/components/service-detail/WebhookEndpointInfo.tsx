"use client";

import { Copy, RefreshCw, Trash2, Webhook } from "lucide-react";
import { useServiceDetail } from "@/hooks/useServiceDetail";

export default function WebhookEndpointInfo({ projectId, serviceId }: { projectId: string; serviceId: string }) {
  const { service, isLoading } = useServiceDetail(projectId, serviceId);
  const baseUrl = process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL || "https://webhux.com";

  if (isLoading) return <div className="h-48 animate-pulse rounded-3xl bg-white/[0.04]" />;
  if (!service) return null;

  const endpoint = `${baseUrl}/webhook/${service.publicId}`;

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-black">
              <Webhook className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/35">Service Information</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">{service.name}</h1>
              <p className="mt-3 break-all font-mono text-sm text-white/50">{endpoint}</p>
              <div className="mt-4 grid gap-2 text-sm text-white/45">
                <span>Secret Key: <code className="text-white/70">{service.secretKey || "Not configured"}</code></span>
                <span>Created Date: {new Date(service.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => navigator.clipboard.writeText(endpoint)} className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-black">
              <Copy className="h-4 w-4" />
              Copy Webhook URL
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm text-white/70 hover:bg-white/5">
              <RefreshCw className="h-4 w-4" />
              Regenerate Secret
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-400/20 px-4 text-sm text-red-300 hover:bg-red-400/10">
              <Trash2 className="h-4 w-4" />
              Delete Service
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Total Events", "Live"],
          ["Last Event", "Waiting"],
          ["Failed Events", "0"],
        ].map(([label, value]) => (
          <article key={label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-white/40">{label}</p>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
