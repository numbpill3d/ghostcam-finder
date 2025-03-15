
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import FeedControls from '@/components/FeedControls';
import StatusBadge from '@/components/StatusBadge';
import { mockCameras } from '@/utils/mockData';
import { Shield, MapPin, Calendar, Info, ChevronDown, ChevronUp } from 'lucide-react';

const View = () => {
  const [searchParams] = useSearchParams();
  const cameraId = searchParams.get('id') || 'cam001';
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showDetails, setShowDetails] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Find camera by ID
  const camera = mockCameras.find(c => c.id === cameraId) || mockCameras[0];

  useEffect(() => {
    // Simulate loading delay
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [cameraId]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Layout className="pt-20 md:pt-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{camera.name}</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="size-4 mr-1" />
            <span>{camera.location.city}, {camera.location.country}</span>
            <span className="mx-2">•</span>
            <StatusBadge status={camera.status} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <div className="relative bg-black rounded-lg overflow-hidden">
              {isLoading ? (
                <div className="aspect-video flex items-center justify-center">
                  <div className="size-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                </div>
              ) : (
                <>
                  <div className="aspect-video">
                    {camera.status === 'online' ? (
                      <img 
                        src={camera.imageUrl || "https://source.unsplash.com/random/1280x720?cctv"} 
                        alt={camera.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-card">
                        <p className="text-lg font-medium mb-2">Camera Offline</p>
                        <p className="text-sm text-muted-foreground">This feed is currently unavailable</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Controls Overlay */}
                  {camera.status === 'online' && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[95%]">
                      <FeedControls 
                        isPlaying={isPlaying}
                        isMuted={isMuted}
                        onPlayPause={handlePlayPause}
                        onMuteToggle={handleMuteToggle}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Camera Details */}
            <div className="mt-6 bg-card rounded-lg border">
              <div 
                className="flex items-center justify-between px-4 py-3 cursor-pointer"
                onClick={toggleDetails}
              >
                <div className="flex items-center">
                  <Info className="size-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">Camera Details</span>
                </div>
                {showDetails ? (
                  <ChevronUp className="size-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-5 text-muted-foreground" />
                )}
              </div>
              
              {showDetails && (
                <div className="px-4 pb-4 animate-slide-down">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Camera ID</p>
                        <p className="text-sm font-medium">{camera.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Type</p>
                        <p className="text-sm font-medium">{camera.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Status</p>
                        <StatusBadge status={camera.status} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Security</p>
                        <div className="flex items-center">
                          <Shield className="size-4 mr-1 text-muted-foreground" />
                          <StatusBadge status={camera.securityStatus} />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Last Seen</p>
                        <div className="flex items-center text-sm">
                          <Calendar className="size-4 mr-1 text-muted-foreground" />
                          <span>{new Date(camera.lastSeen).toLocaleString()}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Coordinates</p>
                        <p className="text-sm font-medium">
                          {camera.location.latitude.toFixed(4)}, {camera.location.longitude.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Related Cameras */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border mb-4">
              <div className="px-4 py-3 border-b">
                <h3 className="font-medium">Related Cameras</h3>
              </div>
              <div className="p-4 space-y-4">
                {mockCameras
                  .filter(c => c.id !== camera.id && c.location.country === camera.location.country)
                  .slice(0, 3)
                  .map(relatedCamera => (
                    <div key={relatedCamera.id} className="flex gap-3">
                      <div className="w-20 h-14 rounded overflow-hidden bg-accent">
                        {relatedCamera.imageUrl ? (
                          <img 
                            src={relatedCamera.imageUrl} 
                            alt={relatedCamera.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Shield className="size-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">{relatedCamera.name}</h4>
                        <p className="text-xs text-muted-foreground mb-1 line-clamp-1">
                          {relatedCamera.location.city}, {relatedCamera.location.country}
                        </p>
                        <StatusBadge status={relatedCamera.status} className="mt-1" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="bg-card rounded-lg border">
              <div className="px-4 py-3 border-b">
                <h3 className="font-medium">Camera Location</h3>
              </div>
              <div className="p-4">
                <div className="h-56 bg-accent rounded relative overflow-hidden">
                  {/* Map would go here in a real implementation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="size-10 text-primary" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-white text-xs">
                    {camera.location.city}, {camera.location.country}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default View;
