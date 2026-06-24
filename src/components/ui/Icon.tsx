interface IconProps {
  src: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bg?: 'purple' | 'blue' | 'cyan' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

const iconSizes: Record<string, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

const bgSizes: Record<string, string> = {
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
  lg: 'h-14 w-14',
  xl: 'h-16 w-16',
};

const bgColors: Record<string, string> = {
  purple: 'bg-purple-900',
  blue: 'bg-blue-900',
  cyan: 'bg-cyan-900',
  success: 'bg-success-bg',
  warning: 'bg-warning-bg',
  error: 'bg-error-bg',
  info: 'bg-info-bg',
  neutral: 'bg-neutral-bg',
};

export function Icon({ src, alt = '', size = 'md', bg }: IconProps) {
  if (bg) {
    return (
      <div
        className={`inline-flex shrink-0 items-center justify-center rounded-full ${bgSizes[size]} ${bgColors[bg]}`}
      >
        <img src={src} alt={alt} className={iconSizes[size]} />
      </div>
    );
  }

  return <img src={src} alt={alt} className={iconSizes[size]} />;
}
