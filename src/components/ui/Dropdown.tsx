import { useRef, useEffect, type ReactNode } from 'react';

interface DropdownItem {
  label: string;
  onClick?: () => void;
  selected?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function Dropdown({ trigger, items, open, onToggle, onClose }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={onToggle}>{trigger}</div>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-20 rounded border border-border bg-surface-1 py-1 shadow-lg min-w-[10rem]">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => { item.onClick?.(); onClose(); }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                item.selected
                  ? 'text-purple-400 bg-purple-900/20'
                  : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
