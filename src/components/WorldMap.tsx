
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

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

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Convert lat/long to x/y coordinates
  const getPointCoordinates = (latitude: number, longitude: number) => {
    const x = (longitude + 180) * (dimensions.width / 360);
    const y = (90 - latitude) * (dimensions.height / 180);
    return { x, y };
  };

  return (
    <div 
      ref={mapRef}
      className={cn("relative overflow-hidden rounded-xl bg-card", className)}
    >
      {/* World Map Background */}
      <div className="absolute inset-0 bg-secondary/30 opacity-20">
        {/* Map SVG would go here in a real implementation */}
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTAgMGgxMDI0djEwMjRIMHoiLz48L3N2Zz4=')] opacity-10" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80"></div>

      {/* Map Points */}
      {dimensions.width > 0 && points.map((point) => {
        const { x, y } = getPointCoordinates(point.latitude, point.longitude);
        const isHovered = hoveredPoint === point.id;
        
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
                isHovered ? "scale-150" : "scale-100"
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
                  "absolute size-4 -inset-1 rounded-full animate-pulse-slow",
                  point.type === 'active' ? "bg-primary/30" : "bg-muted-foreground/20"
                )}
              />
            </div>
            
            {/* Tooltip */}
            {isHovered && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-popover shadow-lg rounded text-xs font-medium z-20 whitespace-nowrap">
                {point.name}
              </div>
            )}
          </div>
        );
      })}

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 size-40 bg-primary/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 size-32 bg-blue-400/5 rounded-full blur-[60px]" />
    </div>
  );
};

export default WorldMap;
