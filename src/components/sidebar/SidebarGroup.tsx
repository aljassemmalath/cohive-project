import { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { SidebarTab } from '../ui/SidebarTab';
import { SidebarItem } from './SidebarItem';
import type { NavigationItem } from '../../types';

interface SidebarGroupProps {
  item: NavigationItem;
  collapsed: boolean;
}

export function SidebarGroup({ item, collapsed }: SidebarGroupProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = item.children?.some((c) => location.pathname === c.path) ?? false;

  const iconSrc = isActive
    ? item.iconActive || item.iconHover || item.icon || ''
    : item.icon || '';

  if (collapsed) {
    return (
      <div className="relative group">
        <div
          className={`flex items-center justify-center px-2 py-3 mx-2 rounded text-sm transition-colors cursor-pointer ${
            isActive
              ? 'bg-blue-500/16 text-white'
              : 'text-text-disabled hover:bg-surface-hover hover:text-blue-500'
          }`}
        >
          <img src={iconSrc} alt={item.label} className="h-5 w-5" />
        </div>
        <div className="invisible group-hover:visible absolute left-full top-0 z-50 ml-3 min-w-[180px] rounded border border-border bg-bg-secondary py-1 shadow-lg">
          <div className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary pointer-events-none">
            {item.label}
          </div>
          <div className="border-t border-border my-1"></div>
          {item.children?.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              end
              className={({ isActive: active }) =>
                `block px-4 py-2 text-sm transition-colors ${
                  active
                    ? 'text-purple-500 bg-surface-1'
                    : 'text-text-secondary hover:bg-surface-hover hover:text-white'
                }`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <SidebarTab
        label={item.label}
        icon={item.icon}
        iconHover={item.iconHover}
        iconActive={item.iconActive}
        active={isActive}
        onClick={() => setOpen((p) => !p)}
      />
      {open && (
        <div className="ml-7 pl-2">
          {item.children?.map((child) => (
            <SidebarItem key={child.path} item={child} collapsed={false} nested />
          ))}
        </div>
      )}
    </div>
  );
}
