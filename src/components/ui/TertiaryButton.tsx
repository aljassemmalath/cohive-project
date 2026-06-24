import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface TertiaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'purple' | 'blue' | 'cyan';
  children: ReactNode;
}

export function TertiaryButton({
  color = 'purple',
  children,
  className = '',
  ...props
}: TertiaryButtonProps) {
  const colors: Record<string, string> = {
    purple: 'text-purple-500 hover:text-purple-400',
    blue: 'text-blue-500 hover:text-blue-400',
    cyan: 'text-cyan-500 hover:text-cyan-400',
  };

  return (
    <button
      className={`inline-flex items-center text-sm font-medium transition-colors underline-offset-4 hover:underline ${colors[color]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
