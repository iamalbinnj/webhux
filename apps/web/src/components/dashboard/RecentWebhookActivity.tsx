'use client';

import { useDashboardStats } from '@/hooks/useDashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Webhook, Clock } from 'lucide-react';

export default function RecentWebhookActivity() {
  const { stats, isLoading } = useDashboardStats();

  if (isLoading || !stats) {
    return (
      <Card className="bg-white border border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Webhook className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading activity...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Webhook className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {stats.recentActivity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Webhook className="w-10 h-10 mb-3" />
            <p className="text-sm">No webhooks yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {stats.recentActivity.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={
                      log.status === 'success'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }
                  >
                    {log.status}
                  </Badge>
                  <div className="text-sm font-medium text-gray-900 truncate max-w-[240px]">
                    {log.payloadPreview}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {formatDate(log.receivedAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}