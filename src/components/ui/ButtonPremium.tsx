import type { ButtonHTMLAttributes, ReactNode } from 'react';

type PremiumButtonSize = 'sm' | 'md';

interface PremiumBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  fullWidth?: boolean;
  size?: PremiumButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

interface PrimaryButtonProps extends PremiumBaseProps {}
interface SecondaryButtonProps extends PremiumBaseProps {}

interface IconToggleButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  active?: boolean;
  icon: ReactNode;
  label: string;
  fullWidth?: boolean;
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary';

const disabledState =
  'disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none disabled:brightness-100';

const premiumSizes: Record<PremiumButtonSize, string> = {
  sm: 'h-8 px-3.5 text-xs rounded',
  md: 'h-10 px-5 text-sm rounded',
};

export function PrimaryButton({
  children,
  iconLeft,
  iconRight,
  fullWidth,
  disabled,
  size = 'md',
  className = '',
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled}
      className={[
        'relative inline-flex items-center justify-center gap-2 font-medium text-white',
        'transition-all duration-200 ease-out select-none',
        'bg-gradient-to-b from-purple-400 to-purple-500',
        'shadow-[0_0_24px_rgba(122,79,230,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]',
        'hover:shadow-[0_0_32px_rgba(122,79,230,0.5),inset_0_1px_0_rgba(255,255,255,0.2)]',
        'hover:brightness-110 hover:-translate-y-px',
        'active:translate-y-px active:brightness-95',
        'active:shadow-[0_0_12px_rgba(122,79,230,0.2),inset_0_1px_0_rgba(0,0,0,0.1)]',
        focusRing,
        disabledState,
        fullWidth && 'w-full',
        premiumSizes[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {iconLeft && <span className="shrink-0 flex items-center">{iconLeft}</span>}
      {children && <span className={iconRight ? '' : ''}>{children}</span>}
      {iconRight && <span className="shrink-0 flex items-center">{iconRight}</span>}
    </button>
  );
}

export function SecondaryButton({
  children,
  iconLeft,
  iconRight,
  fullWidth,
  disabled,
  size = 'md',
  className = '',
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      disabled={disabled}
      className={[
        'relative inline-flex items-center justify-center gap-2 font-medium text-white',
        'transition-all duration-200 ease-out select-none',
        'bg-surface-1/80 backdrop-blur-sm',
        'border border-purple-500/30',
        'shadow-[0_0_12px_rgba(122,79,230,0.1),inset_0_1px_0_rgba(255,255,255,0.06)]',
        'hover:shadow-[0_0_20px_rgba(122,79,230,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]',
        'hover:bg-surface-1/90 hover:border-purple-500/40 hover:-translate-y-px',
        'active:translate-y-px active:brightness-95',
        'active:shadow-[0_0_8px_rgba(122,79,230,0.08),inset_0_1px_0_rgba(0,0,0,0.08)]',
        focusRing,
        disabledState,
        fullWidth && 'w-full',
        premiumSizes[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {iconLeft && <span className="shrink-0 flex items-center">{iconLeft}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="shrink-0 flex items-center">{iconRight}</span>}
    </button>
  );
}

export function IconToggleButton({
  active,
  icon,
  label,
  fullWidth,
  disabled,
  className = '',
  ...props
}: IconToggleButtonProps) {
  return (
    <button
      disabled={disabled}
      aria-label={label}
      aria-pressed={active}
      className={[
        'relative inline-flex items-center justify-center',
        'rounded h-9 w-9',
        'transition-all duration-200 ease-out select-none',
        'border',
        'text-text-tertiary bg-transparent border-transparent',
        'hover:text-text-primary hover:bg-surface-2',
        active && 'text-purple-400 bg-purple-900/30 border-purple-600/30 shadow-[0_0_12px_rgba(122,79,230,0.15),inset_0_1px_0_rgba(255,255,255,0.06)]',
        focusRing,
        disabledState,
        fullWidth && 'w-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <span className="shrink-0 flex items-center">{icon}</span>
    </button>
  );
}
