'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { WebhookLog } from '@/types/webhook.types';

interface WebhookDetailDrawerProps {
  webhook: WebhookLog | null;
  open: boolean;
  onClose: () => void;
}

export default function WebhookDetailDrawer({
  webhook,
  open,
  onClose,
}: WebhookDetailDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="!w-full sm:!w-[95vw] md:!w-[85vw] lg:!w-[70vw] xl:!w-[60vw] !max-w-none overflow-auto p-2"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">
            Webhook Details
          </SheetTitle>
        </SheetHeader>

        {!webhook && (
          <div className="mt-12 text-center text-gray-500">
            No webhook selected
          </div>
        )}

        {webhook && (
          <div className="mt-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Badge
                className={
                  webhook.status === 'success'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }
              >
                {webhook.status}
              </Badge>

              <span className="text-xs text-gray-400 font-mono">
                {formatDate(webhook.receivedAt)}
              </span>
            </div>

            {/* Payload */}
            <div>
              <h3 className="text-xl font-medium mb-3">Payload</h3>
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-3xl overflow-auto text-sm font-mono leading-relaxed whitespace-pre-wrap break-words">
                {JSON.stringify(webhook.payload ?? {}, null, 2)}
              </pre>
            </div>

            {/* Headers */}
            {webhook.headers &&
              Object.keys(webhook.headers).length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-3">Headers</h3>
                  <div className="border border-gray-100 rounded-3xl divide-y">
                    {Object.entries(webhook.headers).map(([key, value]) => (
                      <div
                        key={key}
                        className="px-6 py-4 flex justify-between text-sm"
                      >
                        <span className="font-mono text-gray-500">
                          {key}
                        </span>
                        <span className="font-mono text-gray-700">
                          {String(value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}