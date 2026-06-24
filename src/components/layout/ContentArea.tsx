import type { ReactNode } from 'react';

interface ContentAreaProps {
  children: ReactNode;
}

export function ContentArea({ children }: ContentAreaProps) {
  return <div className="flex-1 overflow-auto p-6">{children}</div>;
}
