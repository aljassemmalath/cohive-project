import type { InputHTMLAttributes, ReactNode } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export function TextField({
  label,
  error,
  iconLeft,
  iconRight,
  className = '',
  ...props
}: TextFieldProps) {
  const padLeft = iconLeft ? 'pl-9' : 'pl-2';
  const padRight = iconRight ? 'pr-9' : 'pr-2';

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm text-text-secondary">{label}</label>
      )}
      <div className="relative">
        {iconLeft && (
          <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-field-text">
            {iconLeft}
          </div>
        )}
        <input
          className={`h-11 w-full rounded border bg-field-bg text-sm text-white placeholder-field-text outline-none transition-colors border-border hover:border-purple-800 focus:border-purple-500 focus:bg-field-active-bg ${padLeft} ${padRight} ${className}`}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-field-text">
            {iconRight}
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs text-error-main">{error}</span>
      )}
    </div>
  );
}
