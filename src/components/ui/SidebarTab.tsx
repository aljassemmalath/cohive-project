import { LazyImage } from './LazyImage';

interface SidebarTabProps {
  label: string;
  icon?: string;
  iconHover?: string;
  iconActive?: string;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarTab({ label, icon, iconHover, iconActive, active, onClick }: SidebarTabProps) {
  const src = active
    ? iconActive || iconHover || icon || ''
    : icon || '';

  return (
    <button
      onClick={onClick}
      className={`relative flex w-full items-center gap-3 rounded px-3 py-2.5 mx-3 text-sm transition-colors ${
        active
          ? 'bg-blue-500/16 text-text-primary'
          : 'text-text-tertiary-2 hover:text-blue-500'
      }`}
    >
      {active && (
        <div className="absolute inset-y-1 left-0 w-[3px] rounded-r bg-gradient-to-b from-blue-500 to-purple-500" />
      )}
      <LazyImage src={src} alt={label} className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
}
