import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { PrimaryButton, SecondaryButton, IconToggleButton } from '../../components/ui/ButtonPremium';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { Dropdown } from '../../components/ui/Dropdown';
import { SimpleModal, LeftIconModal } from '../../components/ui/Modal';

type ButtonColor = 'purple' | 'blue' | 'cyan' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'dark';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
interface StateOverrides {
  hover: string;
  active: string;
  focus: string;
}

const filledOverrides: Record<ButtonColor, StateOverrides> = {
  purple: { hover: '!bg-purple-600', active: '!bg-purple-700', focus: '!ring-2 !ring-purple-400/50' },
  blue: { hover: '!bg-blue-600', active: '!bg-blue-700', focus: '!ring-2 !ring-blue-400/50' },
  cyan: { hover: '!bg-cyan-600', active: '!bg-cyan-700', focus: '!ring-2 !ring-cyan-400/50' },
  success: { hover: '!brightness-110', active: '!brightness-90', focus: '!ring-2 !ring-purple-400/50' },
  warning: { hover: '!brightness-110', active: '!brightness-90', focus: '!ring-2 !ring-purple-400/50' },
  error: { hover: '!brightness-110', active: '!brightness-90', focus: '!ring-2 !ring-purple-400/50' },
  info: { hover: '!brightness-110', active: '!brightness-90', focus: '!ring-2 !ring-purple-400/50' },
  neutral: { hover: '!brightness-110', active: '!brightness-90', focus: '!ring-2 !ring-purple-400/50' },
  dark: { hover: '!bg-[#000000]/60', active: '!bg-[#000000]/80', focus: '!ring-2 !ring-purple-400/50' },
};

const outlineOverrides: Record<ButtonColor, StateOverrides> = {
  purple: { hover: '!bg-purple-500/10', active: '!bg-purple-500/20', focus: '!ring-2 !ring-purple-400/50' },
  blue: { hover: '!bg-blue-500/10', active: '!bg-blue-500/20', focus: '!ring-2 !ring-blue-400/50' },
  cyan: { hover: '!bg-cyan-500/10', active: '!bg-cyan-500/20', focus: '!ring-2 !ring-cyan-400/50' },
  success: { hover: '!bg-success-main/10', active: '!bg-success-main/20', focus: '!ring-2 !ring-purple-400/50' },
  warning: { hover: '!bg-warning-main/10', active: '!bg-warning-main/20', focus: '!ring-2 !ring-purple-400/50' },
  error: { hover: '!bg-error-main/10', active: '!bg-error-main/20', focus: '!ring-2 !ring-purple-400/50' },
  info: { hover: '!bg-info-main/10', active: '!bg-info-main/20', focus: '!ring-2 !ring-purple-400/50' },
  neutral: { hover: '!bg-neutral-main/10', active: '!bg-neutral-main/20', focus: '!ring-2 !ring-purple-400/50' },
  dark: { hover: '!bg-white/10', active: '!bg-white/20', focus: '!ring-2 !ring-purple-400/50' },
};

const ghostOverrides: Record<ButtonColor, StateOverrides> = {
  purple: { hover: '!bg-purple-500/10', active: '!bg-purple-500/20', focus: '!ring-2 !ring-purple-400/50' },
  blue: { hover: '!bg-blue-500/10', active: '!bg-blue-500/20', focus: '!ring-2 !ring-blue-400/50' },
  cyan: { hover: '!bg-cyan-500/10', active: '!bg-cyan-500/20', focus: '!ring-2 !ring-cyan-400/50' },
  success: { hover: '!bg-success-main/10', active: '!bg-success-main/20', focus: '!ring-2 !ring-purple-400/50' },
  warning: { hover: '!bg-warning-main/10', active: '!bg-warning-main/20', focus: '!ring-2 !ring-purple-400/50' },
  error: { hover: '!bg-error-main/10', active: '!bg-error-main/20', focus: '!ring-2 !ring-purple-400/50' },
  info: { hover: '!bg-info-main/10', active: '!bg-info-main/20', focus: '!ring-2 !ring-purple-400/50' },
  neutral: { hover: '!bg-neutral-main/10', active: '!bg-neutral-main/20', focus: '!ring-2 !ring-purple-400/50' },
  dark: { hover: '!bg-white/10', active: '!bg-white/20', focus: '!ring-2 !ring-purple-400/50' },
};

