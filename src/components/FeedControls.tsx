
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, 
  SkipBack, SkipForward, Calendar, Download, 
  ZoomIn, ArrowDown
} from 'lucide-react';

interface FeedControlsProps {
  isPlaying?: boolean;
  isMuted?: boolean;
  onPlayPause?: () => void;
  onMuteToggle?: () => void;
  onFullscreen?: () => void;
  onZoomIn?: () => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
  className?: string;
}

const FeedControls = ({
  isPlaying = false,
  isMuted = true,
  onPlayPause,
  onMuteToggle,
  onFullscreen,
  onZoomIn,
  onSkipBack,
  onSkipForward,
  className
}: FeedControlsProps) => {
  return (
    <div 
      className={cn(
        "flex items-center space-x-2 p-2 bg-gradient-to-t from-black/80 to-black/20 backdrop-blur-xs rounded-lg",
        className
      )}
    >
      <button 
        className="size-9 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
        onClick={onPlayPause}
      >
        {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
      </button>
      
      <button 
        className="size-9 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
        onClick={onSkipBack}
      >
        <SkipBack className="size-5" />
      </button>
      
      <button 
        className="size-9 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
        onClick={onSkipForward}
      >
        <SkipForward className="size-5" />
      </button>
      
      <div className="h-6 w-px bg-white/20" />
      
      <button 
        className="size-9 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
        onClick={onMuteToggle}
      >
        {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
      </button>
      
      <button 
        className="size-9 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
        onClick={onZoomIn}
      >
        <ZoomIn className="size-5" />
      </button>
      
      <div className="h-6 w-px bg-white/20" />
      
      <button 
        className="size-9 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
      >
        <Calendar className="size-5" />
      </button>
      
      <button 
        className="size-9 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
      >
        <Download className="size-5" />
      </button>
      
      <div className="flex-1" />
      
      <button 
        className="size-9 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
        onClick={onFullscreen}
      >
        <Maximize className="size-5" />
      </button>
    </div>
  );
};

export default FeedControls;
