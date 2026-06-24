import type { ReactNode } from 'react';

interface NavGroupProps {
  label: string;
  children: ReactNode;
}

export function NavGroup({ label, children }: NavGroupProps) {
  return (
    <div className="mb-4">
      <div className="mb-1 px-3 text-xs font-semibold uppercase text-[#8C95B1]">
        {label}
      </div>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}
