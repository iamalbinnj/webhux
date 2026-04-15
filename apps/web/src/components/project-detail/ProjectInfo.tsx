import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import type { Project } from '@/types/project.types';

interface ProjectInfoProps {
  project: Project | null;
}

export default function ProjectInfo({ project }: ProjectInfoProps) {
  if (!project) return null;

  return (
    <Card className="border border-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{project.name}</span>
          <span className="text-sm font-normal text-gray-400">
            {formatDate(project.createdAt)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {project.description && (
          <p className="text-gray-600">{project.description}</p>
        )}
        <div className="mt-6 text-xs flex items-center gap-2 text-gray-400">
          <div className="bg-gray-100 px-3 py-1 rounded-full">
            {project.serviceCount} services
          </div>
        </div>
      </CardContent>
    </Card>
  );
}