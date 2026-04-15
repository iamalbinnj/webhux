import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { TOKEN_KEY } from '@/lib/constants';
import type { ReactNode } from 'react';

interface ServiceLayoutProps {
  children: ReactNode;
  params: Promise<{ projectId: string }>;
}

export default async function ServiceLayout({ children, params }: ServiceLayoutProps) {
  const token = (await cookies()).get(TOKEN_KEY);
  if (!token) {
    redirect('/login');
  }

  const { projectId } = await params;

  return <>{children}</>;
}
