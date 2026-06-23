'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Folder, Settings, User, Shield } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/projects', label: 'Projects', icon: Folder },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/change-password', label: 'Password', icon: Shield },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // Exact match for root dashboard
    if (href === '/dashboard') return pathname === href;

    // Nested match for others
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <div className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-white/10 bg-[#080808] text-white">
      <div className="border-b border-white/10 px-6 pb-6 pt-7">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
            <span className="text-xl font-bold leading-none">W</span>
          </div>
          <span className="text-2xl font-semibold tracking-[-1.5px]">Webhux</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-6 py-4 text-sm font-medium rounded-3xl transition-colors',
                    active
                      ? 'bg-white text-black'
                      : 'text-white/55 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 px-6 py-8 text-xs text-white/35">
        Webhook delivery platform
      </div>
    </div>
  );
}
