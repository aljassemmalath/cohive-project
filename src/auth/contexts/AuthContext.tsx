import { createContext, useState, useCallback, type ReactNode } from 'react';
import type { User, AuthState } from '../../types';

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = useCallback(async (email: string, _password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: 'admin',
      permissions: [
        'projects:create', 'projects:read', 'projects:update', 'projects:delete',
        'tasks:create', 'tasks:read', 'tasks:update', 'tasks:delete',
        'files:upload', 'files:read', 'files:delete',
        'messages:send', 'messages:read',
        'approvals:create', 'approvals:read', 'approvals:approve',
        'reports:view', 'reports:export',
        'people:invite', 'people:manage',
        'settings:read', 'settings:update',
        'admin:access',
      ],
      organizationId: 'org_1',
    };
    setState({ user: mockUser, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const setUser = useCallback((user: User) => {
    setState({ user, isAuthenticated: true, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
