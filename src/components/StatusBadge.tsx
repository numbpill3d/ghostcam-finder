
import React from 'react';
import { cn } from '@/lib/utils';

type BadgeStatus = 'online' | 'offline' | 'secure' | 'vulnerable' | 'unknown';

interface StatusBadgeProps {
  status: BadgeStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusConfig = {
    online: {
      color: 'bg-green-500',
      label: 'Online'
    },
    offline: {
      color: 'bg-gray-400',
      label: 'Offline'
    },
    secure: {
      color: 'bg-blue-500',
      label: 'Secure'
    },
    vulnerable: {
      color: 'bg-amber-500',
      label: 'Vulnerable'
    },
    unknown: {
      color: 'bg-purple-500',
      label: 'Unknown'
    }
  };

  const config = statusConfig[status];

  return (
    <div className={cn("inline-flex items-center space-x-1.5", className)}>
      <span className={cn("size-2 rounded-full", config.color)} />
      <span className="text-xs font-medium">{config.label}</span>
    </div>
  );
};

export default StatusBadge;
