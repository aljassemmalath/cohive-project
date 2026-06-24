import type { RouteObject } from 'react-router-dom';
import { RoleGuard } from '../auth/guards/RoleGuard';
import { PermissionGuard } from '../auth/guards/PermissionGuard';
import type { Role, Permission } from '../types';

export interface RoleRouteConfig {
  path: string;
  element: React.ReactNode;
  requiredRole?: Role;
  requiredPermission?: Permission;
}

export function wrapWithRoleGuard(
  routes: RoleRouteConfig[],
): RouteObject[] {
  return routes.map((route) => {
    let element = route.element;

    if (route.requiredPermission) {
      element = (
        <PermissionGuard permission={route.requiredPermission}>
          {element}
        </PermissionGuard>
      );
    }

    if (route.requiredRole) {
      element = (
        <RoleGuard role={route.requiredRole}>
          {element}
        </RoleGuard>
      );
    }

    return { path: route.path, element };
  });
}
