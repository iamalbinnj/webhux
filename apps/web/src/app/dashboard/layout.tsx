import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import type { ReactNode } from 'react';
import { AuthGuard } from '@/lib/authGuard';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0c0c0c] text-white">
      <Sidebar />
      <div className="ml-64 flex-1">
        <Topbar />
        <main className="p-8 pt-24">
          <AuthGuard>{children}</AuthGuard>
        </main>
      </div>
    </div>
  );
}
