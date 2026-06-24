import { useState } from 'react';
import { assetPath } from '../../utils/paths';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function LazyImage({ src, alt, className = '' }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <span className={`relative inline-flex ${className}`}>
      {!loaded && (
        <span className="absolute inset-0 animate-pulse rounded bg-border-white-6" />
      )}
      <img
        src={assetPath(src)}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </span>
  );
}
