
import { useState, useCallback, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useRealCameraData } from './useRealCameraData';

export interface Location {
  id: string;
  name: string;
  count: number;
}

interface UseDiscoverSearchProps {
  initialLocation?: Location | null;
}

export const useDiscoverSearch = ({ initialLocation }: UseDiscoverSearchProps = {}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(initialLocation || null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Use real camera data hook
  const {
    cameras,
    isLoading: isSearching,
    error,
    refetch,
    scrapeCameras
  } = useRealCameraData({
    search: searchQuery || undefined,
    country: selectedLocation?.name || undefined,
    limit: 100
  });

  const totalResults = cameras.length;

  // Handle search input changes
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Handle location selection
  const handleLocationSelect = useCallback((location: Location | null) => {
    setSelectedLocation(location);
  }, []);

  // Manual search trigger
  const performSearch = useCallback(async (query: string, locationId: string | null) => {
    setSearchQuery(query);
    if (locationId) {
      // Find location by ID (assuming locations are countries for now)
      const locationMap: { [key: string]: string } = {
        'us': 'United States',
        'uk': 'United Kingdom',
        'de': 'Germany',
        'fr': 'France',
        'it': 'Italy',
        'es': 'Spain',
        'ca': 'Canada',
        'au': 'Australia',
        'jp': 'Japan',
        'cn': 'China'
      };
      
      const locationName = locationMap[locationId];
      if (locationName) {
        setSelectedLocation({ id: locationId, name: locationName, count: 0 });
      }
    } else {
      setSelectedLocation(null);
    }

    // Trigger refresh
    refetch();
  }, [refetch]);

  // Initial data load
  useEffect(() => {
    if (cameras.length === 0 && !isSearching && !error) {
      // Try to scrape cameras if none exist
      scrapeCameras().catch(console.error);
    }
    setIsInitialLoad(false);
  }, [cameras.length, isSearching, error, scrapeCameras]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast({
        title: "Error Loading Cameras",
        description: error,
        variant: "destructive",
      });
    }
  }, [error]);

  // Show success message when cameras are found
  useEffect(() => {
    if (!isSearching && cameras.length > 0 && searchQuery) {
      toast({
        title: "Cameras Found",
        description: `Found ${cameras.length} live camera feeds matching your search.`,
      });
    }
  }, [isSearching, cameras.length, searchQuery]);

  return {
    searchQuery,
    selectedLocation,
    isSearching,
    cameras,
    isInitialLoad,
    totalResults,
    handleSearch,
    handleLocationSelect,
    performSearch,
    refetch,
    scrapeCameras
  };
};
