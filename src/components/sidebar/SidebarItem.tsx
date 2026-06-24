import { NavLink } from 'react-router-dom';
import type { NavigationItem } from '../../types';

interface SidebarItemProps {
  item: NavigationItem;
  collapsed: boolean;
  nested?: boolean;
}

function getIcon(item: NavigationItem, isActive: boolean): string {
  if (isActive) return item.iconActive || item.iconHover || item.icon || '';
  return item.icon || '';
}

export function SidebarItem({ item, collapsed, nested }: SidebarItemProps) {
  if (collapsed) {
    return (
      <div className="relative group">
        <NavLink
          to={item.path}
          end
          className={({ isActive }) =>
            `flex items-center justify-center px-2 py-3 mx-2 rounded text-sm transition-colors ${
              isActive
                ? 'bg-blue-500/16 text-white'
                : 'text-text-disabled hover:bg-surface-hover hover:text-blue-500'
            }`
          }
        >
          {({ isActive }) => (
            <img src={getIcon(item, isActive)} alt={item.label} className="h-5 w-5" />
          )}
        </NavLink>
        <div className="invisible group-hover:visible absolute left-full top-1/2 -translate-y-1/2 z-50 ml-3 whitespace-nowrap rounded-md bg-surface-2 px-3 py-1.5 text-xs text-white shadow-lg">
          {item.label}
        </div>
      </div>
    );
  }

  return (
    <NavLink to={item.path} end>
      {({ isActive }) => (
        <div
          className={`relative flex items-center mx-3 gap-3 text-sm transition-colors ${
            nested ? 'px-4 py-2' : 'px-3 py-2.5 rounded'
          } ${
            isActive
              ? nested
                ? 'text-purple-500'
                : 'bg-blue-500/16 text-text-primary'
              : 'text-text-disabled hover:text-blue-500'
          }`}
        >
          {!nested && isActive && (
            <div className="absolute inset-y-1 left-0 w-[3px] rounded-r bg-gradient-to-b from-blue-500 to-purple-500" />
          )}
          {!nested && <img src={getIcon(item, isActive)} alt={item.label} className="h-5 w-5" />}
          <span>{item.label}</span>
        </div>
      )}
    </NavLink>
  );
}
