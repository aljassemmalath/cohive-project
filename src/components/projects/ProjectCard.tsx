import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';

export interface ProjectCardData {
  title: string;
  description: string;
  status: string;
  badgeVariant: 'info' | 'warning' | 'success' | 'error' | 'neutral';
  progress: number;
  health: string;
  healthColor: string;
  team: string[];
  metrics: { value: string; label: string }[];
  updated: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const healthCircleMap: Record<string, string> = {
  success: 'bg-success-main',
  warning: 'bg-warning-main',
  error: 'bg-error-main',
  info: 'bg-info-main',
  neutral: 'bg-neutral-main',
};

function healthToColor(key: string): string {
  if (key.includes('success')) return 'success';
  if (key.includes('warning')) return 'warning';
  if (key.includes('error')) return 'error';
  if (key.includes('info')) return 'info';
  return 'neutral';
}

const avatarColors = [
  { bg: 'bg-purple-1000', border: 'border-purple-600', text: 'text-purple-600' },
  { bg: 'bg-blue-900', border: 'border-blue-600', text: 'text-blue-600' },
  { bg: 'bg-cyan-900', border: 'border-cyan-600', text: 'text-cyan-600' },
];

export function ProjectCard({ project }: ProjectCardProps) {
  const maxVisible = 3;
  const visibleTeam = project.team.slice(0, maxVisible);
  const extraTeam = project.team.slice(maxVisible);
  const extraCount = extraTeam.length;

  return (
    <div className="rounded-lg border border-border bg-surface-1">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-text-primary">{project.title}</h3>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            <Badge variant={project.badgeVariant}>{project.status}</Badge>
            <button className="text-text-disabled hover:text-text-primary transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
              </svg>
            </button>
          </div>
        </div>
        <p className="mt-3 text-15 text-text-disabled leading-relaxed">{project.description}</p>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-tertiary">Progress</span>
            <span className="text-xs font-medium text-text-primary">{project.progress}%</span>
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-surface-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${healthCircleMap[healthToColor(project.healthColor)]}`} />
            <span className="text-sm font-medium text-text-primary">{project.health}</span>
          </div>
          <div className="flex -space-x-2">
            {visibleTeam.map((initials, i) => {
              const c = avatarColors[i % avatarColors.length];
              return (
                <div
                  key={i}
                  className={`h-8 w-8 rounded-full ${c.bg} border-2 ${c.border} flex items-center justify-center`}
                >
                  <span className={`text-xs font-semibold ${c.text}`}>{initials}</span>
                </div>
              );
            })}
            {extraCount > 0 && (
              <div className="relative group">
                <div className="h-8 w-8 rounded-full bg-surface-2 border-2 border-surface-2 flex items-center justify-center cursor-default">
                  <span className="text-xs font-semibold text-text-disabled">+{extraCount}</span>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-surface-3 border border-border rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                    {extraTeam.map((name, i) => (
                      <div key={i} className="text-xs text-text-secondary py-0.5">{name}</div>
                    ))}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-surface-3 border-r border-b border-border -mt-1 rotate-45" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="py-4">
        <div className="flex divide-x divide-border">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="flex-1 flex flex-col items-center">
              <span className="text-base font-semibold text-text-primary">{metric.value}</span>
              <span className="text-xs text-text-disabled mt-0.5">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-xs text-text-disabled">{project.updated}</span>
        <Link
          to={`/projects/${slugify(project.title)}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors"
        >
          Project details
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
