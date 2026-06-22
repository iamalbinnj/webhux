import ProjectInfo from '@/components/project-detail/ProjectInfo';
import ServiceList from '@/components/project-detail/ServiceList';

interface ProjectDetailPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { projectId } = await params;

  return (
    <div className="space-y-8">
      <ProjectInfo projectId={projectId} />
      <ServiceList projectId={projectId} />
    </div>
  );
}
