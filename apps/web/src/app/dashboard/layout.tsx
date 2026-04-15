import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { TOKEN_KEY } from '@/lib/constants';
import type { ReactNode } from 'react';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const token = (await cookies()).get(TOKEN_KEY);
  if (!token) {
    redirect('/login');
  }
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Topbar />
        <main className="pt-16 p-8 max-w-screen-2xl mx-auto">{children}</main>
      </div>
    </div>
  );
}