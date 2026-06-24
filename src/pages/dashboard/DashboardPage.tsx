import { useState } from 'react';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { LazyImage } from '../../components/ui/LazyImage';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';
import { TertiaryButton } from '../../components/ui/TertiaryButton';
import { Card } from '../../components/ui/Card';
import { MainCard } from '../../components/ui/MainCard';
import { HorizontalListItem } from '../../components/ui/HorizontalListItem';
import { Badge } from '../../components/ui/Badge';
import { Alert } from '../../components/ui/Alert';
import aiCover from '../../assets/ai-cover.png';
import danger from '../../assets/svg/danger.svg';
import fileCheck from '../../assets/svg/file-check.svg';
import checklistGreen from '../../assets/svg/checklist-green.svg';
import aiDocument from '../../assets/svg/document.svg';

const monthColors: Record<string, string> = {
  error: 'text-error-main',
  warning: 'text-warning-main',
  success: 'text-success-main',
  info: 'text-info-main',
  neutral: 'text-text-disabled',
};

// ── Desktop sub-components ──────────────────────────────────

function DesktopPriorityItem({ title, description, badge, badgeVariant }: {
  title: string;
  description: string;
  badge: string;
  badgeVariant: 'info' | 'error' | 'warning' | 'success' | 'neutral';
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <HorizontalListItem title={title} description={description} />
      <Badge variant={badgeVariant}>{badge}</Badge>
    </div>
  );
}

function DesktopDeadlineItem({ date, title, subtitle, badgeVariant }: {
  date: string;
  title: string;
  subtitle: string;
  badgeVariant: 'success' | 'warning' | 'error' | 'info' | 'neutral';
}) {
  const parts = date.split(' ');
  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-col items-center justify-center w-14 h-14 rounded border border-border-white-10">
        <span className="text-base font-semibold text-text-primary">{parts[1]}</span>
        <span className={`text-sm ${monthColors[badgeVariant] || 'text-text-disabled'}`}>{parts[0]}</span>
      </div>
      <div className="flex-1">
        <span className="block text-sm font-medium text-text-primary">{title}</span>
        <span className="block text-xs text-text-disabled">{subtitle}</span>
      </div>
      <Badge variant={badgeVariant}>High</Badge>
    </div>
  );
}

// ── Desktop layout (unchanged) ──────────────────────────────

function DesktopDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <div className="flex w-[65%] flex-col gap-6">
          <Card className="relative overflow-hidden !border-blue-500/20">
            <img
              src={aiCover}
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="relative z-10" />
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className='flex items-center gap-2'>
                  <img src={aiDocument} alt="" />
                  <h2 className="text-lg font-semibold text-text-primary">AI Daily Brief</h2>
                  <p className="text-sm text-text-disabled">Friday, May 16</p>
                </div>
                <Button variant="filled" color="dark" size="sm" className="gap-1.5">
                  <LazyImage src="./svg/ai-stars.svg" alt="AI Stars" className="h-4 w-4" />
                  Ask AI assistant
                </Button>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-semibold text-text-primary">Good morning, Sarah Ahmed</h3>
                <p className="mt-2 text-base leading-relaxed text-text-secondary">
                  The team delivered 23% more story points this week.
                  4 tasks are blocked awaiting dependencies,
                  2 approvals and 1 decision needed to keep momentum.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-stretch gap-6">
                  <div className="flex flex-1 items-center justify-center gap-3">
                    <Icon src={danger} alt="" size="sm" bg="error" />
                    <div className="flex flex-col w-fit">
                      <span className="text-15 text-text-disabled whitespace-nowrap">Blocked tasks</span>
                      <span className="text-lg font-bold text-text-primary whitespace-nowrap">1</span>
                    </div>
                  </div>
                  <div className="w-px self-stretch bg-border-white-6" />
                  <div className="flex flex-1 items-center justify-center gap-3">
                    <Icon src={fileCheck} alt="" size="sm" bg="info" />
                    <div className="flex flex-col w-fit">
                      <span className="text-15 text-text-disabled whitespace-nowrap">Decisions</span>
                      <span className="text-lg font-bold text-text-primary whitespace-nowrap">2</span>
                    </div>
                  </div>
                  <div className="w-px self-stretch bg-border-white-6" />
                  <div className="flex flex-1 items-center justify-center gap-3">
                    <Icon src={checklistGreen} alt="" size="sm" bg="success" />
                    <div className="flex flex-col w-fit">
                      <span className="text-15 text-text-disabled whitespace-nowrap">Approvals</span>
                      <span className="text-lg font-bold text-text-primary">4</span>
                    </div>
                  </div>
                </div>
                <TertiaryButton color="purple">View Details</TertiaryButton>
              </div>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-6">
            <MainCard title="My Priority Tasks" actionLabel="View all" icon="./svg/tasks.svg">
              <div className="flex flex-col gap-4">
                <DesktopPriorityItem
                  title="Redesign dashboard UI"
                  description="Tasks due today - 16 May"
                  badge="In progress"
                  badgeVariant="info"
                />
                <div className="border-t border-border" />
                <DesktopPriorityItem
                  title="Redesign dashboard UI"
                  description="Tasks due 20 May"
                  badge="In progress"
                  badgeVariant="info"
                />
                <div className="border-t border-border" />
                <DesktopPriorityItem
                  title="Redesign dashboard UI"
                  description="Tasks due 20 May"
                  badge="Blocked"
                  badgeVariant="error"
                />
              </div>
            </MainCard>
            <MainCard title="Blockers and risks" actionLabel="View all" icon={danger}>
              <div className="flex flex-col gap-4">
                <Alert
                  variant="error"
                  title="Api integration is blocked"
                  description="Waiting for API team to fix rate limit issue"
                  footerText="Blocked for 2 days"
                  badgeText="High"
                />
                <Alert
                  variant="warning"
                  title="Api integration is blocked"
                  description="Waiting for API team to fix rate limit issue"
                  footerText="At risk"
                  badgeText="Medium"
                />
              </div>
            </MainCard>
          </div>
        </div>
        <div className="flex w-[35%] flex-col gap-6">
          <MainCard title="Upcoming Deadlines" actionLabel="View all" icon="./svg/calendar-lightblue.svg">
            <div className="flex flex-col gap-4">
              <DesktopDeadlineItem
                date="May 16"
                title="Dashboard UI Design"
                subtitle="COHIVE"
                badgeVariant="error"
              />
              <div className="border-t border-border" />
              <DesktopDeadlineItem
                date="May 16"
                title="Dashboard UI Design"
                subtitle="COHIVE"
                badgeVariant="error"
              />
            </div>
          </MainCard>
          <MainCard title="Pending approvals" actionLabel="View all" icon="./svg/pending-approval.svg">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <HorizontalListItem
                  title="New feature spec"
                  description="Requested by Omar Hassan"
                />
                <Icon src="" alt="menu" size="sm" />
              </div>
              <div className="border-t border-border" />
              <div className="flex items-center justify-between">
                <HorizontalListItem
                  title="New feature spec"
                  description="Requested by Omar Hassan"
                />
                <Icon src="" alt="menu" size="sm" />
              </div>
            </div>
          </MainCard>
          <MainCard title="Recent activity" actionLabel="View all" icon="./svg/square-chart.svg">
            <div className="flex flex-col gap-4">
              <HorizontalListItem
                title="Ahmad Hassan completed 3 tasks in COHIVE redesign"
                description="2m ago"
              />
              <div className="border-t border-border" />
              <HorizontalListItem
                title="Ahmad Hassan completed 3 tasks in Dashboard UI Design"
                description="3h ago"
              />
            </div>
          </MainCard>
        </div>
      </div>
    </div>
  );
}

// ── Mobile sub-components ───────────────────────────────────

function MobileTaskRow({ title, due, badge, badgeVariant }: {
  title: string;
  due: string;
  badge: string;
  badgeVariant: 'info' | 'error' | 'warning' | 'success' | 'neutral';
}) {
  return (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
      <div className="flex flex-col min-w-0 mr-2">
        <span className="text-sm font-medium text-text-primary truncate">{title}</span>
        <span className="text-xs text-text-disabled mt-0.5">{due}</span>
      </div>
      <Badge variant={badgeVariant}>{badge}</Badge>
    </div>
  );
}

