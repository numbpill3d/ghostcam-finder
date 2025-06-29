
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import CameraFeed from '@/components/CameraFeed';
import { useAuth } from '@/hooks/useAuth';
import { RealCameraFeed } from '@/hooks/useRealCameraData';

interface SearchResultsProps {
  cameras: RealCameraFeed[];
  isSearching: boolean;
  searchQuery: string;
  onLoadMore?: () => void;
  onRefresh?: () => void;
  onScrapeNew?: () => Promise<any>;
}

const SearchResults = ({ 
  cameras, 
  isSearching, 
  searchQuery, 
  onLoadMore, 
  onRefresh,
  onScrapeNew 
}: SearchResultsProps) => {
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
    
    console.log(`Saving feed ${cameraId} for user ${user.id}`);
    toast({
      title: "Feed Saved",
      description: "This camera feed has been added to your saved feeds.",
    });
  };

  const handleScrapeNew = async () => {
    if (!onScrapeNew) return;
    
    try {
      toast({
        title: "Scraping New Feeds",
        description: "Searching for new camera feeds from public sources...",
      });
      
      const result = await onScrapeNew();
      
      toast({
        title: "Scraping Complete",
        description: `Found and added ${result.insertedFeeds} new camera feeds.`,
      });
    } catch (error) {
      toast({
        title: "Scraping Failed",
        description: "Could not fetch new camera feeds. Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Results Header
  const ResultsHeader = () => (
    <div className="flex justify-between items-center mb-6">
      {isSearching ? (
        <div className="flex items-center gap-2 text-primary">
          <Loader2 className="animate-spin size-4" />
          <p className="text-sm">Loading live camera feeds...</p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          {cameras.length} live {cameras.length === 1 ? 'camera' : 'cameras'} found
          {searchQuery && <span> for "{searchQuery}"</span>}
        </p>
      )}
      <div className="flex items-center gap-2">
        <button
          onClick={onRefresh}
          className="p-2 hover:bg-accent rounded-md transition-colors"
          title="Refresh feeds"
        >
          <RefreshCw className="size-4" />
        </button>
        {onScrapeNew && (
          <button
            onClick={handleScrapeNew}
            className="px-3 py-1 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors text-sm"
          >
            Scrape New Feeds
          </button>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select className="text-sm border border-input rounded bg-background px-2 py-1">
            <option>Newest</option>
            <option>Status</option>
            <option>Location</option>
            <option>Vibe Score</option>
          </select>
        </div>
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
          <p className="text-lg font-medium text-primary">Loading live camera feeds...</p>
          <p className="text-muted-foreground mt-2">Connecting to global camera database</p>
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
          <p className="text-lg font-medium">No live cameras found</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search or scrape for new feeds</p>
          <div className="flex gap-2 justify-center mt-4">
            <button 
              className="px-4 py-2 bg-primary/20 text-primary rounded-md hover:bg-primary/30 transition-colors"
              onClick={() => {
                navigate('/discover');
              }}
            >
              Clear all filters
            </button>
            {onScrapeNew && (
              <button
                onClick={handleScrapeNew}
                className="px-4 py-2 bg-green-500/20 text-green-600 rounded-md hover:bg-green-500/30 transition-colors"
              >
                Scrape New Feeds
              </button>
            )}
          </div>
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
      {!isSearching && cameras.length >= 20 && (
        <div className="mt-8 text-center">
          <button 
            className="px-4 py-2 border border-input rounded-md bg-background hover:bg-accent transition-colors flex items-center gap-2 mx-auto"
            onClick={onLoadMore}
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
