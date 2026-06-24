import { SidebarItem } from './SidebarItem';
import { SidebarGroup } from './SidebarGroup';
import type { NavigationSection, NavigationItem } from '../../types';

interface SidebarSectionProps {
  section: NavigationSection;
  collapsed: boolean;
  isFirst?: boolean;
}

export function SidebarSection({ section, collapsed, isFirst }: SidebarSectionProps) {
  return (
    <div className="mb-4">
      {!collapsed && (
        <div className={isFirst ? '' : 'pt-4'}>
          {!isFirst && <div className="border-t border-border" />}
          <div className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
            {section.label}
          </div>
        </div>
      )}
      {section.items.map((item: NavigationItem) =>
        item.children ? (
          <SidebarGroup key={item.label} item={item} collapsed={collapsed} />
        ) : (
          <SidebarItem key={item.path} item={item} collapsed={collapsed} />
        ),
      )}
    </div>
  );
}
