
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import SearchInput from '@/components/SearchInput';
import LocationFilter from '@/components/LocationFilter';
import CameraFeed from '@/components/CameraFeed';
import IoTCameraConnect from '@/components/IoTCameraConnect';
import { mockCameras, mockLocations, getSearchResults, getFilteredByLocation } from '@/utils/mockData';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface Location {
  id: string;
  name: string;
  count: number;
}

const Discover = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // Load user's preferred location if logged in
  useEffect(() => {
    if (user?.preferredLocation) {
      const userLocation = mockLocations.find(loc => loc.id === user.preferredLocation);
      if (userLocation) {
        setSelectedLocation(userLocation);
      }
    }
  }, [user]);
  
  // First apply location filter, then search filter
  const locationFiltered = getFilteredByLocation(selectedLocation?.id || null);
  const searchFiltered = getSearchResults(searchQuery);
  
  // Find the intersection of the two filtered arrays
  // IMPORTANT: Only show ONLINE cameras
  const cameras = locationFiltered
    .filter(camera => 
      searchFiltered.some(c => c.id === camera.id) && camera.status === 'online'
    );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLocationSelect = (location: Location | null) => {
    setSelectedLocation(location);
    // Save user's preferred location if logged in
    if (user && location) {
      saveUserPreference('preferredLocation', location.id);
    }
  };

  const handleCameraSelect = (cameraId: string) => {
    navigate(`/view?id=${cameraId}`);
    // Save to user's recent views if logged in
    if (user) {
      saveUserPreference('recentView', cameraId);
    }
  };

  const saveUserPreference = (key: string, value: string) => {
    // In a real app, this would be an API call to update user preferences
    console.log(`Saving ${key}: ${value} for user ${user?.id}`);
    // This would typically be implemented with the backend
  };

  const handleSaveFeed = (cameraId: string) => {
    if (!user) {
      navigate('/sign-in');
      return;
    }
    
    // In a real app, this would be an API call to save the feed
    console.log(`Saving feed ${cameraId} for user ${user.id}`);
    // This would typically update the UI to show it's saved
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
            selectedLocation={selectedLocation}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
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
                    onSave={() => handleSaveFeed(camera.id)}
                    isAuthenticated={!!user}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-lg font-medium">No active cameras found</p>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
          
          {/* IoT Camera Connect Sidebar */}
          <div className="lg:col-span-1">
            <IoTCameraConnect />
            
            <div className="mt-6 bg-card rounded-lg border border-primary/20 p-4">
              <h3 className="text-sm font-medium mb-3">How It Works</h3>
              <p className="text-xs text-muted-foreground mb-3">
                OMNIEVE allows you to discover and access publicly available camera feeds from around the world. 
                The system uses AI to identify vulnerable cameras and present them in a searchable interface.
              </p>
              <div className="text-xs text-red-400 p-2 bg-red-400/10 rounded border border-red-400/20">
                Warning: Only access cameras that you are authorized to view. Unauthorized access to private 
                cameras may violate laws in your jurisdiction.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Discover;
