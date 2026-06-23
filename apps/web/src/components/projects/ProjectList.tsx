"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import ProjectCard from "./ProjectCard";
import CreateProjectModal from "./CreateProjectModal";

export default function ProjectList() {
  const [query, setQuery] = useState("");
  const { projects, isLoading, isCreateOpen, setIsCreateOpen, refetch } = useProjects();
  const filtered = useMemo(
    () => projects.filter((project) => `${project.name} ${project.description ?? ""}`.toLowerCase().includes(query.toLowerCase())),
    [projects, query]
  );

  return (
    <>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-2 text-white/45">Create projects to isolate webhook services and event history.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex h-12 w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white/40 sm:w-72">
            <Search className="h-4 w-4" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" className="w-full bg-transparent text-white outline-none placeholder:text-white/30" />
          </div>
          <button onClick={() => setIsCreateOpen(true)} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-black">
            <Plus className="h-4 w-4" />
            Create Project
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-64 animate-pulse rounded-3xl bg-white/[0.04]" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="grid place-items-center rounded-3xl border border-dashed border-white/15 py-20 text-center">
          <p className="text-white/45">No projects found</p>
          <button onClick={() => setIsCreateOpen(true)} className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/5">
            Create your first project
          </button>
        </div>
      )}

      <CreateProjectModal open={isCreateOpen} onClose={() => setIsCreateOpen(false)} onCreated={refetch} />
    </>
  );
}