function MobileDeadlineItem({ date, title, subtitle }: {
  date: string;
  title: string;
  subtitle: string;
}) {
  const parts = date.split(' ');
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg border border-border-white-10 shrink-0">
        <span className="text-xs font-semibold text-text-primary">{parts[1]}</span>
        <span className="text-[11px] text-text-disabled">{parts[0]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <span className="block text-sm font-medium text-text-primary truncate">{title}</span>
        <span className="block text-xs text-text-disabled">{subtitle}</span>
      </div>
    </div>
  );
}

function MobileApprovalItem({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 first:pt-0 last:pb-0">
      <div className="flex-1 min-w-0 mr-2">
        <span className="block text-sm text-text-primary truncate">{title}</span>
        <span className="block text-xs text-text-disabled">{subtitle}</span>
      </div>
      <button className="h-9 w-9 flex items-center justify-center rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors shrink-0">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
        </svg>
      </button>
    </div>
  );
}

function MobileActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex items-start gap-3 py-1.5 first:pt-0 last:pb-0">
      <div className="h-2 w-2 rounded-full bg-surface-2 ring-2 ring-bg-secondary shrink-0 mt-1.5" />
      <div className="flex-1 min-w-0">
        <span className="block text-sm text-text-primary truncate">{text}</span>
        <span className="block text-xs text-text-disabled mt-0.5">{time}</span>
      </div>
    </div>
  );
}

