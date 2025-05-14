
import { useState, useCallback, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { 
  mockCameras, 
  mockLocations, 
  getSearchResults, 
  searchLiveFeedsFromExternalSources 
} from '@/utils/mockData';

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
  const [isSearching, setIsSearching] = useState(false);
  const [cameras, setCameras] = useState<any[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

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
  }, [searchQuery, performSearch]);

  // Initial data load
  useEffect(() => {
    performSearch('', selectedLocation?.id || null);
  }, [performSearch, selectedLocation]);

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
  };
};
