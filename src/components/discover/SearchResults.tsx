
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { Loader2, AlertCircle } from 'lucide-react';
import CameraFeed from '@/components/CameraFeed';
import { useAuth } from '@/hooks/useAuth';

interface SearchResultsProps {
  cameras: any[];
  isSearching: boolean;
  searchQuery: string;
  onLoadMore?: () => void;
}

const SearchResults = ({ cameras, isSearching, searchQuery, onLoadMore }: SearchResultsProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

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

  // Results Count
  const ResultsHeader = () => (
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
  );

  // Camera Grid
  if (isSearching && cameras.length === 0) {
    return (
      <>
        <ResultsHeader />
        <div className="py-16 flex flex-col items-center justify-center">
          <Loader2 className="size-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium text-primary">Searching global camera networks...</p>
          <p className="text-muted-foreground mt-2">Looking for matches in open camera databases</p>
        </div>
      </>
    );
  }
  
  if (cameras.length === 0) {
    return (
      <>
        <ResultsHeader />
        <div className="py-16 text-center">
          <AlertCircle className="size-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium">No active cameras found</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
          <button 
            className="mt-4 px-4 py-2 bg-primary/20 text-primary rounded-md hover:bg-primary/30 transition-colors"
            onClick={() => {
              navigate('/discover');
            }}
          >
            Clear all filters
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <ResultsHeader />
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
              
              onLoadMore?.();
            }}
          >
            <span>Load more cameras</span>
            <Loader2 className="size-4 ml-2" />
          </button>
        </div>
      )}
    </>
  );
};

export default SearchResults;
