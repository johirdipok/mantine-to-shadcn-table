// components/loading-overlay.tsx
import { cn } from '@/lib/utils'; // shadcn utility for class merging
import * as React from 'react';

interface LoaderProps {
  children?: React.ReactNode;
  className?: string;
}

interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> { }

interface TransitionProps {
  transition?: 'fade';
  duration?: number;
}

interface LoadingOverlayProps {
  visible?: boolean;
  zIndex?: string | number;
  loaderProps?: LoaderProps;
  overlayProps?: OverlayProps;
  transitionProps?: TransitionProps;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible = false,
  zIndex = 400,
  loaderProps = {},
  overlayProps = {},
  transitionProps = { transition: 'fade', duration: 0 },
}) => {
  if (!visible) return null;

  const fadeStyles =
    transitionProps.transition === 'fade'
      ? {
        transition: `opacity ${transitionProps.duration ?? 0}ms ease-in-out`,
        opacity: visible ? 1 : 0,
      }
      : {};

  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center bg-black/40',
        overlayProps.className
      )}
      style={{
        zIndex,
        ...fadeStyles,
        ...overlayProps.style,
      }}
      {...overlayProps}
    >
      {loaderProps.children ?? (
        <div
          className={cn(
            'h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent',
            loaderProps.className
          )}
        />
      )}
    </div>
  );
};
