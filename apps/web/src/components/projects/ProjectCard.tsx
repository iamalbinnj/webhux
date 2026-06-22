import Link from "next/link";
import { Calendar, Edit3, Eye, Folder, Trash2 } from "lucide-react";
import type { Project } from "@/types/project.types";

export default function ProjectCard({ project }: { project: Project }) {
  if (!project?.id) return null;

  return (
    <article className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/25">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-black transition group-hover:scale-105">
            <Folder className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/45">{project.description || "No description added yet."}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="rounded-full border border-white/10 px-3 py-1 text-white/55">{project.serviceCount || 0} services</span>
        <span className="inline-flex items-center gap-2 text-xs text-white/35"><Calendar className="h-3.5 w-3.5" />{new Date(project.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="mt-6 flex items-center gap-2">
        <Link href={`/dashboard/projects/${project.id}`} className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-black">
          <Eye className="h-4 w-4" />
          View
        </Link>
        <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 px-4 text-sm text-white/60 hover:bg-white/5">
          <Edit3 className="h-4 w-4" />
          Edit
        </button>
        <button className="ml-auto grid h-10 w-10 place-items-center rounded-xl border border-red-400/20 text-red-300 hover:bg-red-400/10" aria-label="Delete project">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
