import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
}

export default function StatsCard({ label, value, icon: Icon }: StatsCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/45">{label}</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-white">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </article>
  );
}