const colors: ButtonColor[] = ['purple', 'blue', 'cyan', 'success', 'warning', 'error', 'info', 'neutral', 'dark'];
const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const stateLabels = [
  { key: 'default', label: 'Default', css: '' },
  { key: 'hover', label: 'Hover', css: ':hover' },
  { key: 'active', label: 'Active', css: ':active' },
  { key: 'focus', label: 'Focus Visible', css: ':focus-visible', star: true },
  { key: 'disabled', label: 'Disabled', css: '[disabled]' },
];

function StateRow({ variant, color, overrides }: { variant: 'filled' | 'outline' | 'ghost'; color: ButtonColor; overrides: StateOverrides }) {
  const btns = {
    default: <Button variant={variant} color={color} size="sm">Label</Button>,
    hover: <Button variant={variant} color={color} size="sm" className={overrides.hover}>Label</Button>,
    active: <Button variant={variant} color={color} size="sm" className={overrides.active}>Label</Button>,
    focus: <Button variant={variant} color={color} size="sm" className={overrides.focus}>Label</Button>,
    disabled: <Button variant={variant} color={color} size="sm" disabled>Label</Button>,
  };
  return (
    <div className="flex items-center gap-4">
      {stateLabels.map((s) => (
        <div key={s.key} className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1 text-[11px] text-text-tertiary whitespace-nowrap">
            {s.label}
            <span className="text-text-disabled">{s.css}</span>
            {s.star && <span className="text-yellow-500" title="Most important accessibility state">⭐</span>}
          </div>
          {btns[s.key as keyof typeof btns]}
        </div>
      ))}
    </div>
  );
}

