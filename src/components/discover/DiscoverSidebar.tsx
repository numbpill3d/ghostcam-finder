
import React from 'react';
import IoTCameraConnect from '@/components/IoTCameraConnect';

const DiscoverSidebar = () => {
  return (
    <>
      <IoTCameraConnect />
      
      <div className="mt-6 bg-card rounded-lg border border-primary/20 p-4">
        <h3 className="text-sm font-medium mb-3">How It Works</h3>
        <p className="text-xs text-muted-foreground mb-3">
          OMNIEVE searches multiple sources to find publicly available camera feeds from around the world. 
          Our system continuously indexes vulnerable cameras and presents them in a searchable interface.
        </p>
        <div className="text-xs text-red-400 p-2 bg-red-400/10 rounded border border-red-400/20">
          Warning: Only access cameras that you are authorized to view. Unauthorized access to private 
          cameras may violate laws in your jurisdiction.
        </div>
      </div>
    </>
  );
};

export default DiscoverSidebar;
