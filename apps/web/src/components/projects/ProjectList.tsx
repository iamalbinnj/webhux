'use client';

import { useProjects } from '@/hooks/useProjects';
import ProjectCard from './ProjectCard';
import CreateProjectModal from './CreateProjectModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ProjectList() {
  const { projects, isLoading, isCreateOpen, setIsCreateOpen, refetch } = useProjects();
  console.log("Current projects:", projects);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {projects.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 border border-dashed rounded-3xl">
              <p className="text-gray-400">No projects yet</p>
              <Button variant="outline" onClick={() => setIsCreateOpen(true)} className="mt-4">
                Create your first project
              </Button>
            </div>
          )}
        </div>
      )}

      <CreateProjectModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={refetch}
      />
    </>
  );
}