function SizeDemo({ variant, color }: { variant: 'filled' | 'outline' | 'ghost'; color: ButtonColor }) {
  return (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <Button key={size} variant={variant} color={color} size={size}>{size}</Button>
      ))}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface-1">
      <div className="border-b border-border bg-surface-4 px-5 py-3">
        <h2 className="text-base font-semibold text-text-primary">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Component Library</h1>
        <p className="mt-1 text-sm text-text-tertiary">Design system reference — Button variants, states, and sizes</p>
      </div>

      <Section title="Interaction States (Important for Accessibility)">
        <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm">
          <span className="text-text-primary font-medium">Default</span>
          <span className="text-text-tertiary">Normal appearance. No interaction.</span>
          <span className="text-text-primary font-medium">Hover <span className="text-text-disabled">:hover</span></span>
          <span className="text-text-tertiary">Mouse pointer over element. Provides visual feedback.</span>
          <span className="text-text-primary font-medium">Active <span className="text-text-disabled">:active</span></span>
          <span className="text-text-tertiary">While clicking / pressing. Usually darker or scaled down.</span>
          <span className="text-text-primary font-medium">Focus Visible ⭐ <span className="text-text-disabled">:focus-visible</span></span>
          <span className="text-text-tertiary">Most important accessibility state. Appears when navigating with keyboard (Tab key).</span>
          <span className="text-text-primary font-medium">Disabled <span className="text-text-disabled">[disabled]</span></span>
          <span className="text-text-tertiary">Element is not interactive. Reduced opacity, no pointer events.</span>
        </div>
      </Section>

      <Section title="Filled Variants">
        <div className="overflow-x-auto">
          <div className="flex flex-col gap-6">
            {colors.slice(0, 3).map((color) => (
              <div key={color} className="flex items-center gap-4">
                <span className="w-20 text-sm text-text-primary capitalize">{color}</span>
                <StateRow variant="filled" color={color} overrides={filledOverrides[color]} />
              </div>
            ))}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-purple-500 hover:text-purple-400">Show all colors</summary>
            <div className="mt-4 flex flex-col gap-6">
              {colors.slice(3).map((color) => (
                <div key={color} className="flex items-center gap-4">
                  <span className="w-20 text-sm text-text-primary capitalize">{color}</span>
                  <StateRow variant="filled" color={color} overrides={filledOverrides[color]} />
                </div>
              ))}
            </div>
          </details>
        </div>
      </Section>

      <Section title="Outline Variants">
        <div className="overflow-x-auto">
          <div className="flex flex-col gap-6">
            {colors.slice(0, 3).map((color) => (
              <div key={color} className="flex items-center gap-4">
                <span className="w-20 text-sm text-text-primary capitalize">{color}</span>
                <StateRow variant="outline" color={color} overrides={outlineOverrides[color]} />
              </div>
            ))}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-purple-500 hover:text-purple-400">Show all colors</summary>
            <div className="mt-4 flex flex-col gap-6">
              {colors.slice(3).map((color) => (
                <div key={color} className="flex items-center gap-4">
                  <span className="w-20 text-sm text-text-primary capitalize">{color}</span>
                  <StateRow variant="outline" color={color} overrides={outlineOverrides[color]} />
                </div>
              ))}
            </div>
          </details>
        </div>
      </Section>

      <Section title="Ghost Variants">
        <div className="overflow-x-auto">
          <div className="flex flex-col gap-6">
            {colors.slice(0, 3).map((color) => (
              <div key={color} className="flex items-center gap-4">
                <span className="w-20 text-sm text-text-primary capitalize">{color}</span>
                <StateRow variant="ghost" color={color} overrides={ghostOverrides[color]} />
              </div>
            ))}
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-purple-500 hover:text-purple-400">Show all colors</summary>
            <div className="mt-4 flex flex-col gap-6">
              {colors.slice(3).map((color) => (
                <div key={color} className="flex items-center gap-4">
                  <span className="w-20 text-sm text-text-primary capitalize">{color}</span>
                  <StateRow variant="ghost" color={color} overrides={ghostOverrides[color]} />
                </div>
              ))}
            </div>
          </details>
        </div>
      </Section>

      <Section title="Gradient Variants">
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <span className="w-24 shrink-0 pt-7 text-sm text-text-primary">Purple→Blue</span>
            <div className="flex items-start gap-4">
              {stateLabels.map((s) => (
                <div key={s.key} className="flex flex-col items-center gap-1.5">
                  <div className="flex items-center gap-1 text-[11px] text-text-tertiary whitespace-nowrap">
                    {s.label} {s.css && <span className="text-text-disabled">{s.css}</span>}
                    {s.star && <span className="text-yellow-500">⭐</span>}
                  </div>
                  {s.key === 'default' && <Button variant="gradient" gradient="purple-blue" size="sm">Label</Button>}
                  {s.key === 'hover' && <Button variant="gradient" gradient="purple-blue" size="sm" className="!opacity-90">Label</Button>}
                  {s.key === 'active' && <Button variant="gradient" gradient="purple-blue" size="sm" className="!opacity-80">Label</Button>}
                  {s.key === 'focus' && <Button variant="gradient" gradient="purple-blue" size="sm" className="!ring-2 !ring-purple-400/50">Label</Button>}
                  {s.key === 'disabled' && <Button variant="gradient" gradient="purple-blue" size="sm" disabled>Label</Button>}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="w-24 shrink-0 pt-7 text-sm text-text-primary">Blue→Cyan</span>
            <div className="flex items-start gap-4">
              {stateLabels.map((s) => (
                <div key={s.key} className="flex flex-col items-center gap-1.5">
                  <div className="flex items-center gap-1 text-[11px] text-text-tertiary whitespace-nowrap">
                    {s.label} {s.css && <span className="text-text-disabled">{s.css}</span>}
                    {s.star && <span className="text-yellow-500">⭐</span>}
                  </div>
                  {s.key === 'default' && <Button variant="gradient" gradient="blue-cyan" size="sm">Label</Button>}
                  {s.key === 'hover' && <Button variant="gradient" gradient="blue-cyan" size="sm" className="!opacity-90">Label</Button>}
                  {s.key === 'active' && <Button variant="gradient" gradient="blue-cyan" size="sm" className="!opacity-80">Label</Button>}
                  {s.key === 'focus' && <Button variant="gradient" gradient="blue-cyan" size="sm" className="!ring-2 !ring-blue-400/50">Label</Button>}
                  {s.key === 'disabled' && <Button variant="gradient" gradient="blue-cyan" size="sm" disabled>Label</Button>}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="w-24 shrink-0 pt-7 text-sm text-text-primary">Purple→Cyan</span>
            <div className="flex items-start gap-4">
              {stateLabels.map((s) => (
                <div key={s.key} className="flex flex-col items-center gap-1.5">
                  <div className="flex items-center gap-1 text-[11px] text-text-tertiary whitespace-nowrap">
                    {s.label} {s.css && <span className="text-text-disabled">{s.css}</span>}
                    {s.star && <span className="text-yellow-500">⭐</span>}
                  </div>
                  {s.key === 'default' && <Button variant="gradient" gradient="purple-cyan" size="sm">Label</Button>}
                  {s.key === 'hover' && <Button variant="gradient" gradient="purple-cyan" size="sm" className="!opacity-90">Label</Button>}
                  {s.key === 'active' && <Button variant="gradient" gradient="purple-cyan" size="sm" className="!opacity-80">Label</Button>}
                  {s.key === 'focus' && <Button variant="gradient" gradient="purple-cyan" size="sm" className="!ring-2 !ring-purple-400/50">Label</Button>}
                  {s.key === 'disabled' && <Button variant="gradient" gradient="purple-cyan" size="sm" disabled>Label</Button>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Size Variants">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm text-text-primary">Filled</span>
            <SizeDemo variant="filled" color="purple" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm text-text-primary">Outline</span>
            <SizeDemo variant="outline" color="purple" />
          </div>
          <div className="flex items-center gap-4">
            <span className="w-20 text-sm text-text-primary">Ghost</span>
            <SizeDemo variant="ghost" color="purple" />
          </div>
        </div>
      </Section>

      <Section title="Full Width">
        <div className="flex flex-col gap-4">
          <Button fullWidth variant="filled" color="purple">Filled Full Width</Button>
          <Button fullWidth variant="outline" color="blue">Outline Full Width</Button>
          <Button fullWidth variant="gradient" gradient="purple-cyan">Gradient Full Width</Button>
        </div>
      </Section>

      <Section title="Badge Variants">
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </Section>

      <Section title="Primary Button (Premium)">
        <p className="mb-4 text-sm text-text-tertiary">Purple gradient button with soft glow, inner highlight, and tactile feedback. Hover, active, and focus states are built-in via CSS pseudo-classes — try interacting directly.</p>
        <div className="flex flex-wrap items-center gap-4">
          <PrimaryButton>Label</PrimaryButton>
          <PrimaryButton iconLeft={
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          }>With Icon</PrimaryButton>
          <PrimaryButton iconRight={
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          }>Dropdown</PrimaryButton>
          <PrimaryButton size="sm">Small</PrimaryButton>
          <PrimaryButton disabled>Disabled</PrimaryButton>
        </div>
      </Section>

      <Section title="Secondary Button (Premium)">
        <p className="mb-4 text-sm text-text-tertiary">Glass-morphism button with dark translucent surface, purple border tint, and backdrop blur. Same height and radius as Primary.</p>
        <div className="flex flex-wrap items-center gap-4">
          <SecondaryButton>Label</SecondaryButton>
          <SecondaryButton iconLeft={
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          }>Edit</SecondaryButton>
          <SecondaryButton size="sm">Small</SecondaryButton>
          <SecondaryButton disabled>Disabled</SecondaryButton>
        </div>
      </Section>

      <Section title="Icon Toggle Button (Premium)">
        <p className="mb-4 text-sm text-text-tertiary">Minimal toolbar icon button with clear active state. Use <code className="text-purple-400 text-xs">active</code> prop to toggle.</p>
        <div className="flex flex-wrap items-center gap-4">
          <IconToggleButton
            active={false}
            label="Grid view"
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            }
          />
          <IconToggleButton
            active
            label="List view"
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          />
          <span className="text-xs text-text-tertiary">← Inactive / Active</span>
          <IconToggleButton
            active={false}
            disabled
            label="Disabled"
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          />
          <span className="text-xs text-text-tertiary">Disabled</span>
        </div>
      </Section>

      <Section title="Breadcrumb">
        <p className="mb-4 text-sm text-text-tertiary">Breadcrumb navigation with chevron separators and link support.</p>
        <div className="flex flex-col gap-4">
          <div className="bg-surface-2 rounded border border-border px-4 py-3">
            <Breadcrumb items={[
              { label: 'Home', href: '/dashboard' },
              { label: 'Projects', href: '/projects' },
              { label: 'Current Page' },
            ]} />
          </div>
          <div className="bg-surface-2 rounded border border-border px-4 py-3">
            <Breadcrumb items={[
              { label: 'Home', href: '/dashboard' },
              { label: 'Settings' },
            ]} />
          </div>
          <div className="bg-surface-2 rounded border border-border px-4 py-3">
            <Breadcrumb items={[
              { label: 'Home', href: '/dashboard' },
              { label: 'Tasks', href: '/tasks' },
              { label: 'Dependencies', href: '/tasks/dependencies' },
              { label: 'Details' },
            ]} />
          </div>
        </div>
      </Section>

      <Section title="Dropdown">
        <p className="mb-4 text-sm text-text-tertiary">Reusable dropdown menu with click-outside-close and selected state.</p>
        <DropdownDemo />
      </Section>

      <Section title="Simple Modal (Centered Icon)">
        <p className="mb-4 text-sm text-text-tertiary">Centered icon layout for confirmations and alerts. Available in 5 color variants.</p>
        <SimpleModalDemo />
      </Section>

      <Section title="Left Icon Modal (Icon Left + Close Button)">
        <p className="mb-4 text-sm text-text-tertiary">Left-aligned icon with X close button at the top right. Available in 5 color variants.</p>
        <LeftIconModalDemo />
      </Section>
    </div>
  );
}

const modalVariants = ['success', 'warning', 'error', 'info', 'neutral'] as const;

function SimpleModalDemo() {
  const [open, setOpen] = useState<typeof modalVariants[number] | null>(null);
  return (
    <div className="flex flex-wrap items-center gap-4">
      {modalVariants.map((v) => (
        <Button key={v} variant="outline" color={v === 'neutral' ? 'neutral' : v} size="sm" onClick={() => setOpen(v)}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
      <SimpleModal
        isOpen={open !== null}
        onClose={() => setOpen(null)}
        variant={open || 'neutral'}
        icon={
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        title="Are you sure?"
        description="This action cannot be undone. The changes will be permanent."
        primaryLabel="Confirm"
        secondaryLabel="Cancel"
      />
    </div>
  );
}

function LeftIconModalDemo() {
  const [open, setOpen] = useState<typeof modalVariants[number] | null>(null);
  return (
    <div className="flex flex-wrap items-center gap-4">
      {modalVariants.map((v) => (
        <Button key={v} variant="outline" color={v === 'neutral' ? 'neutral' : v} size="sm" onClick={() => setOpen(v)}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
      <LeftIconModal
        isOpen={open !== null}
        onClose={() => setOpen(null)}
        variant={open || 'neutral'}
        icon={
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        title="Information"
        description="This is an informational message with more context about what happened."
        primaryLabel="Got it"
        secondaryLabel="Learn more"
      />
    </div>
  );
}

function DropdownDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown
      open={open}
      onToggle={() => setOpen((p) => !p)}
      onClose={() => setOpen(false)}
      trigger={
        <button className={`flex h-11 w-44 items-center gap-2 rounded border px-3 text-sm transition-colors ${
          open ? 'border-purple-800 bg-field-active-bg' : 'border-border bg-field-bg'
        }`}>
          <span className="flex-1 text-left text-field-text">Select option</span>
          <svg className={`h-4 w-4 text-field-text transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      }
      items={[
        { label: 'Edit', onClick: () => {} },
        { label: 'Duplicate', onClick: () => {} },
        { label: 'Archive', onClick: () => {} },
        { label: 'Delete', onClick: () => {} },
      ]}
    />
  );
}
