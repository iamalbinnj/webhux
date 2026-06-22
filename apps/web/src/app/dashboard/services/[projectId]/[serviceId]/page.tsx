'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import WebhookEndpointInfo from '@/components/service-detail/WebhookEndpointInfo';
import WebhookLogsTable from '@/components/service-detail/WebhookLogsTable';
import WebhookDetailDrawer from '@/components/service-detail/WebhookDetailDrawer';
import type { WebhookLog } from '@/types/webhook.types';

export default function ServiceDetailPage() {
  const params = useParams();

  const serviceId = params.serviceId as string;
  const projectId = params.projectId as string;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookLog | null>(null);

  const handleViewDetail = (webhook: WebhookLog ) => {
    setSelectedWebhook(webhook);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-8">
      <WebhookEndpointInfo projectId={projectId} serviceId={serviceId} />

      <WebhookLogsTable
        projectId={projectId}
        serviceId={serviceId}
        onViewDetail={handleViewDetail}
      />

      <WebhookDetailDrawer
        webhook={selectedWebhook}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedWebhook(null);
        }}
      />
    </div>
  );
}
