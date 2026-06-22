"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Edit3, ExternalLink, Plus, Search, Trash2, Webhook } from "lucide-react";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import CreateServiceForm from "./CreateServiceForm";

export default function ServiceList({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { services, isLoading, refetch } = useProjectDetail(projectId);
  const filtered = services.filter((service) => service.name.toLowerCase().includes(query.toLowerCase()));
  const baseUrl = process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL || "https://webhux.com";

  return (
    <section>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Services</h2>
          <p className="mt-1 text-sm text-white/45">Manage service-specific webhook endpoints inside this project.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white/40 sm:w-72">
            <Search className="h-4 w-4" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services" className="w-full bg-transparent text-white outline-none placeholder:text-white/30" />
          </div>
          <button onClick={() => setOpen(true)} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-black">
            <Plus className="h-4 w-4" />
            Create Service
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-36 animate-pulse rounded-3xl bg-white/[0.04]" />)
        ) : filtered.length > 0 ? (
          filtered.map((service) => {
            const endpoint = `${baseUrl}/webhook/${service.publicId}`;
            return (
              <article key={service.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-black">
                      <Webhook className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <p className="mt-2 break-all font-mono text-xs text-white/45">{endpoint}</p>
                      <p className="mt-2 text-xs text-white/30">Created {new Date(service.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => navigator.clipboard.writeText(endpoint)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm text-white/70 hover:bg-white/5">
                      <Copy className="h-4 w-4" />
                      Copy URL
                    </button>
                    <Link href={`/dashboard/services/${projectId}/${service.id}`} className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-black">
                      View Events
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/55 hover:bg-white/5" aria-label="Edit service">
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button className="grid h-10 w-10 place-items-center rounded-xl border border-red-400/20 text-red-300 hover:bg-red-400/10" aria-label="Delete service">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="grid place-items-center rounded-3xl border border-dashed border-white/15 py-16 text-center">
            <p className="text-white/45">No services found</p>
            <button onClick={() => setOpen(true)} className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/5">
              Create service
            </button>
          </div>
        )}
      </div>

      <CreateServiceForm projectId={projectId} open={open} onClose={() => setOpen(false)} onCreated={refetch} />
    </section>
  );
}
