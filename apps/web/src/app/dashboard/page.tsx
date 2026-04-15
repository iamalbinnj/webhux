'use client';

import StatsCard from '@/components/dashboard/StatsCard';
import RecentWebhookActivity from '@/components/dashboard/RecentWebhookActivity';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { Webhook, Folder, Zap, Activity } from 'lucide-react';

export default function DashboardPage() {
  const { stats, isLoading } = useDashboardStats();

  return (
    <div className='p-4'>
      <h1 className="text-4xl font-semibold tracking-tighter mb-10">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          label="Total Projects"
          value={stats?.totalProjects ?? 0}
          icon={Folder}
        />
        <StatsCard
          label="Total Services"
          value={stats?.totalServices ?? 0}
          icon={Zap}
        />
        <StatsCard
          label="Total Webhooks"
          value={stats?.totalWebhooks ?? 0}
          icon={Webhook}
        />
      </div>

      <div className="mt-12">
        <RecentWebhookActivity />
      </div>
    </div>
  );
}