
import React from 'react';
import SearchInput from '@/components/SearchInput';
import LocationFilter from '@/components/LocationFilter';
import { Location } from '@/hooks/useDiscoverSearch';

interface DiscoverHeaderProps {
  onSearch: (query: string) => void;
  onLocationSelect: (location: Location | null) => void;
  selectedLocation: Location | null;
  isSearching: boolean;
  searchQuery: string;
  locations: Location[];
}

const DiscoverHeader = ({ 
  onSearch,
  onLocationSelect,
  selectedLocation,
  isSearching,
  searchQuery,
  locations
}: DiscoverHeaderProps) => {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Cameras</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Search through our extensive database of live CCTV and open IoT camera feeds from around the world.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchInput 
          onSearch={onSearch} 
          className="md:flex-[3]" 
          placeholder="Search by location, camera type, or ID..."
          loading={isSearching}
          initialQuery={searchQuery}
        />
        <LocationFilter 
          locations={locations} 
          onLocationSelect={onLocationSelect}
          className="md:flex-[1]" 
          selectedLocation={selectedLocation}
        />
      </div>
    </>
  );
};

export default DiscoverHeader;
