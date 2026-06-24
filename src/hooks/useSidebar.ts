import { useState, useMemo } from 'react';
import { navigationConfig } from '../config/navigation.config';
import { useAuth } from '../auth/hooks/useAuth';
import { canAccess } from '../auth/utils/permissions';
import type { NavigationSection } from '../types';

function filterItem(user: NonNullable<ReturnType<typeof useAuth>['user']>) {
  return (item: { roles?: string[]; permissions?: string[] }) => {
    if (item.roles && !item.roles.some((r) => r === user.role)) return false;
    if (item.permissions && !item.permissions.every((p) => canAccess(user, p as any))) return false;
    return true;
  };
}

export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();

  const filteredSections: NavigationSection[] = useMemo(() => {
    if (!user) return [];
    const ok = filterItem(user);
    return navigationConfig
      .map((s) => ({
        ...s,
        items: s.items
          .map((item) => ({
            ...item,
            children: item.children?.filter(ok),
          }))
          .filter((item) => ok(item) || (item.children && item.children.length > 0)),
      }))
      .filter((s) => s.items.length > 0);
  }, [user]);

  return {
    isCollapsed,
    setIsCollapsed,
    toggle: () => setIsCollapsed((prev) => !prev),
    navigationSections: filteredSections,
  };
}
