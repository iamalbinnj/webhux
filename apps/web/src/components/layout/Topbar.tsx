'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <div className="h-16 border-b bg-white px-8 flex items-center justify-between fixed top-0 left-60 right-0 z-50">
      <div className="flex-1" />

      <div className="flex items-center gap-4">
        {user && (
          <>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">{user.name}</div>
              <div className="text-gray-400 text-xs -mt-px">{user.email}</div>
            </div>
          </>
        )}

        <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}