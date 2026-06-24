import { Badge } from './Badge';

interface AlertProps {
  variant?: 'purple' | 'blue' | 'cyan' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  title: string;
  description: string;
  footerText: string;
  badgeText?: string;
}

const edgeColors: Record<string, string> = {
  purple: 'rgba(46, 24, 94, 0.4)',
  blue: 'rgba(13, 24, 77, 0.4)',
  cyan: 'rgba(7, 67, 79, 0.4)',
  success: 'rgba(14, 29, 21, 0.4)',
  warning: 'rgba(33, 23, 8, 0.4)',
  error: 'rgba(35, 16, 17, 0.4)',
  info: 'rgba(11, 24, 32, 0.4)',
  neutral: 'rgba(18, 24, 43, 0.4)',
};

const borderColors: Record<string, string> = {
  purple: 'border-purple-900/40',
  blue: 'border-blue-900/40',
  cyan: 'border-cyan-900/40',
  success: 'border-success-border',
  warning: 'border-warning-border',
  error: 'border-error-border',
  info: 'border-info-border',
  neutral: 'border-neutral-border',
};

const mainTextColors: Record<string, string> = {
  purple: 'text-purple-500',
  blue: 'text-blue-500',
  cyan: 'text-cyan-500',
  success: 'text-success-main',
  warning: 'text-warning-main',
  error: 'text-error-main',
  info: 'text-info-main',
  neutral: 'text-neutral-main',
};

const badgeVariants: Record<string, 'success' | 'warning' | 'error' | 'info' | 'neutral'> = {
  purple: 'neutral',
  blue: 'neutral',
  cyan: 'neutral',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
  neutral: 'neutral',
};

export function Alert({
  variant = 'info',
  title,
  description,
  footerText,
  badgeText,
}: AlertProps) {
  return (
    <div
      className={`rounded-lg border p-4 ${borderColors[variant]}`}
      style={{
        background: `radial-gradient(circle at center, #0B1020, ${edgeColors[variant]})`,
      }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-[15px] font-medium text-text-primary">{title}</span>
        <span className="text-[15px] font-normal text-text-disabled">{description}</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className={`text-sm font-medium ${mainTextColors[variant]}`}>{footerText}</span>
        {badgeText && (
          <Badge variant={badgeVariants[variant]}>{badgeText}</Badge>
        )}
      </div>
    </div>
  );
}
