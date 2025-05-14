
import React from 'react';
import StatusBadge from '@/components/StatusBadge';

interface CameraFeedInfoProps {
  name: string;
  location?: string;
  status: 'online' | 'offline' | 'unknown';
  securityStatus: 'secure' | 'vulnerable' | 'unknown';
  onSelect: () => void;
}

const CameraFeedInfo = ({ name, location, status, securityStatus, onSelect }: CameraFeedInfoProps) => {
  return (
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
          onClick={onSelect}
        >
          View Feed
        </button>
      </div>
    </div>
  );
};

export default CameraFeedInfo;
