import type { ReactNode } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LazyImage } from '../../components/ui/LazyImage';
import { Button } from '../../components/ui/Button';
import { SecondaryButton } from '../../components/ui/ButtonPremium';

const projects = {
  'co hive-platform': {
    title: 'COHIVE Platform',
    description: 'Enterprise project management platform with AI-powered insights, real-time collaboration, and automated workflows for cross-functional teams.',
    owner: 'Sarah Ahmad',
    startDate: 'Jan 15, 2026',
    dueDate: 'Aug 30, 2026',
    stage: 'Development',
    stageBadge: 'info' as const,
    health: 'Good' as const,
    healthBadge: 'success' as const,
    progress: 65,
    totalTasks: 48,
    completedTasks: 12,
    inProgressTasks: 20,
    pendingTasks: 10,
    blockedTasks: 6,
    issues: [
      { icon: 'danger', number: 2, label: 'Critical issues' },
      { icon: 'warning', number: 4, label: 'Warnings' },
      { icon: 'info', number: 8, label: 'Info' },
    ],
    milestones: [
      { name: 'MVP Release', planned: 'Mar 01', projected: 'Mar 15', delay: '14 days', status: 'delayed' as const },
      { name: 'Beta Launch', planned: 'May 01', projected: 'May 10', delay: '9 days', status: 'delayed' as const },
      { name: 'V1.0 Launch', planned: 'Aug 30', projected: 'Aug 30', delay: 'On track', status: 'on-track' as const },
    ],
    blockers: [
      { blocker: 'API Rate Limit', task: 'User Sync', blocked: '5 days', affected: 'Auth, Notifications', nextStep: 'Awaiting vendor fix' },
      { blocker: 'Design Sign-off', task: 'Dashboard v2', blocked: '3 days', affected: 'Frontend Team', nextStep: 'Review pending' },
      { blocker: 'Database Migration', task: 'Data Pipeline', blocked: '7 days', affected: 'Analytics', nextStep: 'Schema review' },
    ],
    decisions: [
      { title: 'Tech Stack Finalized', metadata: 'Sarah A. · 2 days ago', icon: 'check' as const },
      { title: 'UI Kit Approved', metadata: 'Design Team · 4 days ago', icon: 'check' as const },
      { title: 'Auth Provider Change', metadata: 'Sarah A. · 1 week ago', icon: 'check' as const },
    ],
    team: [
      { name: 'Alex Hales', initials: 'AH', role: 'Lead Developer', tasks: 14 },
      { name: 'Olivia Martinez', initials: 'OM', role: 'UI/UX Designer', tasks: 10 },
      { name: 'Samuel Kim', initials: 'SK', role: 'Backend Engineer', tasks: 12 },
      { name: 'Jessica Huang', initials: 'JH', role: 'QA Engineer', tasks: 8 },
    ],
    timeline: [
      { activity: 'Sarah A. merged PR #142 — Auth module refactor', time: '2 hours ago' },
      { activity: 'Olivia M. uploaded new mockups for Dashboard v2', time: '4 hours ago' },
      { activity: 'Samuel K. deployed staging environment v0.8.3', time: '6 hours ago' },
      { activity: 'Jessica H. opened issue #89 — Data sync timeout', time: '1 day ago' },
      { activity: 'Sarah A. created milestone: V1.0 Launch', time: '2 days ago' },
    ],
  },
  'mobile-app-redesign': {
    title: 'Mobile App Redesign',
    description: 'Complete redesign of the mobile application with focus on user experience, performance optimization, and accessibility compliance across all devices.',
    owner: 'Olivia Martinez',
    startDate: 'Feb 01, 2026',
    dueDate: 'Jul 15, 2026',
    stage: 'Design Review',
    stageBadge: 'warning' as const,
    health: 'At Risk' as const,
    healthBadge: 'warning' as const,
    progress: 35,
    totalTasks: 24,
    completedTasks: 4,
    inProgressTasks: 8,
    pendingTasks: 8,
    blockedTasks: 4,
    issues: [
      { icon: 'danger', number: 3, label: 'Critical issues' },
      { icon: 'warning', number: 5, label: 'Warnings' },
      { icon: 'info', number: 6, label: 'Info' },
    ],
    milestones: [
      { name: 'Design Complete', planned: 'Mar 15', projected: 'Apr 01', delay: '17 days', status: 'delayed' as const },
      { name: 'Dev Handoff', planned: 'Apr 01', projected: 'Apr 15', delay: '14 days', status: 'delayed' as const },
      { name: 'App Store Submit', planned: 'Jul 15', projected: 'Jul 15', delay: 'On track', status: 'on-track' as const },
    ],
    blockers: [
      { blocker: 'Figma License', task: 'Design System', blocked: '2 days', affected: 'Design Team', nextStep: 'IT approval' },
      { blocker: 'API Spec Review', task: 'Login Flow', blocked: '4 days', affected: 'Mobile Dev', nextStep: 'Backend update' },
      { blocker: 'Accessibility Audit', task: 'Component Audit', blocked: '1 day', affected: 'QA', nextStep: 'Scheduling audit' },
    ],
    decisions: [
      { title: 'Color Palette Finalized', metadata: 'Olivia M. · 1 day ago', icon: 'check' as const },
      { title: 'Navigation Pattern Chosen', metadata: 'Design Team · 3 days ago', icon: 'check' as const },
      { title: 'Animation Library Selected', metadata: 'Olivia M. · 5 days ago', icon: 'check' as const },
    ],
    team: [
      { name: 'Alex Hales', initials: 'AH', role: 'Mobile Developer', tasks: 8 },
      { name: 'Olivia Martinez', initials: 'OM', role: 'Lead Designer', tasks: 6 },
      { name: 'Jessica Huang', initials: 'JH', role: 'QA Engineer', tasks: 5 },
    ],
    timeline: [
      { activity: 'Olivia M. shared new component prototypes', time: '1 hour ago' },
      { activity: 'Alex H. reviewed iOS navigation implementation', time: '3 hours ago' },
      { activity: 'Jessica H. logged 3 accessibility findings', time: '5 hours ago' },
      { activity: 'Olivia M. updated color palette documentation', time: '1 day ago' },
    ],
  },
};

