import { useState, type ReactNode } from 'react';
import { ImageOff } from 'lucide-react';

interface FallbackImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackIcon?: ReactNode;
}

export function FallbackImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackIcon,
}: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#101B30] text-slate-400 border border-slate-800/80 select-none ${className}`}
      >
        <div className="mb-2 text-[#00D9FF]/70">
          {fallbackIcon ?? <ImageOff className="w-7 h-7" />}
        </div>
        <span className="text-xs font-medium text-slate-400 text-center px-3">
          {fallbackTitle ?? alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
