import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Header } from '../components/header/Header';
import { navigationConfig } from '../config/navigation.config';
import { useAuth } from '../auth/hooks/useAuth';
import { canAccess } from '../auth/utils/permissions';
import { useIsDesktop } from '../hooks/useMediaQuery';

function filterItems(user: ReturnType<typeof useAuth>['user']) {
  return (item: { roles?: string[]; permissions?: string[] }) => {
    if (!user) return false;
    if (item.roles && !item.roles.some((r) => r === user.role)) return false;
    if (item.permissions && !item.permissions.every((p) => canAccess(user, p as any))) return false;
    return true;
  };
}

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const isDesktop = useIsDesktop();

  const filteredSections = navigationConfig
    .map((section) => ({
      ...section,
      items: section.items.filter(filterItems(user)),
    }))
    .filter((s) => s.items.length > 0);

  const bottomNavItems = [
    { label: 'Home', path: '/dashboard', icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ) },
    { label: 'Tasks', path: '/tasks', icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ) },
    { label: 'Profile', path: '/profile', icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ) },
  ];

  return (
    <div className="flex h-screen bg-[#000614]">
      {isDesktop && <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((p) => !p)} />}
      <div className="flex flex-1 flex-col min-w-0">
        <Header onMenuToggle={() => setMobileMenuOpen((p) => !p)} />
        <main className="flex-1 overflow-auto lg:p-6">
          <Outlet />
        </main>
      </div>
      {!isDesktop && <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center border-t border-border bg-bg-secondary">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 h-full transition-colors ${
                isActive ? 'text-purple-400' : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>}
      {mobileMenuOpen && !isDesktop && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-bg-secondary border-r border-border overflow-y-auto">
            <div className="flex h-14 items-center border-b border-border px-4">
              <img src="/svg/logo.svg" alt="COHIVE" className="h-7" />
            </div>
            <nav className="py-4">
              {filteredSections.map((section) => (
                <div key={section.label} className="px-4 pb-4 last:pb-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-widest text-text-disabled mb-2">
                    {section.label}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    {section.items.map((item) => {
                      const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                            isActive
                              ? 'bg-purple-900/50 text-purple-300'
                              : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                          }`}
                        >
                          {item.icon && <img src={item.icon} alt="" className="h-5 w-5 shrink-0" />}
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
