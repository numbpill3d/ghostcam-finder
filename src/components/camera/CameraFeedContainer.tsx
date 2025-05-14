
import React from 'react';
import { cn } from '@/lib/utils';

interface CameraFeedContainerProps {
  children: React.ReactNode;
  isSelected?: boolean;
  isLoading: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  className?: string;
}

const CameraFeedContainer = ({ 
  children, 
  isSelected, 
  isLoading,
  onMouseEnter,
  onMouseLeave,
  className 
}: CameraFeedContainerProps) => {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg border transition-all duration-300",
        isSelected ? "ring-2 ring-primary" : "hover:border-primary/30",
        isLoading ? "animate-pulse" : "",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default CameraFeedContainer;
