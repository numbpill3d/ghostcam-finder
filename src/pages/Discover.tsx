
import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/Layout';
import SearchInput from '@/components/SearchInput';
import LocationFilter from '@/components/LocationFilter';
import CameraFeed from '@/components/CameraFeed';
import IoTCameraConnect from '@/components/IoTCameraConnect';
import { mockCameras, mockLocations, getSearchResults, getFilteredByLocation, searchLiveFeedsFromExternalSources } from '@/utils/mockData';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from "@/components/ui/use-toast";
import { Loader2, AlertCircle } from 'lucide-react';

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
  const [isSearching, setIsSearching] = useState(false);
  const [cameras, setCameras] = useState<any[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  
  // Load user's preferred location if logged in
  useEffect(() => {
    if (user?.preferredLocation) {
      const userLocation = mockLocations.find(loc => loc.id === user.preferredLocation);
      if (userLocation) {
        setSelectedLocation(userLocation);
      }
    }
  }, [user]);
  
  // Search function that can be called from multiple places
  const performSearch = useCallback(async (query: string, locationId: string | null) => {
    setIsSearching(true);
    
    try {
      // Simulate searching both local and external sources
      let results: any[] = [];
      
      // First try local results
      const localResults = query 
        ? getSearchResults(query)
        : mockCameras;
      
      // Filter by location if needed
      const locationFiltered = locationId
        ? localResults.filter(camera => {
            const location = mockLocations.find(loc => loc.id === locationId);
            return location && camera.location.country === location.name;
          })
        : localResults;
      
      // Only include online cameras
      results = locationFiltered.filter(camera => camera.status === 'online');
      
      // If we have few results or a specific search term, search external sources
      if (results.length < 8 || query) {
        console.log("Searching external sources for:", query);
        const externalResponse = await searchLiveFeedsFromExternalSources(query);
        
        if (externalResponse.success) {
          // Filter by location if needed
          const externalLocationFiltered = locationId
            ? externalResponse.results.filter(camera => {
                const location = mockLocations.find(loc => loc.id === locationId);
                return location && camera.location.country === location.name;
              })
            : externalResponse.results;
          
          // Merge results without duplicates
          externalLocationFiltered.forEach(camera => {
            if (!results.some(c => c.id === camera.id)) {
              results.push(camera);
            }
          });
        }
      }
      
      // Set total results for display
      setTotalResults(results.length);
      setCameras(results);
      
      if (results.length === 0 && query) {
        toast({
          title: "No cameras found",
          description: "Try a different search term or location filter.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search Error",
        description: "Could not complete the search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
      setIsInitialLoad(false);
    }
  }, []);
  
  // Handle search input changes
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    performSearch(query, selectedLocation?.id || null);
  }, [selectedLocation, performSearch]);

  // Handle location selection
  const handleLocationSelect = useCallback((location: Location | null) => {
    setSelectedLocation(location);
    performSearch(searchQuery, location?.id || null);
    
    // Save user's preferred location if logged in
    if (user && location) {
      saveUserPreference('preferredLocation', location.id);
    }
  }, [searchQuery, user, performSearch]);

  // Initial data load
  useEffect(() => {
    performSearch('', selectedLocation?.id || null);
  }, [performSearch, selectedLocation]);

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
    toast({
      title: "Preference Saved",
      description: `Your ${key === 'preferredLocation' ? 'location' : 'recent view'} preference has been saved.`,
    });
  };

  const handleSaveFeed = (cameraId: string) => {
    if (!user) {
      navigate('/sign-in');
      return;
    }
    
    // In a real app, this would be an API call to save the feed
    console.log(`Saving feed ${cameraId} for user ${user.id}`);
    toast({
      title: "Feed Saved",
      description: "This camera feed has been added to your saved feeds.",
    });
  };

  return (
    <Layout className="pt-20 md:pt-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Cameras</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search through our extensive database of live CCTV and open IoT camera feeds from around the world.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <SearchInput 
            onSearch={handleSearch} 
            className="md:flex-[3]" 
            placeholder="Search by location, camera type, or ID..."
            loading={isSearching}
            initialQuery={searchQuery}
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
              {isSearching ? (
                <div className="flex items-center gap-2 text-primary">
                  <Loader2 className="animate-spin size-4" />
                  <p className="text-sm">Searching global camera networks...</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {cameras.length} {cameras.length === 1 ? 'camera' : 'cameras'} found
                  {searchQuery && <span> for "{searchQuery}"</span>}
                </p>
              )}
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
            {isSearching && cameras.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center">
                <Loader2 className="size-12 animate-spin text-primary mb-4" />
                <p className="text-lg font-medium text-primary">Searching global camera networks...</p>
                <p className="text-muted-foreground mt-2">Looking for matches in open camera databases</p>
              </div>
            ) : cameras.length > 0 ? (
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
                <AlertCircle className="size-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No active cameras found</p>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
                <button 
                  className="mt-4 px-4 py-2 bg-primary/20 text-primary rounded-md hover:bg-primary/30 transition-colors"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedLocation(null);
                    handleSearch('');
                  }}
                >
                  Clear all filters
                </button>
              </div>
            )}
            
            {/* Show loading more indicator if there could be more results */}
            {!isSearching && cameras.length >= 8 && (
              <div className="mt-8 text-center">
                <button 
                  className="px-4 py-2 border border-input rounded-md bg-background hover:bg-accent transition-colors flex items-center gap-2 mx-auto"
                  onClick={() => {
                    toast({
                      title: "Loading more results",
                      description: "Searching for additional camera feeds...",
                    });
                    
                    // In a real app, this would load the next page of results
                    setIsSearching(true);
                    setTimeout(() => {
                      setIsSearching(false);
                      toast({
                        title: "No additional results",
                        description: "We've found all available cameras matching your criteria.",
                      });
                    }, 2000);
                  }}
                >
                  <span>Load more cameras</span>
                  <Loader2 className="size-4 ml-2" />
                </button>
              </div>
            )}
          </div>
          
          {/* IoT Camera Connect Sidebar */}
          <div className="lg:col-span-1">
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Discover;
