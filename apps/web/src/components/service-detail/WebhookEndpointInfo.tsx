'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink } from 'lucide-react';
import { useServiceDetail } from '@/hooks/useServiceDetail';

interface WebhookEndpointInfoProps {
  projectId: string
  serviceId: string;
}

export default function WebhookEndpointInfo({ projectId, serviceId }: WebhookEndpointInfoProps) {
  console.log("webprojectid", projectId)
  console.log("webserviceId", serviceId)
  const { service } = useServiceDetail(projectId, serviceId);

  console.log("service",service)

  if (!service) return null;

  const endpoint = `${process.env.NEXT_PUBLIC_WEBHOOK_BASE_URL}/webhook/${service.publicId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(endpoint);
  };

  return (
    <Card className="border border-gray-100">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="uppercase text-xs tracking-widest text-gray-400 mb-1">Your webhook endpoint</p>
            <p className="font-mono text-lg break-all text-gray-900">{endpoint}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={copyToClipboard} className="gap-2">
              <Copy className="w-4 h-4" />
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}