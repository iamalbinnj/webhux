"use client";

import { useState } from "react";

const tabs = ["General", "Security", "Notifications"];

export default function SettingsPage() {
  const [tab, setTab] = useState("General");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-white/45">Configure workspace preferences and alert behavior.</p>
      </div>
      <div className="flex w-fit rounded-2xl border border-white/10 bg-white/[0.03] p-1">
        {tabs.map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`h-10 rounded-xl px-4 text-sm font-semibold transition ${tab === item ? "bg-white text-black" : "text-white/50 hover:text-white"}`}>
            {item}
          </button>
        ))}
      </div>
      <section className="max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        {tab === "General" ? (
          <div className="grid gap-5 md:grid-cols-2">
            <Select label="Timezone" options={["Asia/Calcutta", "UTC", "America/New_York"]} />
            <Select label="Date Format" options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]} />
          </div>
        ) : null}
        {tab === "Security" ? (
          <div className="space-y-5">
            <Toggle label="2FA" description="Require a second factor for account login." />
            <Toggle label="Sessions" description="Notify when a new browser session signs in." />
          </div>
        ) : null}
        {tab === "Notifications" ? (
          <div className="space-y-5">
            <Toggle label="Email Alerts" description="Send summaries and account notifications by email." />
            <Toggle label="Webhook Failure Alerts" description="Alert immediately when a webhook delivery fails." />
          </div>
        ) : null}
      </section>
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium">{label}</span>
      <select className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none focus:ring-2 focus:ring-white/20">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function Toggle({ label, description }: { label: string; description: string }) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div>
        <h3 className="font-semibold">{label}</h3>
        <p className="mt-1 text-sm text-white/40">{description}</p>
      </div>
      <button className="h-7 w-12 rounded-full bg-white/15 p-1">
        <span className="block h-5 w-5 rounded-full bg-white" />
      </button>
    </div>
  );
}
