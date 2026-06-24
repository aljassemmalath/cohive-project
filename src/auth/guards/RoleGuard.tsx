import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { canAccessRole } from '../utils/permissions';
import type { Role } from '../../types';

export function RoleGuard({
  children,
  role,
}: {
  children: React.ReactNode;
  role: Role;
}) {
  const { user } = useAuth();

  if (!user || !canAccessRole(user, role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
