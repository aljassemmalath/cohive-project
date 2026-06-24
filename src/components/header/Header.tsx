import { useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { TextField } from '../../components/ui/TextField';
import { PrimaryButton } from '../ui/ButtonPremium';
import { Breadcrumb } from '../ui/Breadcrumb';
import type { Crumb } from '../ui/Breadcrumb';

interface HeaderProps {
  onMenuToggle?: () => void;
}

function getBreadcrumbs(pathname: string): Crumb[] {
  const exact: Record<string, Crumb[]> = {
    '/dashboard': [{ label: 'Home' }],
    '/projects': [
      { label: 'Home', href: '/dashboard' },
      { label: 'Projects' },
    ],
    '/projects/templates': [
      { label: 'Home', href: '/dashboard' },
      { label: 'Projects', href: '/projects' },
      { label: 'Templates' },
    ],
    '/tasks': [
      { label: 'Home', href: '/dashboard' },
      { label: 'Tasks' },
    ],
    '/tasks/dependencies': [
      { label: 'Home', href: '/dashboard' },
      { label: 'Tasks', href: '/tasks' },
      { label: 'Dependencies' },
    ],
    '/files': [
      { label: 'Home', href: '/dashboard' },
      { label: 'Files' },
    ],
    '/messages': [
      { label: 'Home', href: '/dashboard' },
      { label: 'Messages' },
    ],
    '/approvals': [
      { label: 'Home', href: '/dashboard' },
      { label: 'Approvals' },
    ],
    '/reports': [
      { label: 'Home', href: '/dashboard' },
      { label: 'Reports' },
    ],
    '/people': [
      { label: 'Home', href: '/dashboard' },
      { label: 'People' },
    ],
    '/settings': [
      { label: 'Home', href: '/dashboard' },
      { label: 'Settings' },
    ],
    '/notifications': [
      { label: 'Home', href: '/dashboard' },
      { label: 'Notifications' },
    ],
    '/profile': [
      { label: 'Home', href: '/dashboard' },
      { label: 'Profile' },
    ],
    '/components': [
      { label: 'Home', href: '/dashboard' },
      { label: 'Components' },
    ],
  };

  if (exact[pathname]) return exact[pathname];

  if (pathname.startsWith('/projects/') && !pathname.includes('/templates')) {
    if (pathname.endsWith('/files')) {
      return [
        { label: 'Home', href: '/dashboard' },
        { label: 'Projects', href: '/projects' },
        { label: 'Files' },
      ];
    }
    return [
      { label: 'Home', href: '/dashboard' },
      { label: 'Projects', href: '/projects' },
    ];
  }

  return [];
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user } = useAuth();
  const location = useLocation();
  const crumbs = getBreadcrumbs(location.pathname);

  return (
    <header className="grid grid-cols-3 items-center h-14 lg:h-16 border-b border-border bg-bg-secondary px-4 lg:px-6">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuToggle}
          className="lg:hidden h-10 w-10 shrink-0 flex items-center justify-center rounded text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Breadcrumb items={crumbs} />
      </div>
      <div className="flex justify-center">
        <div className="hidden lg:block w-full max-w-md">
          <TextField
            placeholder="Search projects, tasks, people..."
            iconLeft={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 lg:gap-4">
        <PrimaryButton
          iconRight={
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          }
        >
          Quick create
        </PrimaryButton>
        <button className="h-10 w-10 flex items-center justify-center rounded text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors shrink-0">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <div className="flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-full bg-purple-900 text-xs lg:text-sm font-medium text-purple-300">
            {user ? user.name.split(' ').map(n => n[0]).join('') : '??'}
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-sm font-medium text-text-primary">{user?.name ?? 'User'}</span>
            <span className="text-xs text-text-disabled">Team Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
}
