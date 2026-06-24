import type { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'neutral' | 'success' | 'warning' | 'error' | 'info';
  children: ReactNode;
}

export function Badge({ variant = 'neutral', children }: BadgeProps) {
  const variants: Record<string, string> = {
    neutral: 'bg-neutral-bg text-neutral-text border border-neutral-border',
    success: 'bg-success-bg text-success-text border border-success-border',
    warning: 'bg-warning-bg text-warning-text border border-warning-border',
    error: 'bg-error-bg text-error-text border border-error-border',
    info: 'bg-info-bg text-info-text border border-info-border',
  };

  return (
    <span className={`inline-flex items-center h-6 px-2 rounded text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
