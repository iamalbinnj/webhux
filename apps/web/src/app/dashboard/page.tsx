'use client';

import RecentWebhookActivity from '@/components/dashboard/RecentWebhookActivity';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { Webhook, Folder, Zap, Activity } from 'lucide-react';

export default function DashboardPage() {
  const { stats, isLoading } = useDashboardStats();
  const { isLoggedIn } = useAuth()

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-white/45">Overview of webhook activity, services, and recent deliveries.</p>
      </div>

      <RecentWebhookActivity />
    </div>
  );
}
