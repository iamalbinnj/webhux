import ProjectInfo from '@/components/project-detail/ProjectInfo';
import ServiceList from '@/components/project-detail/ServiceList';
import { useProjectDetail } from '@/hooks/useProjectDetail';

interface ProjectDetailPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { projectId } = await params;

  return (
    <div className="max-w-5xl">
      {/* Project info is rendered by client component */}
      <ProjectInfo project={null} /> {/* will be populated by hook inside component */}
      <ServiceList projectId={projectId} />
    </div>
  );
}