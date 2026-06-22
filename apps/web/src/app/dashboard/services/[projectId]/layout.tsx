import type { ReactNode } from 'react';
import { AuthGuard } from '@/lib/authGuard';

interface ServiceLayoutProps {
  children: ReactNode;
  params: Promise<{ projectId: string }>;
}

export default async function ServiceLayout({ children, params }: ServiceLayoutProps) {

  const { projectId } = await params;

  return <><AuthGuard>{children}</AuthGuard></>;
}
