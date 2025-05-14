
import React, { useState, useEffect } from 'react';
import CameraFeedContainer from './camera/CameraFeedContainer';
import CameraFeedMedia from './camera/CameraFeedMedia';
import CameraFeedInfo from './camera/CameraFeedInfo';
import CameraFeedControls from './camera/CameraFeedControls';

interface CameraFeedProps {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'unknown';
  securityStatus?: 'secure' | 'vulnerable' | 'unknown';
  location?: string;
  imageUrl?: string;
  onSelect?: () => void;
  onSave?: () => void;
  isSelected?: boolean;
  isAuthenticated?: boolean;
  isSaved?: boolean;
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
  onSave,
  isSelected,
  isAuthenticated = false,
  isSaved = false,
  className
}: CameraFeedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [saved, setSaved] = useState(isSaved);

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

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    onSave?.();
  };

  return (
    <CameraFeedContainer
      isSelected={isSelected}
      isLoading={isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
    >
      {/* Feed Thumbnail */}
      <div className="aspect-video bg-card relative overflow-hidden">
        <CameraFeedMedia 
          status={status} 
          imageUrl={imageUrl} 
          name={name} 
          isLoading={isLoading} 
        />
      </div>

      {/* Feed Info */}
      <CameraFeedInfo
        name={name}
        location={location}
        status={status}
        securityStatus={securityStatus}
        onSelect={handleSelect}
      />

      {/* Hover Controls */}
      <CameraFeedControls
        isHovered={isHovered}
        status={status}
        isAuthenticated={isAuthenticated}
        saved={saved}
        handleSave={handleSave}
      />
    </CameraFeedContainer>
  );
};

export default CameraFeed;
