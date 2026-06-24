import type { ReactNode } from 'react';

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function Avatar({ initials, size = 'sm' }: { initials: string; size?: string; index?: number }) {
  const sizeMap: Record<string, string> = { xs: 'h-6 w-6 text-2xs', sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm' };
  return (
    <div className={`rounded-full bg-purple-1000 border border-purple-600 flex items-center justify-center text-purple-400 font-semibold ${sizeMap[size] ?? sizeMap.sm}`}>
      {initials}
    </div>
  );
}

export function FileIcon({ type }: { type: string }) {
  const icons: Record<string, string> = { figma: 'F', pdf: 'P', doc: 'D', sheet: 'S', image: 'I' };
  return <span className="text-xs font-bold text-text-tertiary">{icons[type] ?? '?'}</span>;
}

export function InsightChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-md bg-surface-3 border border-border text-2xs text-text-tertiary">
      {label}
    </span>
  );
}

interface ButtonProps { variant?: string; size?: string; className?: string; children: ReactNode; onClick?: () => void }
export function Button({ variant = 'primary', size = 'sm', className, children, onClick }: ButtonProps) {
  const base = 'inline-flex items-center rounded-lg font-medium transition-colors';
  const variants: Record<string, string> = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-surface-3 border border-border text-text-secondary hover:bg-surface-hover',
    ghost: 'text-text-secondary hover:text-text-primary',
    danger: 'bg-error-bg border border-error-border text-error-text hover:brightness-110',
  };
  const sizes: Record<string, string> = { xs: 'h-7 px-2 text-xs', sm: 'h-8 px-3 text-xs', md: 'h-10 px-4 text-sm' };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.sm} ${className ?? ''}`}>
      {children}
    </button>
  );
}

interface CardProps { children: ReactNode; className?: string }
export function Card({ children, className = '' }: CardProps) {
  return <div className={`rounded-xl border border-border bg-surface-1 ${className}`}>{children}</div>;
}
