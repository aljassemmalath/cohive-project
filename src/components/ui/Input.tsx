import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-[#B8C0D9]">{label}</label>}
      <input
        className={`h-10 rounded border bg-[#12182B] px-3 text-sm text-white placeholder-[#8C95B1] border-[#28324F] focus:border-[#7A4FE6] focus:outline-none ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
