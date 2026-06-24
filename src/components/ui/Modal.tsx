import type { ReactNode } from 'react';

type ModalColor = 'success' | 'warning' | 'error' | 'info' | 'neutral';

const variantStyles: Record<ModalColor, { bg: string; color: string; border: string }> = {
  success: { bg: 'bg-success-bg', color: 'text-success-main', border: 'border-success-border' },
  warning: { bg: 'bg-warning-bg', color: 'text-warning-main', border: 'border-warning-border' },
  error: { bg: 'bg-error-bg', color: 'text-error-main', border: 'border-error-border' },
  info: { bg: 'bg-info-bg', color: 'text-info-main', border: 'border-info-border' },
  neutral: { bg: 'bg-neutral-bg', color: 'text-neutral-main', border: 'border-neutral-border' },
};

const buttonStyles: Record<ModalColor, string> = {
  success: 'bg-success-main text-white hover:brightness-110 active:brightness-90',
  warning: 'bg-warning-main text-white hover:brightness-110 active:brightness-90',
  error: 'bg-error-main text-white hover:brightness-110 active:brightness-90',
  info: 'bg-info-main text-white hover:brightness-110 active:brightness-90',
  neutral: 'bg-neutral-main text-white hover:brightness-110 active:brightness-90',
};

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, onClose, children }: BaseModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-lg border border-border bg-surface-1 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: ReactNode;
  title: string;
  description?: string;
  variant?: ModalColor;
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

export function SimpleModal({
  isOpen,
  onClose,
  icon,
  title,
  description,
  variant = 'neutral',
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}: SimpleModalProps) {
  const v = variantStyles[variant];
  const btn = buttonStyles[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-4">
        <div className={`inline-flex items-center justify-center rounded-full h-16 w-16 ${v.bg} ${v.color}`}>
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-text-secondary">{description}</p>
          )}
        </div>
        {(primaryLabel || secondaryLabel) && (
          <div className="flex items-center gap-3 mt-2">
            {secondaryLabel && (
              <button
                onClick={onSecondary || onClose}
                className="h-10 px-5 text-sm font-medium rounded text-text-secondary border border-border bg-transparent hover:bg-surface-hover active:brightness-90 transition-colors"
              >
                {secondaryLabel}
              </button>
            )}
            {primaryLabel && (
              <button
                onClick={onPrimary || onClose}
                className={`h-10 px-5 text-sm font-medium rounded transition-colors ${btn}`}
              >
                {primaryLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

interface LeftIconModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: ReactNode;
  title: string;
  description?: string;
  variant?: ModalColor;
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

export function LeftIconModal({
  isOpen,
  onClose,
  icon,
  title,
  description,
  variant = 'neutral',
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}: LeftIconModalProps) {
  const v = variantStyles[variant];
  const btn = buttonStyles[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="flex items-start gap-4">
          <div className={`inline-flex items-center justify-center rounded-full h-12 w-12 shrink-0 ${v.bg} ${v.color}`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
              <button
                onClick={onClose}
                className="shrink-0 text-text-tertiary hover:text-text-primary transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {description && (
              <p className="mt-1 text-sm text-text-secondary">{description}</p>
            )}
          </div>
        </div>
        {(primaryLabel || secondaryLabel) && (
          <div className="flex items-center justify-end gap-3 mt-6">
            {secondaryLabel && (
              <button
                onClick={onSecondary || onClose}
                className="h-10 px-5 text-sm font-medium rounded text-text-secondary border border-border bg-transparent hover:bg-surface-hover active:brightness-90 transition-colors"
              >
                {secondaryLabel}
              </button>
            )}
            {primaryLabel && (
              <button
                onClick={onPrimary || onClose}
                className={`h-10 px-5 text-sm font-medium rounded transition-colors ${btn}`}
              >
                {primaryLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
