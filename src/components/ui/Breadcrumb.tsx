import { Link } from 'react-router-dom';

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 text-sm truncate">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5 truncate">
          {i > 0 && (
            <svg className="h-3.5 w-3.5 shrink-0 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          {item.href ? (
            <Link to={item.href} className="text-text-tertiary hover:text-text-primary transition-colors truncate shrink-0">
              {item.label}
            </Link>
          ) : (
            <span className="text-text-secondary font-medium truncate">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
