export type Role = 'admin' | 'manager' | 'member' | 'viewer' | 'guest';

export type Permission =
  | 'projects:create'
  | 'projects:read'
  | 'projects:update'
  | 'projects:delete'
  | 'tasks:create'
  | 'tasks:read'
  | 'tasks:update'
  | 'tasks:delete'
  | 'files:upload'
  | 'files:read'
  | 'files:delete'
  | 'messages:send'
  | 'messages:read'
  | 'approvals:create'
  | 'approvals:read'
  | 'approvals:approve'
  | 'reports:view'
  | 'reports:export'
  | 'people:invite'
  | 'people:manage'
  | 'settings:read'
  | 'settings:update'
  | 'admin:access';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: Role;
  permissions: Permission[];
  organizationId: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type Organization = {
  id: string;
  name: string;
  slug: string;
};

export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
  iconHover?: string;
  iconActive?: string;
  roles?: Role[];
  permissions?: Permission[];
  children?: NavigationItem[];
}

export interface NavigationSection {
  label: string;
  items: NavigationItem[];
}
