
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface RealCameraFeed {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'unknown';
  securityStatus: 'secure' | 'vulnerable' | 'unknown';
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  imageUrl?: string;
  lastSeen: string;
  type: string;
  streamUrl: string;
  tags: string[];
  vibeScore: number;
}

interface UseRealCameraDataProps {
  category?: string;
  country?: string;
  search?: string;
  limit?: number;
}

export const useRealCameraData = ({
  category,
  country,
  search,
  limit = 50
}: UseRealCameraDataProps = {}) => {
  const [cameras, setCameras] = useState<RealCameraFeed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCameras = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (country) params.append('country', country);
      if (search) params.append('search', search);
      params.append('limit', limit.toString());

      // Use POST method to send parameters in body
      const { data, error } = await supabase.functions.invoke('get-cameras', {
        method: 'POST',
        body: {
          category,
          country,
          search,
          limit
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.success) {
        setCameras(data.cameras);
      } else {
        throw new Error(data.error || 'Failed to fetch cameras');
      }
    } catch (err) {
      console.error('Error fetching cameras:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch cameras');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCameras();
  }, [category, country, search, limit]);

  const refetch = () => {
    fetchCameras();
  };

  const scrapeCameras = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('scrape-cameras');
      
      if (error) {
        throw new Error(error.message);
      }

      if (data.success) {
        // Refresh the camera list after scraping
        await fetchCameras();
        return data;
      } else {
        throw new Error(data.error || 'Failed to scrape cameras');
      }
    } catch (err) {
      console.error('Error scraping cameras:', err);
      throw err;
    }
  };

  return {
    cameras,
    isLoading,
    error,
    refetch,
    scrapeCameras
  };
};
