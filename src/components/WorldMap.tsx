
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { MapPin, Maximize, TerminalSquare, Radio } from 'lucide-react';

interface MapPoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: 'active' | 'inactive';
}

interface WorldMapProps {
  points?: MapPoint[];
  className?: string;
  onPointClick?: (point: MapPoint) => void;
}

const WorldMap = ({ points = [], className, onPointClick }: WorldMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [radarPosition, setRadarPosition] = useState({ x: 50, y: 50 });
  
  // Count active cameras
  const activeCamerasCount = points.filter(p => p.type === 'active').length;

  useEffect(() => {
    if (!mapRef.current) return;

    const updateDimensions = () => {
      if (mapRef.current) {
        setDimensions({
          width: mapRef.current.offsetWidth,
          height: mapRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Terminal typing effect for coordinates
    const interval = setInterval(() => {
      const randomPoint = points[Math.floor(Math.random() * points.length)];
      if (randomPoint) {
        setSelectedPoint(randomPoint.id);
        setTimeout(() => setSelectedPoint(null), 3000);
      }
    }, 5000);

    // Radar ping animation - move to random locations
    const radarInterval = setInterval(() => {
      if (dimensions.width > 0 && dimensions.height > 0) {
        // Focus on a random active point
        const activePoints = points.filter(p => p.type === 'active');
        if (activePoints.length > 0) {
          const randomActivePoint = activePoints[Math.floor(Math.random() * activePoints.length)];
          const coords = getPointCoordinates(randomActivePoint.latitude, randomActivePoint.longitude);
          setRadarPosition({ x: coords.x, y: coords.y });
        } else {
          // Fallback if no active points
          setRadarPosition({
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height
          });
        }
      }
    }, 8000);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearInterval(interval);
      clearInterval(radarInterval);
    };
  }, [points, dimensions]);

  // Convert lat/long to x/y coordinates
  const getPointCoordinates = (latitude: number, longitude: number) => {
    const x = (longitude + 180) * (dimensions.width / 360);
    const y = (90 - latitude) * (dimensions.height / 180);
    return { x, y };
  };

  // Get random point data to display
  const getSelectedPointData = () => {
    if (!selectedPoint) return null;
    const point = points.find(p => p.id === selectedPoint);
    if (!point) return null;
    return {
      id: point.id,
      name: point.name,
      lat: point.latitude.toFixed(4),
      lng: point.longitude.toFixed(4),
      status: point.type === 'active' ? 'ONLINE' : 'OFFLINE'
    };
  };

  const selectedPointData = getSelectedPointData();

  return (
    <div 
      ref={mapRef}
      className={cn("relative overflow-hidden rounded-xl bg-card", className)}
    >
      {/* World Map Background */}
      <div className="absolute inset-0 bg-secondary/30 opacity-20">
        {/* Map Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-30">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`col-${i}`} className="border-r border-primary/30 h-full" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`row-${i}`} className="border-b border-primary/30 w-full" />
          ))}
        </div>
      </div>

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80"></div>

      {/* Radar Ping Animation */}
      <div
        className="absolute"
        style={{
          left: `${radarPosition.x}px`,
          top: `${radarPosition.y}px`,
          transform: 'translate(-50%, -50%)',
          zIndex: 5
        }}
      >
        <div className="relative">
          <div className="absolute -inset-2 flex items-center justify-center">
            <Radio className="size-6 text-primary animate-pulse" />
          </div>
          <div className="absolute -inset-6 rounded-full border border-primary/80 animate-ping-slow opacity-60"></div>
          <div className="absolute -inset-10 rounded-full border border-primary/60 animate-ping-slow opacity-40" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -inset-14 rounded-full border border-primary/40 animate-ping-slow opacity-20" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Map Points */}
      {dimensions.width > 0 && points.map((point) => {
        const { x, y } = getPointCoordinates(point.latitude, point.longitude);
        const isHovered = hoveredPoint === point.id;
        const isSelected = selectedPoint === point.id;
        
        return (
          <div 
            key={point.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${x}px`, top: `${y}px` }}
            onMouseEnter={() => setHoveredPoint(point.id)}
            onMouseLeave={() => setHoveredPoint(null)}
            onClick={() => onPointClick?.(point)}
          >
            <div 
              className={cn(
                "transition-all duration-300 cursor-pointer",
                (isHovered || isSelected) ? "scale-150" : "scale-100"
              )}
            >
              <div 
                className={cn(
                  "size-2 rounded-full",
                  point.type === 'active' ? "bg-primary" : "bg-muted-foreground/50"
                )}
              />
              <div 
                className={cn(
                  "absolute size-4 -inset-1 rounded-full",
                  point.type === 'active' ? "bg-primary/30 animate-pulse-slow" : "bg-muted-foreground/20"
                )}
              />
              {isSelected && (
                <div className="absolute size-8 -inset-3 rounded-full border border-primary/50 animate-ping-slow"></div>
              )}
            </div>
            
            {/* Tooltip */}
            {isHovered && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 border border-primary/30 shadow-lg rounded text-xs font-mono z-20 whitespace-nowrap">
                {point.name}
              </div>
            )}
          </div>
        );
      })}

      {/* Stats Panel */}
      <div className="absolute top-3 left-3 max-w-[250px] bg-black/80 backdrop-blur-sm border border-primary/30 rounded p-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-primary mb-2">
          <TerminalSquare className="size-4" />
          <span className="font-bold">SYSTEM.STATUS</span>
        </div>
        <div className="grid grid-cols-2 gap-1 text-muted-foreground">
          <span>TOTAL NODES:</span>
          <span className="text-primary">{points.length}</span>
          <span>ACTIVE FEEDS:</span>
          <span className="text-primary">{activeCamerasCount}</span>
          <span>SCAN STATUS:</span>
          <span className="text-green-400">LIVE</span>
        </div>
      </div>

      {/* Selected Point Data */}
      {selectedPointData && (
        <div className="absolute bottom-3 right-3 max-w-[250px] bg-black/80 backdrop-blur-sm border border-primary/30 rounded p-3 text-xs font-mono animate-fade-in">
          <div className="flex items-center gap-2 text-primary mb-2">
            <MapPin className="size-4" />
            <span className="font-bold terminal-text">NODE.{selectedPointData.id}</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-muted-foreground">
            <span>NAME:</span>
            <span className="text-primary terminal-text">{selectedPointData.name}</span>
            <span>LAT:</span>
            <span className="text-primary">{selectedPointData.lat}</span>
            <span>LONG:</span>
            <span className="text-primary">{selectedPointData.lng}</span>
            <span>STATUS:</span>
            <span className={selectedPointData.status === 'ONLINE' ? 'text-green-400' : 'text-red-400'}>
              {selectedPointData.status}
            </span>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <Link
        to="/discover"
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-black/90 hover:bg-primary/90 text-primary hover:text-white font-mono rounded flex items-center gap-2 border border-primary/30 shadow-glow transition-colors duration-300"
      >
        <Maximize className="size-4" />
        DISCOVER NOW
      </Link>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 size-40 bg-primary/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 size-32 bg-blue-400/5 rounded-full blur-[60px]" />
    </div>
  );
};

export default WorldMap;