function CollapsibleSection({ title, defaultOpen, children }: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div className="bg-surface-1 border border-border rounded-2xl">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 w-full px-4 py-3.5"
      >
        <svg
          className={`h-3.5 w-3.5 text-text-tertiary transition-transform ${open ? 'rotate-0' : '-rotate-90'}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="text-sm font-semibold text-text-primary">{title}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Mobile layout ───────────────────────────────────────────

function MobileDashboard() {
  const [tabIndex, setTabIndex] = useState(0);
  const [sectionsOpen, setSectionsOpen] = useState<Record<string, boolean>>({
    tasks: true,
    updates: false,
    activity: false,
  });

  const toggleSection = (key: string) => setSectionsOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const tabs = ['Deadlines', 'Approvals', 'Activity'];

  const deadlines = [
    { date: 'May 16', title: 'Dashboard UI Design', subtitle: 'COHIVE' },
    { date: 'May 19', title: 'Mobile App Redesign', subtitle: 'COHIVE' },
    { date: 'May 22', title: 'API Gateway Migration', subtitle: 'COHIVE' },
  ];

  const approvals = [
    { title: 'New feature spec', subtitle: 'Requested by Omar Hassan' },
    { title: 'Budget review Q2', subtitle: 'Requested by Finance' },
    { title: 'Design system update', subtitle: 'Requested by Design Team' },
  ];

  const activities = [
    { text: 'Ahmad Hassan completed 3 tasks in COHIVE redesign', time: '2m ago' },
    { text: 'Sarah Ahmad merged PR #142 — Auth module refactor', time: '2h ago' },
    { text: 'Olivia M. uploaded new mockups for Dashboard v2', time: '4h ago' },
  ];

  return (
    <div className="flex flex-col gap-3 p-4 pb-20">
      {/* ── 1. AI Daily Brief ── */}
      <div className="relative overflow-hidden bg-surface-1 border border-blue-500/20 rounded-2xl">
        <img
          src={aiCover}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="relative p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-sm font-semibold text-text-primary">AI Daily Brief</h2>
              <p className="text-xs text-text-disabled">Friday, May 16</p>
            </div>
            <button className="text-xs font-medium text-purple-400 whitespace-nowrap shrink-0 ml-2">
              View details →
            </button>
          </div>
          <h3 className="text-base font-semibold text-text-primary mb-2">Good morning, Sarah Ahmed</h3>
          <p className="text-xs leading-relaxed text-text-secondary mb-3">
            The team delivered 23% more story points this week.
            4 tasks are blocked awaiting dependencies,
            2 approvals and 1 decision needed to keep momentum.
          </p>
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
            <div className="inline-flex shrink-0 items-center gap-1.5 h-8 px-3 rounded-lg border border-error-border bg-error-bg">
              <div className="h-1.5 w-1.5 rounded-full bg-error-main" />
              <span className="text-xs font-medium text-error-text whitespace-nowrap">1 Blocked</span>
            </div>
            <div className="inline-flex shrink-0 items-center gap-1.5 h-8 px-3 rounded-lg border border-info-border bg-info-bg">
              <div className="h-1.5 w-1.5 rounded-full bg-info-main" />
              <span className="text-xs font-medium text-info-text whitespace-nowrap">2 Decisions</span>
            </div>
            <div className="inline-flex shrink-0 items-center gap-1.5 h-8 px-3 rounded-lg border border-success-border bg-success-bg">
              <div className="h-1.5 w-1.5 rounded-full bg-success-main" />
              <span className="text-xs font-medium text-success-text whitespace-nowrap">4 Approvals</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Attention Required ── */}
      <div className="bg-surface-1 border border-border rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-text-primary">⚠ Attention Required (2)</h3>
          <button className="text-xs font-medium text-purple-400">View all</button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-3 rounded-lg border border-error-border bg-error-bg p-3">
            <div className="h-2 w-2 rounded-full bg-error-main shrink-0 mt-1.5" />
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-medium text-error-text">API integration blocked</span>
              <span className="block text-xs text-text-disabled mt-0.5">Blocked for 2 days</span>
            </div>
            <Badge variant="error">High</Badge>
          </div>
          <div className="flex items-start gap-3 rounded-lg border border-warning-border bg-warning-bg p-3">
            <div className="h-2 w-2 rounded-full bg-warning-main shrink-0 mt-1.5" />
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-medium text-warning-text">Database migration stalled</span>
              <span className="block text-xs text-text-disabled mt-0.5">At risk</span>
            </div>
            <Badge variant="warning">Medium</Badge>
          </div>
        </div>
      </div>

      {/* ── 3. Priority Tasks (collapsible, default open) ── */}
      <div className="bg-surface-1 border border-border rounded-2xl">
        <button
          onClick={() => toggleSection('tasks')}
          className="flex items-center gap-2 w-full px-4 py-3.5"
        >
          <svg className={`h-3.5 w-3.5 text-text-tertiary transition-transform ${sectionsOpen.tasks ? 'rotate-0' : '-rotate-90'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="text-sm font-semibold text-text-primary">My Priority Tasks</span>
        </button>
        {sectionsOpen.tasks && (
          <div className="px-4 pb-3 border-t border-border divide-y divide-border">
            <MobileTaskRow title="Redesign dashboard UI" due="Due today" badge="In progress" badgeVariant="info" />
            <MobileTaskRow title="Mobile app redesign" due="Due 20 May" badge="In progress" badgeVariant="info" />
            <MobileTaskRow title="API gateway migration" due="Due 22 May" badge="Blocked" badgeVariant="error" />
            <button className="w-full text-center pt-3 pb-1 text-xs font-medium text-purple-400">View all</button>
          </div>
        )}
      </div>

      {/* ── 4. Tabbed Card: Deadlines | Approvals | Activity ── */}
      <div className="bg-surface-1 border border-border rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-0">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setTabIndex(i)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  tabIndex === i ? 'bg-purple-900/50 text-purple-300' : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="text-xs font-medium text-purple-400">View all</button>
        </div>
        <div className="border-t border-border -mx-4 px-4 pt-3">
          {tabIndex === 0 && (
            <div className="flex flex-col gap-3">
              {deadlines.map((d) => <MobileDeadlineItem key={d.title} {...d} />)}
            </div>
          )}
          {tabIndex === 1 && (
            <div className="flex flex-col gap-1">
              {approvals.map((a) => <MobileApprovalItem key={a.title} {...a} />)}
            </div>
          )}
          {tabIndex === 2 && (
            <div className="flex flex-col gap-1">
              {activities.map((a) => <MobileActivityItem key={a.text} {...a} />)}
            </div>
          )}
        </div>
      </div>

      {/* ── 5. Updates (collapsible, closed) ── */}
      <CollapsibleSection title="Updates">
        <div className="pt-3 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-purple-900 flex items-center justify-center shrink-0">
              <span className="text-xs font-medium text-purple-300">SA</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-sm text-text-primary truncate">Deployed staging environment v0.8.3</span>
              <span className="block text-xs text-text-disabled">2 hours ago</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center shrink-0">
              <span className="text-xs font-medium text-blue-300">OM</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-sm text-text-primary truncate">Uploaded new mockups for Dashboard v2</span>
              <span className="block text-xs text-text-disabled">4 hours ago</span>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}

// ── Main export ─────────────────────────────────────────────

export default function DashboardPage() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileDashboard /> : <DesktopDashboard />;
}
