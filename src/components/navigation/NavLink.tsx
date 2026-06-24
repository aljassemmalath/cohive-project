import { NavLink as RouterNavLink } from 'react-router-dom';
import type { ReactNode } from 'react';

interface NavLinkProps {
  to: string;
  children: ReactNode;
}

export function NavLink({ to, children }: NavLinkProps) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors ${
          isActive
            ? 'bg-[#0B1020] text-white'
            : 'text-[#B8C0D9] hover:bg-[#232D48] hover:text-white'
        }`
      }
    >
      {children}
    </RouterNavLink>
  );
}
