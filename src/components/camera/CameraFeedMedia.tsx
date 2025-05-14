
import React, { useState, useEffect } from 'react';
import { EyeOff } from 'lucide-react';

interface CameraFeedMediaProps {
  status: 'online' | 'offline' | 'unknown';
  imageUrl?: string;
  name: string;
  isLoading: boolean;
}

const CameraFeedMedia = ({ status, imageUrl, name, isLoading }: CameraFeedMediaProps) => {
  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-secondary/20">
        <div className="size-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  if (status === 'offline') {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-card">
        <EyeOff className="size-10 text-muted-foreground/40 mb-2" />
        <p className="text-sm text-muted-foreground">Feed unavailable</p>
      </div>
    );
  }

  return (
    <>
      <img 
        src={imageUrl || "https://source.unsplash.com/random/400x240?cctv"} 
        alt={name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </>
  );
};

export default CameraFeedMedia;
