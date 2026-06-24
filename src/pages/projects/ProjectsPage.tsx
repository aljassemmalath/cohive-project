import { useState, useRef, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { TextField } from '../../components/ui/TextField';
import { ProjectCard } from '../../components/projects/ProjectCard';
const summaryCards = [
  { label: 'Total Projects', value: '24', supporting: 'All projects', icon: '/svg/folder-light-purple.svg', bg: 'purple' as const, bgImage: '/images/purplebg.png' },
  { label: 'In Progress', value: '12', supporting: 'Active development', icon: '/svg/activity-light-blue.svg', bg: 'blue' as const, bgImage: '/images/bluebg.png' },
  { label: 'At Risk', value: '3', supporting: 'Needs attention', icon: '/svg/alert-light-yellow.svg', bg: 'error' as const, bgImage: '/images/orangebg.png' },
  { label: 'Completed', value: '8', supporting: 'This quarter', icon: '/svg/circle-check-light-green.svg', bg: 'success' as const, bgImage: '/images/greenbg.png' },
];

const projects = [
  {
    title: 'COHIVE Platform',
    description: 'Enterprise project management platform with AI-powered insights, real-time collaboration, and automated workflows for cross-functional teams.',
    status: 'In Progress' as const,
    badgeVariant: 'info' as const,
    progress: 65,
    health: 'Good' as const,
    healthColor: 'text-success-main' as const,
    team: ['AH', 'OM', 'SK', 'JH', 'NT'],

    metrics: [
      { value: '48', label: 'Tasks' },
      { value: '2', label: 'Blocked' },
      { value: '3', label: 'Milestones' },
    ],
    updated: 'Updated 2h ago',
  },
  {
    title: 'Mobile App Redesign',
    description: 'Complete redesign of the mobile application with focus on user experience, performance optimization, and accessibility compliance across all devices.',
    status: 'Design Review' as const,
    badgeVariant: 'warning' as const,
    progress: 35,
    health: 'At Risk' as const,
    healthColor: 'text-warning-main' as const,
    team: ['AH', 'OM'],
    metrics: [
      { value: '24', label: 'Tasks' },
      { value: '4', label: 'Blocked' },
      { value: '1', label: 'Milestones' },
    ],
    updated: 'Updated 1h ago',
  },
  {
    title: 'API Gateway Migration',
    description: 'Migrate legacy API gateway to new microservices architecture with improved latency, better error handling, and comprehensive monitoring dashboards.',
    status: 'In Progress' as const,
    badgeVariant: 'info' as const,
    progress: 80,
    health: 'Good' as const,
    healthColor: 'text-success-main' as const,
    team: ['OM', 'SK', 'JH'],
    metrics: [
      { value: '16', label: 'Tasks' },
      { value: '0', label: 'Blocked' },
      { value: '2', label: 'Milestones' },
    ],
    updated: 'Updated 3h ago',
  },
  {
    title: 'Data Pipeline Optimization',
    description: 'Optimize ETL pipelines for better throughput and reliability. Implement real-time data streaming and automated quality checks for data warehouse.',
    status: 'Planning' as const,
    badgeVariant: 'neutral' as const,
    progress: 15,
    health: 'Critical' as const,
    healthColor: 'text-error-main' as const,
    team: ['SK', 'JH'],
    metrics: [
      { value: '32', label: 'Tasks' },
      { value: '6', label: 'Blocked' },
      { value: '0', label: 'Milestones' },
    ],
    updated: 'Updated 5h ago',
  },
  {
    title: 'Customer Portal v2',
    description: 'Build the next version of the customer self-service portal with enhanced analytics, ticket management, knowledge base, and live chat integration.',
    status: 'In Progress' as const,
    badgeVariant: 'info' as const,
    progress: 50,
    health: 'Good' as const,
    healthColor: 'text-success-main' as const,
    team: ['AH', 'SK'],
    metrics: [
      { value: '40', label: 'Tasks' },
      { value: '1', label: 'Blocked' },
      { value: '4', label: 'Milestones' },
    ],
    updated: 'Updated 4h ago',
  },
  {
    title: 'Security Audit Q2',
    description: 'Quarterly security audit covering penetration testing, vulnerability assessment, compliance review, and remediation tracking for all production systems.',
    status: 'Completed' as const,
    badgeVariant: 'success' as const,
    progress: 100,
    health: 'Good' as const,
    healthColor: 'text-success-main' as const,
    team: ['JH', 'OM', 'AH'],
    metrics: [
      { value: '12', label: 'Tasks' },
      { value: '0', label: 'Blocked' },
      { value: '5', label: 'Milestones' },
    ],
    updated: 'Updated 1d ago',
  },
];

const dropdownOptions: Record<string, string[]> = {
  Status: ['All', 'In Progress', 'Planning', 'Design Review', 'Completed'],
  Health: ['All', 'Good', 'At Risk', 'Critical'],
  Team: ['All', 'My Projects', 'Design', 'Engineering', 'QA'],
  Sort: ['Newest', 'Oldest', 'A-Z', 'Z-A', 'Progress'],
};

function SummaryCard({ label, value, supporting, icon, bg, bgImage }: typeof summaryCards[0]) {
  const borderClass = bg === 'purple' ? 'border-purple-1000' :
    bg === 'blue' ? 'border-blue-1000' :
    bg === 'success' ? 'border-success-bg' :
    'border-error-bg';
  return (
    <Card className={`flex-1 relative overflow-hidden ${borderClass}`}>
      <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      <div className="relative flex items-center gap-4">
        <div className={`inline-flex shrink-0 items-center justify-center rounded-full h-12 w-12 ${
          bg === 'purple' ? 'bg-purple-1000' :
          bg === 'blue' ? 'bg-blue-900' :
          bg === 'success' ? 'bg-success-bg' :
          'bg-error-bg'
        }`}>
          <img src={icon} alt="" className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text-secondary">{label}</span>
          <span className="text-2xl font-bold text-text-primary">{value}</span>
          <span className="text-xs text-text-disabled">{supporting}</span>
        </div>
      </div>
    </Card>
  );
}

function FilterDropdown({ label, openDropdown, onToggle }: {
  label: string;
  openDropdown: string | null;
  onToggle: (label: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isOpen = openDropdown === label;
  const [selected, setSelected] = useState('All');

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (isOpen) onToggle(label);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, label, onToggle]);

  const options = dropdownOptions[label];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => onToggle(label)}
        className={`flex h-11 w-40 items-center gap-2 rounded border px-3 text-sm transition-colors ${
          isOpen ? 'border-purple-800 bg-field-active-bg' : 'border-border bg-field-bg'
        }`}
      >
        <span className="flex-1 text-left text-field-text">{selected === 'All' ? label : selected}</span>
        <svg className={`h-4 w-4 text-field-text transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-20 rounded-lg border border-border bg-surface-1 py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { setSelected(opt); onToggle(label); }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                selected === opt ? 'text-purple-400 bg-purple-900/20' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleToggle = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Projects</h1>
        <p className="mt-1 text-sm text-text-tertiary">Track progress, health, and activity across all projects.</p>
      </div>
      <div className="flex gap-5">
        {summaryCards.map((card) => (
          <SummaryCard key={card.label} {...card} />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <TextField placeholder="Search projects..." iconLeft={
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        } className="flex-1" />
        {['Status', 'Health', 'Team', 'Sort'].map((label) => (
          <FilterDropdown key={label} label={label} openDropdown={openDropdown} onToggle={handleToggle} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
