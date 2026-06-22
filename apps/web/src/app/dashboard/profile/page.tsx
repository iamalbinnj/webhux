"use client";

import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <>
    
      <div className="max-w-3xl space-y-8">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">User Profile</h1>
          <p className="mt-2 text-white/45">Update your account identity and contact details.</p>
        </div>
        <form className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="grid gap-5">
            <label className="space-y-2">
              <span className="text-sm font-medium">Name</span>
              <input defaultValue={user?.name ?? ""} className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 outline-none focus:ring-2 focus:ring-white/20" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Email</span>
              <input defaultValue={user?.email ?? ""} type="email" className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 outline-none focus:ring-2 focus:ring-white/20" />
            </label>
          </div>
          <div className="mt-6 flex gap-3">
            <button type="button" className="h-11 rounded-xl bg-white px-5 text-sm font-semibold text-black">Update Profile</button>
            <a href="/dashboard/change-password" className="inline-flex h-11 items-center rounded-xl border border-white/10 px-5 text-sm font-semibold text-white/70 hover:bg-white/5">Change Password</a>
          </div>
        </form>
      </div>
    </>
  );
}