function CircularProgress({ percentage }: { percentage: number }) {
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - percentage / 100);
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="-rotate-90" width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="currentColor" strokeWidth="6" className="text-surface-2" />
        <circle
          cx="48" cy="48" r={r}
          fill="none" stroke="currentColor" strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-blue-500"
        />
      </svg>
      <span className="absolute text-lg font-bold text-text-primary">{percentage}%</span>
    </div>
  );
}

const statusIconMap: Record<string, ReactNode> = {
  danger: (
    <div className="h-2 w-2 rounded-full bg-error-main shrink-0" />
  ),
  warning: (
    <div className="h-2 w-2 rounded-full bg-warning-main shrink-0" />
  ),
  info: (
    <div className="h-2 w-2 rounded-full bg-info-main shrink-0" />
  ),
};

export default function ProjectDetailsPage() {
  const { projectId = '' } = useParams();
  const project = projects[projectId as keyof typeof projects];

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <h2 className="text-xl font-bold text-text-primary">Project not found</h2>
        <p className="text-sm text-text-tertiary">The project you're looking for does not exist.</p>
        <Link to="/projects">
          <Button variant="outline" color="purple" size="sm">Back to Projects</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-2 text-sm text-text-disabled">
        <Link to="/projects" className="hover:text-text-secondary transition-colors">Projects</Link>
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-text-secondary">{project.title}</span>
      </div>
      <Card className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="inline-flex shrink-0 items-center justify-center rounded-lg h-14 w-14 bg-purple-900">
              <LazyImage src="./svg/folder-default.svg" alt="" className="h-7 w-7" />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold text-text-primary">{project.title}</h1>
              <p className="text-sm text-text-secondary max-w-2xl">{project.description}</p>
              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-text-disabled">Owner</span>
                  <span className="text-sm font-medium text-text-primary">{project.owner}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-text-disabled">Team</span>
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((m) => (
                        <div key={m.initials} className="h-6 w-6 rounded-full bg-surface-2 border border-bg-secondary flex items-center justify-center">
                          <span className="text-[10px] font-medium text-text-secondary">{m.initials}</span>
                        </div>
                      ))}
                    </div>
                    {project.team.length > 3 && (
                      <span className="ml-1.5 text-xs font-medium text-text-tertiary">+{project.team.length - 3}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-text-disabled">Start date</span>
                  <span className="text-sm font-medium text-text-primary">{project.startDate}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-text-disabled">Due date</span>
                  <span className="text-sm font-medium text-text-primary">{project.dueDate}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-text-disabled">Stage</span>
                  <Badge variant={project.stageBadge}>{project.stage}</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SecondaryButton size="sm">Edit</SecondaryButton>
            <button className="h-9 w-9 flex items-center justify-center rounded-lg text-text-disabled hover:text-text-primary hover:bg-surface-2 transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
              </svg>
            </button>
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-3 gap-5">
        <Card className="p-5">
          <div className="flex items-center gap-6">
            <CircularProgress percentage={project.progress} />
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'Completed', count: project.completedTasks, percent: Math.round(project.completedTasks / project.totalTasks * 100), color: 'text-success-main' },
                { label: 'In Progress', count: project.inProgressTasks, percent: Math.round(project.inProgressTasks / project.totalTasks * 100), color: 'text-blue-500' },
                { label: 'Pending', count: project.pendingTasks, percent: Math.round(project.pendingTasks / project.totalTasks * 100), color: 'text-text-tertiary' },
                { label: 'Blocked', count: project.blockedTasks, percent: Math.round(project.blockedTasks / project.totalTasks * 100), color: 'text-error-main' },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full shrink-0 ${row.color.replace('text-', 'bg-')}`} />
                  <span className="w-20 text-xs text-text-secondary">{row.label}</span>
                  <span className="w-6 text-xs font-medium text-text-primary text-right">{row.count}</span>
                  <span className="w-8 text-[11px] text-text-disabled text-right">{row.percent}%</span>
                </div>
              ))}
              <div className="flex items-center gap-3 pt-1.5 border-t border-border">
                <div className="h-2 w-2 rounded-full bg-text-disabled shrink-0" />
                <span className="w-20 text-xs font-medium text-text-primary">Total tasks</span>
                <span className="w-6 text-xs font-medium text-text-primary text-right">{project.totalTasks}</span>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Health Status</h3>
            <Badge variant={project.healthBadge}>{project.health}</Badge>
          </div>
          <p className="text-sm text-text-secondary">Project is progressing well with minor risks identified and being addressed.</p>
          <div className="h-px bg-border" />
          <div className="flex flex-col gap-3">
            {project.issues.map((issue) => (
              <div key={issue.label} className="flex items-center gap-3">
                {statusIconMap[issue.icon]}
                <span className="flex-1 text-sm text-text-secondary">{issue.label}</span>
                <span className="text-sm font-medium text-text-primary">{issue.number}</span>
              </div>
            ))}
          </div>
          <button className="self-start text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors">
            View detailed health report
          </button>
        </Card>
        <Card className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Milestone Tracker</h3>
            <button className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-text-disabled border-b border-border">
                  <th className="text-left font-medium pb-2">Milestone</th>
                  <th className="text-left font-medium pb-2">Planned</th>
                  <th className="text-left font-medium pb-2">Projected</th>
                  <th className="text-left font-medium pb-2">Delay</th>
                </tr>
              </thead>
              <tbody>
                {project.milestones.map((m) => (
                  <tr key={m.name} className="border-b border-border/50 last:border-b-0">
                    <td className="py-2.5 text-text-primary">{m.name}</td>
                    <td className="py-2.5 text-text-secondary">{m.planned}</td>
                    <td className="py-2.5 text-text-secondary">{m.projected}</td>
                    <td className="py-2.5">
                      <span className={`text-xs font-medium ${m.status === 'on-track' ? 'text-success-main' : 'text-warning-main'}`}>
                        {m.delay}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <Card className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Active Blockers</h3>
            <button className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-text-disabled border-b border-border">
                  <th className="text-left font-medium pb-2">Blocker</th>
                  <th className="text-left font-medium pb-2">Task</th>
                  <th className="text-left font-medium pb-2">Blocked</th>
                  <th className="text-left font-medium pb-2">Affected</th>
                  <th className="text-left font-medium pb-2">Next step</th>
                </tr>
              </thead>
              <tbody>
                {project.blockers.map((b) => (
                  <tr key={b.blocker} className="border-b border-border/50 last:border-b-0">
                    <td className="py-2.5 pr-2 text-text-primary whitespace-nowrap">{b.blocker}</td>
                    <td className="py-2.5 pr-2 text-text-secondary whitespace-nowrap">{b.task}</td>
                    <td className="py-2.5 pr-2 text-text-secondary whitespace-nowrap">{b.blocked}</td>
                    <td className="py-2.5 pr-2 text-text-secondary whitespace-nowrap">{b.affected}</td>
                    <td className="py-2.5 text-text-tertiary whitespace-nowrap">{b.nextStep}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Recent Decisions</h3>
            <button className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors">View all</button>
          </div>
          <div className="flex flex-col gap-3">
            {project.decisions.map((d) => (
              <div key={d.title} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-success-bg flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="h-3.5 w-3.5 text-success-main" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{d.title}</p>
                  <p className="text-xs text-text-disabled">{d.metadata}</p>
                </div>
                <button className="text-text-disabled hover:text-text-primary transition-colors shrink-0">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary">Team Roster</h3>
            <button className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors">Manage team</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-text-disabled border-b border-border">
                  <th className="text-left font-medium pb-2">Member</th>
                  <th className="text-left font-medium pb-2">Role</th>
                  <th className="text-right font-medium pb-2">Tasks</th>
                </tr>
              </thead>
              <tbody>
                {project.team.map((m) => (
                  <tr key={m.initials} className="border-b border-border/50 last:border-b-0">
                    <td className="py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-surface-2 flex items-center justify-center">
                          <span className="text-[11px] font-medium text-text-secondary">{m.initials}</span>
                        </div>
                        <span className="text-sm text-text-primary">{m.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5">
                      <span className="text-xs text-text-secondary">{m.role}</span>
                    </td>
                    <td className="py-2.5 text-right">
                      <span className="text-sm font-medium text-text-primary">{m.tasks}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <Card className="p-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary">Activity Timeline</h3>
          <div className="flex h-9 w-32 items-center gap-2 rounded border border-border bg-field-bg px-3 text-xs text-field-text cursor-pointer hover:border-purple-800 transition-colors">
            <span className="flex-1">All activity</span>
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-0">
          {project.timeline.map((item, i) => (
            <div key={i} className="flex gap-4 pb-5 last:pb-0 relative">
              {i < project.timeline.length - 1 ? (
                <div className="flex flex-col items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-purple-500 shrink-0 ring-2 ring-bg-secondary" />
                  <div className="w-px flex-1 bg-border mt-1" />
                </div>
              ) : (
                <div className="h-2.5 w-2.5 rounded-full bg-surface-2 shrink-0 ring-2 ring-bg-secondary" />
              )}
              <div className="flex-1 min-w-0 -mt-0.5">
                <p className="text-sm text-text-primary">{item.activity}</p>
                <p className="text-xs text-text-disabled mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
