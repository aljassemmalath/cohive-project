import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { canAccess } from '../utils/permissions';
import type { Permission } from '../../types';

export function PermissionGuard({
  children,
  permission,
}: {
  children: React.ReactNode;
  permission: Permission;
}) {
  const { user } = useAuth();

  if (!user || !canAccess(user, permission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
