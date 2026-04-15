'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Folder } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/projects', label: 'Projects', icon: Folder },
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
    <div className="w-60 border-r border-gray-100 bg-white h-screen flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="px-8 pt-8 pb-6 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-2xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold leading-none pt-0.5">
              W
            </span>
          </div>
          <span className="font-semibold text-3xl tracking-[-2px]">
            Webhux
          </span>
        </div>
      </div>

      {/* Navigation */}
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
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50 text-gray-600'
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

      {/* Footer */}
      <div className="px-6 py-8 border-t text-xs text-gray-400">
        Webhook delivery platform
      </div>
    </div>
  );
}