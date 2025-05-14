
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { mockLocations } from '@/utils/mockData';
import { useAuth } from '@/hooks/useAuth';
import { toast } from "@/components/ui/use-toast";
import { useDiscoverSearch } from '@/hooks/useDiscoverSearch';
import SearchResults from '@/components/discover/SearchResults';
import DiscoverHeader from '@/components/discover/DiscoverHeader';
import DiscoverSidebar from '@/components/discover/DiscoverSidebar';

const Discover = () => {
  const { user } = useAuth();
  
  const { 
    searchQuery,
    selectedLocation,
    isSearching,
    cameras,
    isInitialLoad,
    handleSearch,
    handleLocationSelect,
    performSearch
  } = useDiscoverSearch();
  
  // Load user's preferred location if logged in
  useEffect(() => {
    if (user?.preferredLocation) {
      const userLocation = mockLocations.find(loc => loc.id === user.preferredLocation);
      if (userLocation) {
        handleLocationSelect(userLocation);
      }
    }
  }, [user, handleLocationSelect]);

  const handleLoadMore = () => {
    // In a real app, this would load the next page of results
    toast({
      title: "Loading more results",
      description: "Searching for additional camera feeds...",
    });
    
    setTimeout(() => {
      toast({
        title: "No additional results",
        description: "We've found all available cameras matching your criteria.",
      });
    }, 2000);
  };

  const saveUserPreference = (key: string, value: string) => {
    // In a real app, this would be an API call to update user preferences
    console.log(`Saving ${key}: ${value} for user ${user?.id}`);
    toast({
      title: "Preference Saved",
      description: `Your ${key === 'preferredLocation' ? 'location' : 'recent view'} preference has been saved.`,
    });
  };

  // Handle location selection with preference saving
  const handleLocationSelectWithSave = (location: any) => {
    handleLocationSelect(location);
    
    // Save user's preferred location if logged in
    if (user && location) {
      saveUserPreference('preferredLocation', location.id);
    }
  };

  return (
    <Layout className="pt-20 md:pt-24">
      <div className="container mx-auto max-w-6xl">
        <DiscoverHeader
          onSearch={handleSearch}
          onLocationSelect={handleLocationSelectWithSave}
          selectedLocation={selectedLocation}
          isSearching={isSearching}
          searchQuery={searchQuery}
          locations={mockLocations}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <SearchResults 
              cameras={cameras} 
              isSearching={isSearching} 
              searchQuery={searchQuery}
              onLoadMore={handleLoadMore}
            />
          </div>
          
          {/* IoT Camera Connect Sidebar */}
          <div className="lg:col-span-1">
            <DiscoverSidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Discover;
