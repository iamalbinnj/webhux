"use client";

import { Calendar, Edit3, Folder, Trash2 } from "lucide-react";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import { formatDate } from "@/lib/utils";

export default function ProjectInfo({ projectId }: { projectId: string }) {
  const { project, isLoading } = useProjectDetail(projectId);

  if (isLoading) return <div className="h-40 animate-pulse rounded-3xl bg-white/[0.04]" />;
  if (!project) return null;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-black">
            <Folder className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{project.name}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">{project.description || "No description added yet."}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/40">
              <span className="inline-flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />Created {formatDate(project.createdAt)}</span>
              <span className="rounded-full border border-white/10 px-3 py-1">{project.serviceCount || 0} services</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm text-white/70 hover:bg-white/5"><Edit3 className="h-4 w-4" />Edit</button>
          <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-400/20 px-4 text-sm text-red-300 hover:bg-red-400/10"><Trash2 className="h-4 w-4" />Delete</button>
        </div>
      </div>
    </section>
  );
}
