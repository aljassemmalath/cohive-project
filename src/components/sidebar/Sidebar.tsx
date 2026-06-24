import { navigationConfig } from '../../config/navigation.config';
import { useAuth } from '../../auth/hooks/useAuth';
import { canAccess } from '../../auth/utils/permissions';
import { SidebarSection } from './SidebarSection';
import logo from '../../assets/svg/logo.svg';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

function filterItems(items: ReturnType<typeof useAuth>['user']) {
  return (item: { roles?: string[]; permissions?: string[] }) => {
    if (!items) return false;
    if (item.roles && !item.roles.some((r) => r === items.role)) return false;
    if (item.permissions && !item.permissions.every((p) => canAccess(items, p as any))) return false;
    return true;
  };
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user } = useAuth();

  const filteredSections = navigationConfig
    .map((section) => ({
      ...section,
      items: section.items.filter(filterItems(user)),
    }))
    .filter((s) => s.items.length > 0);

  return (
    <aside
      className={`flex flex-col border-r border-border bg-bg-secondary transition-all duration-200 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex h-16 items-center border-b border-border px-4">
        {collapsed ? (
          <img src="" alt="COHIVE" className="mx-auto h-8 w-8" />
        ) : (
          <img src={logo} alt="COHIVE" className="h-8" />
        )}
      </div>
      <nav className={`flex-1 py-4 ${collapsed ? 'overflow-visible' : 'overflow-y-auto'}`}>
        {filteredSections.map((section, index) => (
          <SidebarSection
            key={section.label}
            section={section}
            collapsed={collapsed}
            isFirst={index === 0}
          />
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded p-2 text-text-tertiary hover:bg-surface-hover hover:text-white transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={collapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'}
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}
