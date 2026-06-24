import { useAuth } from '../auth/hooks/useAuth';
import { canAccess, canAccessRole } from '../auth/utils/permissions';
import type { Permission, Role } from '../types';

export function usePermissions() {
  const { user } = useAuth();

  return {
    canAccess: (permission: Permission) => canAccess(user, permission),
    canAccessRole: (role: Role) => canAccessRole(user, role),
  };
}
