import type { ReactNode } from 'react';
import { TertiaryButton } from './TertiaryButton';

interface MainCardProps {
  icon?: string;
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  actionColor?: 'purple' | 'blue' | 'cyan';
  children: ReactNode;
}

export function MainCard({
  icon,
  title,
  actionLabel,
  onAction,
  actionColor = 'purple',
  children,
}: MainCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface-1">
      <div className="flex items-center justify-between rounded-t-lg bg-surface-4 px-4 py-3">
        <div className="flex items-center gap-3">
          {icon && <img src={icon} alt={title} className="h-5 w-5" />}
          <span className="text-sm font-medium text-text-primary">{title}</span>
        </div>
        {actionLabel && (
          <TertiaryButton color={actionColor} onClick={onAction}>
            {actionLabel}
          </TertiaryButton>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
