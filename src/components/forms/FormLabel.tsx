import type { LabelHTMLAttributes, ReactNode } from 'react';

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export function FormLabel({ children, className = '', ...props }: FormLabelProps) {
  return (
    <label className={`text-sm font-medium text-[#B8C0D9] ${className}`} {...props}>
      {children}
    </label>
  );
}
