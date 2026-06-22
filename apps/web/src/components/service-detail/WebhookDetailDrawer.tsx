"use client";

import { useMemo, useState } from "react";
import { Copy, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { WebhookLog } from "@/types/webhook.types";

interface WebhookDetailDrawerProps {
  webhook: WebhookLog | null;
  open: boolean;
  onClose: () => void;
}

export default function WebhookDetailDrawer({ webhook, open, onClose }: WebhookDetailDrawerProps) {
  const [raw, setRaw] = useState(false);
  const payload = useMemo(() => JSON.stringify(webhook?.payload ?? {}, null, 2), [webhook]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm">
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close drawer" />
      <aside className="absolute right-0 top-0 h-full w-full overflow-y-auto border-l border-white/10 bg-[#0c0c0c] p-6 text-white shadow-2xl sm:w-[92vw] lg:w-[70vw] xl:w-[58vw]">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Event Details</h2>
            <p className="mt-1 text-sm text-white/40">Inspect request metadata, headers, and payload.</p>
          </div>
          <button onClick={onClose} className="rounded-xl border border-white/10 p-2 text-white/50 hover:bg-white/5 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {!webhook ? (
          <div className="rounded-3xl border border-white/10 p-12 text-center text-white/40">No webhook selected</div>
        ) : (
          <div className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/35">Request Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["Method", "POST"],
                  ["Timestamp", formatDate(webhook.receivedAt)],
                  ["IP", "192.168.1.42"],
                  ["Content-Type", "application/json"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-black/30 p-4">
                    <p className="text-xs text-white/35">{label}</p>
                    <p className="mt-1 font-mono text-sm text-white/75">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/35">Headers</h3>
              <pre className="overflow-auto rounded-2xl bg-black/40 p-4 text-sm leading-6 text-white/70">{JSON.stringify(webhook.headers ?? { authorization: "...", "user-agent": "webhook-client" }, null, 2)}</pre>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-white/35">Payload Viewer</h3>
                <div className="flex gap-2">
                  <button onClick={() => setRaw((value) => !value)} className="h-9 rounded-xl border border-white/10 px-3 text-xs text-white/70 hover:bg-white/5">{raw ? "JSON Tree" : "Raw View"}</button>
                  <button onClick={() => navigator.clipboard.writeText(payload)} className="inline-flex h-9 items-center gap-2 rounded-xl bg-white px-3 text-xs font-semibold text-black">
                    <Copy className="h-3.5 w-3.5" />
                    Copy JSON
                  </button>
                </div>
              </div>
              <pre className="max-h-[520px] overflow-auto rounded-2xl bg-black/50 p-5 font-mono text-sm leading-6 text-[#A4F4FD] whitespace-pre-wrap">{raw ? payload : payload}</pre>
            </section>
          </div>
        )}
      </aside>
    </div>
  );
}
