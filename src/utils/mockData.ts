
export interface CameraData {
  id: string;
  name: string;
  location: {
    country: string;
    city: string;
    latitude: number;
    longitude: number;
  };
  status: 'online' | 'offline' | 'unknown';
  securityStatus: 'secure' | 'vulnerable' | 'unknown';
  type: string;
  lastSeen: string;
  imageUrl?: string;
}

export const mockCameras: CameraData[] = [
  {
    id: 'cam001',
    name: 'Downtown Traffic Cam',
    location: {
      country: 'United States',
      city: 'New York',
      latitude: 40.712776,
      longitude: -74.005974
    },
    status: 'online',
    securityStatus: 'vulnerable',
    type: 'Traffic',
    lastSeen: '2023-06-15T14:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1554866585-41f789e2c479?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam002',
    name: 'Shibuya Crossing',
    location: {
      country: 'Japan',
      city: 'Tokyo',
      latitude: 35.6585,
      longitude: 139.7454
    },
    status: 'online',
    securityStatus: 'secure',
    type: 'Street',
    lastSeen: '2023-06-16T09:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam003',
    name: 'Central Station',
    location: {
      country: 'Germany',
      city: 'Berlin',
      latitude: 52.52,
      longitude: 13.405
    },
    status: 'offline',
    securityStatus: 'unknown',
    type: 'Railway',
    lastSeen: '2023-06-10T18:20:00Z'
  },
  {
    id: 'cam004',
    name: 'Harbor View',
    location: {
      country: 'Australia',
      city: 'Sydney',
      latitude: -33.8688,
      longitude: 151.2093
    },
    status: 'online',
    securityStatus: 'secure',
    type: 'Waterfront',
    lastSeen: '2023-06-16T02:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1524820197278-540916411e20?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam005',
    name: 'Market Street',
    location: {
      country: 'United Kingdom',
      city: 'London',
      latitude: 51.5074,
      longitude: -0.1278
    },
    status: 'online',
    securityStatus: 'vulnerable',
    type: 'Commercial',
    lastSeen: '2023-06-16T10:05:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam006',
    name: 'Eiffel Tower View',
    location: {
      country: 'France',
      city: 'Paris',
      latitude: 48.8566,
      longitude: 2.3522
    },
    status: 'online',
    securityStatus: 'secure',
    type: 'Tourist',
    lastSeen: '2023-06-16T11:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam007',
    name: 'Canal View',
    location: {
      country: 'Italy',
      city: 'Venice',
      latitude: 45.4408,
      longitude: 12.3155
    },
    status: 'offline',
    securityStatus: 'unknown',
    type: 'Waterfront',
    lastSeen: '2023-06-14T20:45:00Z'
  },
  {
    id: 'cam008',
    name: 'Beach Promenade',
    location: {
      country: 'Spain',
      city: 'Barcelona',
      latitude: 41.3851,
      longitude: 2.1734
    },
    status: 'online',
    securityStatus: 'vulnerable',
    type: 'Beach',
    lastSeen: '2023-06-16T13:10:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1542569414-3e872150c046?q=80&w=400&h=240&auto=format&fit=crop'
  }
];

export const mockLocations = [
  { id: 'loc1', name: 'United States', count: 15 },
  { id: 'loc2', name: 'Japan', count: 8 },
  { id: 'loc3', name: 'Germany', count: 6 },
  { id: 'loc4', name: 'Australia', count: 9 },
  { id: 'loc5', name: 'United Kingdom', count: 12 },
  { id: 'loc6', name: 'France', count: 7 },
  { id: 'loc7', name: 'Italy', count: 5 },
  { id: 'loc8', name: 'Spain', count: 4 }
];

export const mockMapPoints = mockCameras.map(camera => ({
  id: camera.id,
  name: camera.name,
  latitude: camera.location.latitude,
  longitude: camera.location.longitude,
  type: camera.status === 'online' ? 'active' as const : 'inactive' as const
}));

export const getSearchResults = (query: string) => {
  if (!query) return mockCameras;
  
  const lowerQuery = query.toLowerCase();
  return mockCameras.filter(camera => 
    camera.name.toLowerCase().includes(lowerQuery) ||
    camera.location.country.toLowerCase().includes(lowerQuery) ||
    camera.location.city.toLowerCase().includes(lowerQuery) ||
    camera.id.toLowerCase().includes(lowerQuery)
  );
};

export const getFilteredByLocation = (locationId: string | null) => {
  if (!locationId) return mockCameras;
  
  const location = mockLocations.find(loc => loc.id === locationId);
  if (!location) return mockCameras;
  
  return mockCameras.filter(camera => 
    camera.location.country === location.name
  );
};
