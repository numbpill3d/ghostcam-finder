
import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Check, X, Globe, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Location {
  id: string;
  name: string;
  count: number;
}

interface LocationFilterProps {
  locations: Location[];
  onLocationSelect?: (location: Location | null) => void;
  className?: string;
  selectedLocation?: Location | null;
}

const LocationFilter = ({ locations, onLocationSelect, className, selectedLocation: propSelectedLocation }: LocationFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(propSelectedLocation || null);
  const [searchTerm, setSearchTerm] = useState('');

  // Update internal state when prop changes
  useEffect(() => {
    setSelectedLocation(propSelectedLocation || null);
  }, [propSelectedLocation]);
  
  // Filter locations based on search
  const filteredLocations = searchTerm 
    ? locations.filter(loc => loc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : locations;

  const handleSelect = (location: Location | null) => {
    setSelectedLocation(location);
    onLocationSelect?.(location);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleSelect(null);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        className={cn(
          "flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring",
          selectedLocation 
            ? "border-primary/50 bg-primary/10 cyber-border" 
            : "border-input bg-background/90 hover:border-primary/30"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-primary" />
          {selectedLocation ? (
            <span className="font-mono">{selectedLocation.name}</span>
          ) : (
            <span className="text-muted-foreground font-mono">LOCATE.NODE</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {selectedLocation && (
            <button
              onClick={handleClear}
              className="size-5 flex items-center justify-center rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
            >
              <X className="size-3" />
            </button>
          )}
          <ChevronDown className={cn(
            "size-4 text-primary transition-transform duration-200",
            isOpen ? "transform rotate-180" : ""
          )} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-black/90 backdrop-blur-md border border-primary/50 shadow-lg shadow-primary/20 rounded-lg overflow-hidden animate-scale-in">
          <div className="px-3 py-2 border-b border-primary/30">
            <input
              type="text"
              placeholder="Search locations..."
              className="w-full bg-transparent border border-primary/30 rounded px-2 py-1 text-sm focus:outline-none focus:border-primary/50 font-mono"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="flex justify-between items-center px-3 py-1.5 border-b border-primary/20">
            <div className="flex items-center gap-1 text-xs text-primary/70">
              <Filter className="size-3" />
              <span>{filteredLocations.length} locations</span>
            </div>
            <button 
              className="text-xs text-primary/80 hover:text-primary font-mono"
              onClick={() => handleSelect(null)}
            >
              CLEAR.FILTER
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto py-1 scrollbar-hide">
            <button
              type="button"
              className="flex items-center justify-between w-full px-4 py-2 text-sm font-mono hover:bg-primary/20 transition-colors border-b border-primary/10"
              onClick={() => handleSelect(null)}
            >
              <div className="flex items-center gap-2">
                <Globe className="size-3.5 text-primary/70" />
                <span>Global</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary/70 font-bold">{locations.reduce((sum, loc) => sum + loc.count, 0)}</span>
                {!selectedLocation && (
                  <Check className="size-4 text-primary" />
                )}
              </div>
            </button>
            {filteredLocations.map((location) => (
              <button
                key={location.id}
                type="button"
                className={cn(
                  "flex items-center justify-between w-full px-4 py-2 text-sm font-mono hover:bg-primary/20 transition-colors",
                  selectedLocation?.id === location.id ? "bg-primary/30" : ""
                )}
                onClick={() => handleSelect(location)}
              >
                <span>{location.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary font-bold">{location.count}</span>
                  {selectedLocation?.id === location.id && (
                    <Check className="size-4 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationFilter;
