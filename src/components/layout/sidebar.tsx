'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  FolderOpen, 
  CheckSquare, 
  MessageSquare, 
  Settings, 
  Users,
  LayoutTemplate,
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface SidebarProps {
  caseId?: string;
}

export function Sidebar({ caseId }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const mainNavigation = [
    { name: 'Cases', href: '/cases', icon: FolderOpen },
  ];

  const caseNavigation = caseId ? [
    { name: 'Overview', href: `/cases/${caseId}`, icon: FileText },
    { name: 'Documents', href: `/cases/${caseId}/documents`, icon: FileText },
    { name: 'Tasks', href: `/cases/${caseId}/tasks`, icon: CheckSquare },
    { name: 'AI Assistant', href: `/cases/${caseId}/ai`, icon: MessageSquare },
  ] : [];

  const firmNavigation = [
    { name: 'Templates', href: '/firm/templates', icon: LayoutTemplate },
    { name: 'Users', href: '/firm/users', icon: Users },
    { name: 'Settings', href: '/firm/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Amicus</h1>
        {user && (
          <p className="text-sm text-muted-foreground mt-2">
            {user.firstName} {user.lastName}
          </p>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
        <div className="space-y-1">
          {mainNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>

        {caseNavigation.length > 0 && (
          <>
            <div className="pt-4 pb-2">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase">
                Case
              </h3>
            </div>
            <div className="space-y-1">
              {caseNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </>
        )}

        <div className="pt-4 pb-2">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase">
            Firm
          </h3>
        </div>
        <div className="space-y-1">
          {firmNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-3 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
