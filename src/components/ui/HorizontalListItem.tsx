import type { ReactNode } from 'react';

interface HorizontalListItemProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function HorizontalListItem({ title, description, icon }: HorizontalListItemProps) {
  return (
    <div className="flex items-center gap-3">
      {icon && <div className="shrink-0">{icon}</div>}
      <div className="flex flex-col">
        <span className="text-[15px] font-medium text-text-primary">{title}</span>
        <span className="text-[15px] font-normal text-text-disabled">{description}</span>
      </div>
    </div>
  );
}
