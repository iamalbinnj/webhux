'use client';

import { useWebhookLogs } from '@/hooks/useWebhookLogs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { RefreshCw, Eye } from 'lucide-react';
import type { WebhookLog } from '@/types/webhook.types';

interface WebhookLogsTableProps {
  projectId: string;
  serviceId: string;
  onViewDetail: (webhook: WebhookLog) => void;
}

export default function WebhookLogsTable({ projectId, serviceId, onViewDetail }: WebhookLogsTableProps) {
  const { logs, isLoading, refetch } = useWebhookLogs(projectId, serviceId);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Webhook logs</h2>
        <Button variant="ghost" size="sm" onClick={refetch} disabled={isLoading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="border border-gray-100 rounded-3xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payload preview</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-sm">{formatDate(log.receivedAt)}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      log.status === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }
                  >
                    {log.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-sm max-w-xs truncate">
                  {log.payloadPreview}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetail(log)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {logs.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-gray-400">
                  No webhooks received yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}