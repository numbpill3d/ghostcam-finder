
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import StatusBadge from './StatusBadge';
import { Eye, EyeOff, Maximize, MoreVertical } from 'lucide-react';

interface CameraFeedProps {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'unknown';
  securityStatus?: 'secure' | 'vulnerable' | 'unknown';
  location?: string;
  imageUrl?: string;
  onSelect?: () => void;
  isSelected?: boolean;
  className?: string;
}

const CameraFeed = ({
  id,
  name,
  status,
  securityStatus = 'unknown',
  location,
  imageUrl,
  onSelect,
  isSelected,
  className
}: CameraFeedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = () => {
    onSelect?.();
  };

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg border transition-all duration-300",
        isSelected ? "ring-2 ring-primary" : "hover:border-primary/30",
        isLoading ? "animate-pulse" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Feed Thumbnail */}
      <div className="aspect-video bg-card relative overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/20">
            <div className="size-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          </div>
        ) : status === 'offline' ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-card">
            <EyeOff className="size-10 text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">Feed unavailable</p>
          </div>
        ) : (
          <>
            <img 
              src={imageUrl || "https://source.unsplash.com/random/400x240?cctv"} 
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}
      </div>

      {/* Feed Info */}
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-medium line-clamp-1">{name}</h3>
            {location && (
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{location}</p>
            )}
          </div>
          <StatusBadge status={status} />
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <StatusBadge status={securityStatus} />
          <button 
            className="text-xs px-2.5 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors"
            onClick={handleSelect}
          >
            View Feed
          </button>
        </div>
      </div>

      {/* Hover Controls */}
      {isHovered && status === 'online' && (
        <div className="absolute top-2 right-2 flex items-center space-x-1 animate-fade-in">
          <button className="size-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors">
            <Maximize className="size-4" />
          </button>
          <button className="size-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors">
            <MoreVertical className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraFeed;
