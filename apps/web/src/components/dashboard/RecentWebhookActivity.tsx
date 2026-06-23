"use client";

import { useMemo, useState } from "react";
import { Clock, Search, Webhook } from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { formatDate } from "@/lib/utils";

export default function RecentWebhookActivity() {
  const [query, setQuery] = useState("");
  const { stats, isLoading } = useDashboardStats();
  const recent = stats?.recentActivity ?? [];
  const filtered = useMemo(
    () => recent.filter((log) => log.payloadPreview?.toLowerCase().includes(query.toLowerCase())),
    [query, recent]
  );

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Webhook className="h-5 w-5" />
            Recent Events
          </h2>
          <p className="mt-1 text-sm text-white/40">Latest webhook deliveries across your workspace.</p>
        </div>
        <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/45 lg:w-80">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search events globally"
            className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-white/40">
            <tr>
              <th className="px-5 py-4">Event</th>
              <th className="px-5 py-4">Project</th>
              <th className="px-5 py-4">Service</th>
              <th className="px-5 py-4">Method</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {isLoading ? (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-white/40">Loading activity...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-white/40">No events found</td></tr>
            ) : (
              filtered.slice(0, 8).map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.03]">
                  <td className="max-w-sm truncate px-5 py-4 font-mono text-white/80">{log.payloadPreview}</td>
                  <td className="px-5 py-4 text-white/55">Webhook</td>
                  <td className="px-5 py-4 font-mono text-white/55">POST</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${log.status === "success" ? "bg-emerald-400/10 text-emerald-300" : "bg-red-400/10 text-red-300"}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-white/45">
                    <span className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5" />{formatDate(log.receivedAt)}</span>
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
