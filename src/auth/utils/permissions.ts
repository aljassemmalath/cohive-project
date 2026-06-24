import type { User, Permission, Role } from '../../types';

const roleHierarchy: Record<Role, number> = {
  admin: 100,
  manager: 80,
  member: 60,
  viewer: 40,
  guest: 20,
};

export function canAccess(user: User | null, permission: Permission): boolean {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return user.permissions.includes(permission);
}

export function canAccessRole(user: User | null, role: Role): boolean {
  if (!user) return false;
  return roleHierarchy[user.role] >= roleHierarchy[role];
}
