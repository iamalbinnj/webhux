"use client";

import { useMemo, useState } from "react";
import { Eye, RefreshCw, Search } from "lucide-react";
import { useWebhookLogs } from "@/hooks/useWebhookLogs";
import { formatDate } from "@/lib/utils";
import type { WebhookLog } from "@/types/webhook.types";

interface WebhookLogsTableProps {
  projectId: string;
  serviceId: string;
  onViewDetail: (webhook: WebhookLog) => void;
}

export default function WebhookLogsTable({ projectId, serviceId, onViewDetail }: WebhookLogsTableProps) {
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState("POST");
  const [status, setStatus] = useState("all");
  const { logs, isLoading, refetch } = useWebhookLogs(projectId, serviceId);
  const filtered = useMemo(
    () => logs.filter((log) => {
      const matchesQuery = log.payloadPreview.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "all" || log.status === status;
      return matchesQuery && matchesStatus;
    }),
    [logs, query, status]
  );

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Webhook Events</h2>
          <p className="mt-1 text-sm text-white/45">Search payloads and inspect every received request.</p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex h-11 items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white/40 md:w-72">
            <Search className="h-4 w-4" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search payload" className="w-full bg-transparent text-white outline-none placeholder:text-white/30" />
          </div>
          <input type="date" className="h-11 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white/60 outline-none" />
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white/60 outline-none">
            <option value="all">All statuses</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
          <select value={method} onChange={(event) => setMethod(event.target.value)} className="h-11 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white/60 outline-none">
            <option>POST</option>
            <option>GET</option>
            <option>PUT</option>
          </select>
          <button onClick={refetch} disabled={isLoading} className="inline-flex h-11 items-center gap-2 rounded-2xl border border-white/10 px-4 text-sm text-white/70 hover:bg-white/5">
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-white/40">
            <tr>
              <th className="px-5 py-4">Event ID</th>
              <th className="px-5 py-4">Method</th>
              <th className="px-5 py-4">Source</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Received At</th>
              <th className="px-5 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-white/40">{isLoading ? "Loading webhooks..." : "No webhooks received yet"}</td></tr>
            ) : (
              filtered.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.03]">
                  <td className="max-w-[220px] truncate px-5 py-4 font-mono text-white/75">{log.id}</td>
                  <td className="px-5 py-4 font-mono text-white/55">{method}</td>
                  <td className="px-5 py-4 text-white/55">External app</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${log.status === "success" ? "bg-emerald-400/10 text-emerald-300" : "bg-red-400/10 text-red-300"}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-white/45">{formatDate(log.receivedAt)}</td>
                  <td className="px-5 py-4 text-right">
                    <button onClick={() => onViewDetail(log)} className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-white/60 hover:bg-white/5">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
