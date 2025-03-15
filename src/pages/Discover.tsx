
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SearchInput from '@/components/SearchInput';
import LocationFilter from '@/components/LocationFilter';
import CameraFeed from '@/components/CameraFeed';
import { mockCameras, mockLocations, getSearchResults, getFilteredByLocation } from '@/utils/mockData';
import { useNavigate } from 'react-router-dom';

interface Location {
  id: string;
  name: string;
  count: number;
}

const Discover = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // First apply location filter, then search filter
  const locationFiltered = getFilteredByLocation(selectedLocation?.id || null);
  const searchFiltered = getSearchResults(searchQuery);
  
  // Find the intersection of the two filtered arrays
  const cameras = locationFiltered.filter(camera => 
    searchFiltered.some(c => c.id === camera.id)
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLocationSelect = (location: Location | null) => {
    setSelectedLocation(location);
  };

  const handleCameraSelect = (cameraId: string) => {
    navigate(`/view?id=${cameraId}`);
  };

  return (
    <Layout className="pt-20 md:pt-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Cameras</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search and filter through our extensive database of live CCTV feeds from around the world.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchInput 
            onSearch={handleSearch} 
            className="md:flex-[3]" 
          />
          <LocationFilter 
            locations={mockLocations} 
            onLocationSelect={handleLocationSelect}
            className="md:flex-[1]" 
          />
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-muted-foreground">
            {cameras.length} {cameras.length === 1 ? 'camera' : 'cameras'} found
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select className="text-sm border border-input rounded bg-background px-2 py-1">
              <option>Newest</option>
              <option>Status</option>
              <option>Location</option>
            </select>
          </div>
        </div>

        {/* Camera Grid */}
        {cameras.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cameras.map((camera) => (
              <CameraFeed
                key={camera.id}
                id={camera.id}
                name={camera.name}
                status={camera.status}
                securityStatus={camera.securityStatus}
                location={`${camera.location.city}, ${camera.location.country}`}
                imageUrl={camera.imageUrl}
                onSelect={() => handleCameraSelect(camera.id)}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg font-medium">No cameras found</p>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Discover;
