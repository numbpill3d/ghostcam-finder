
import React from 'react';
import { Maximize, MoreVertical, Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CameraFeedControlsProps {
  isHovered: boolean;
  status: 'online' | 'offline' | 'unknown';
  isAuthenticated: boolean;
  saved: boolean;
  handleSave: (e: React.MouseEvent) => void;
}

const CameraFeedControls = ({ 
  isHovered, 
  status, 
  isAuthenticated, 
  saved, 
  handleSave 
}: CameraFeedControlsProps) => {
  if (!isHovered || status !== 'online') return null;

  return (
    <div className="absolute top-2 right-2 flex items-center space-x-1 animate-fade-in">
      {isAuthenticated && (
        <button 
          className={cn(
            "size-8 flex items-center justify-center rounded-full text-white transition-colors",
            saved ? "bg-primary/80 hover:bg-primary/90" : "bg-black/60 hover:bg-black/80"
          )}
          onClick={handleSave}
          title={saved ? "Unsave feed" : "Save feed"}
        >
          {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
        </button>
      )}
      <button className="size-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors">
        <Maximize className="size-4" />
      </button>
      <button className="size-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors">
        <MoreVertical className="size-4" />
      </button>
    </div>
  );
};

export default CameraFeedControls;
