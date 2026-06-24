import { useAuth } from '../auth/hooks/useAuth';
import type { Role } from '../types';

export function useRole() {
  const { user } = useAuth();

  return {
    role: user?.role ?? null,
    isAdmin: user?.role === 'admin',
    isManager: user?.role === 'manager',
    isMember: user?.role === 'member',
    isViewer: user?.role === 'viewer',
    isGuest: user?.role === 'guest',
    hasRole: (role: Role) => user?.role === role,
    hasAnyRole: (roles: Role[]) => !!user && roles.includes(user.role),
  };
}
