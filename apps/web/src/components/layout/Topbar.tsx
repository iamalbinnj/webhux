'use client';

import { useAuth } from '@/hooks/useAuth';
import { LogOut, Search } from 'lucide-react';

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <div className="fixed left-64 right-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#0c0c0c]/90 px-8 text-white backdrop-blur-xl">
      <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/40">
        <Search className="h-4 w-4" />
        <span>Search events globally</span>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-semibold text-black">
                {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="text-sm">
              <div className="font-medium">{user.name}</div>
              <div className="-mt-px text-xs text-white/40">{user.email}</div>
            </div>
          </>
        )}

        <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
