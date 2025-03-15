
import React, { useState } from 'react';
import { MapPin, ChevronDown, Check, X } from 'lucide-react';
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
}

const LocationFilter = ({ locations, onLocationSelect, className }: LocationFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleSelect = (location: Location | null) => {
    setSelectedLocation(location);
    onLocationSelect?.(location);
    setIsOpen(false);
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
          "flex items-center justify-between w-full px-4 py-2.5 text-sm rounded-lg border",
          "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring",
          selectedLocation ? "border-primary/50 bg-primary/5" : "border-input bg-background"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-muted-foreground" />
          {selectedLocation ? (
            <span>{selectedLocation.name}</span>
          ) : (
            <span className="text-muted-foreground">Filter by location</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {selectedLocation && (
            <button
              onClick={handleClear}
              className="size-5 flex items-center justify-center rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-3" />
            </button>
          )}
          <ChevronDown className={cn(
            "size-4 text-muted-foreground transition-transform duration-200",
            isOpen ? "transform rotate-180" : ""
          )} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-popover border border-border shadow-lg rounded-lg overflow-hidden animate-scale-in">
          <div className="max-h-60 overflow-y-auto py-1">
            {locations.map((location) => (
              <button
                key={location.id}
                type="button"
                className={cn(
                  "flex items-center justify-between w-full px-4 py-2 text-sm hover:bg-accent transition-colors",
                  selectedLocation?.id === location.id ? "bg-accent/50" : ""
                )}
                onClick={() => handleSelect(location)}
              >
                <span>{location.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{location.count}</span>
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
