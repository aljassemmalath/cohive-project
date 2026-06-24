import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'filled' | 'outline' | 'ghost' | 'gradient';
type ButtonColor = 'purple' | 'blue' | 'cyan' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'dark';
type ButtonGradient = 'purple-blue' | 'blue-cyan' | 'purple-cyan';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  gradient?: ButtonGradient;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

const filled: Record<ButtonColor, string> = {
  purple: 'bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700',
  blue: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
  cyan: 'bg-cyan-500 text-white hover:bg-cyan-600 active:bg-cyan-700',
  success: 'bg-success-main text-white hover:brightness-110 active:brightness-90',
  warning: 'bg-warning-main text-white hover:brightness-110 active:brightness-90',
  error: 'bg-error-main text-white hover:brightness-110 active:brightness-90',
  info: 'bg-info-main text-white hover:brightness-110 active:brightness-90',
  neutral: 'bg-neutral-main text-white hover:brightness-110 active:brightness-90',
  dark: 'bg-[#000000]/40 text-white border border-border hover:bg-[#000000]/60 active:bg-[#000000]/80',
};

const outline: Record<ButtonColor, string> = {
  purple: 'border border-purple-500 text-purple-500 hover:bg-purple-500/10 active:bg-purple-500/20',
  blue: 'border border-blue-500 text-blue-500 hover:bg-blue-500/10 active:bg-blue-500/20',
  cyan: 'border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 active:bg-cyan-500/20',
  success: 'border border-success-main text-success-main hover:bg-success-main/10 active:bg-success-main/20',
  warning: 'border border-warning-main text-warning-main hover:bg-warning-main/10 active:bg-warning-main/20',
  error: 'border border-error-main text-error-main hover:bg-error-main/10 active:bg-error-main/20',
  info: 'border border-info-main text-info-main hover:bg-info-main/10 active:bg-info-main/20',
  neutral: 'border border-neutral-main text-neutral-main hover:bg-neutral-main/10 active:bg-neutral-main/20',
  dark: 'border border-white/10 text-white hover:bg-white/10 active:bg-white/20',
};

const ghost: Record<ButtonColor, string> = {
  purple: 'text-purple-500 hover:bg-purple-500/10 active:bg-purple-500/20',
  blue: 'text-blue-500 hover:bg-blue-500/10 active:bg-blue-500/20',
  cyan: 'text-cyan-500 hover:bg-cyan-500/10 active:bg-cyan-500/20',
  success: 'text-success-main hover:bg-success-main/10 active:bg-success-main/20',
  warning: 'text-warning-main hover:bg-warning-main/10 active:bg-warning-main/20',
  error: 'text-error-main hover:bg-error-main/10 active:bg-error-main/20',
  info: 'text-info-main hover:bg-info-main/10 active:bg-info-main/20',
  neutral: 'text-neutral-main hover:bg-neutral-main/10 active:bg-neutral-main/20',
  dark: 'text-white/60 hover:text-white hover:bg-white/10 active:bg-white/20',
};

const gradients: Record<ButtonGradient, string> = {
  'purple-blue': 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90 active:opacity-80',
  'blue-cyan': 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 active:opacity-80',
  'purple-cyan': 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:opacity-90 active:opacity-80',
};

const sizes: Record<ButtonSize, string> = {
  xs: 'h-7 px-2.5 text-xs',
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  xl: 'h-14 px-8 text-lg',
};

export function Button({
  variant = 'filled',
  color = 'purple',
  gradient = 'purple-blue',
  size = 'md',
  fullWidth,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const variantStyles = variant === 'gradient'
    ? gradients[gradient]
    : variant === 'filled'
      ? filled[color]
      : variant === 'outline'
        ? outline[color]
        : ghost[color];

  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 ${variantStyles} ${sizes[size]} ${fullWidth ? 'w-full' : ''} disabled:opacity-50 disabled:pointer-events-none ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
