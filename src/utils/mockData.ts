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

// Expanded camera database with more live feeds from around the world
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
    imageUrl: 'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?q=80&w=400&h=240&auto=format&fit=crop'
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
  },
  {
    id: 'cam009',
    name: 'Rural Crossing',
    location: {
      country: 'United States',
      city: 'Missoula',
      latitude: 46.8787,
      longitude: -113.9966
    },
    status: 'online',
    securityStatus: 'vulnerable',
    type: 'Traffic',
    lastSeen: '2023-06-16T11:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1529528744093-6f8abeee511d?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam010',
    name: 'Small Town Square',
    location: {
      country: 'Italy',
      city: 'Siena',
      latitude: 43.3186,
      longitude: 11.3307
    },
    status: 'online',
    securityStatus: 'unknown',
    type: 'Public',
    lastSeen: '2023-06-16T10:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam011',
    name: 'Market Street View',
    location: {
      country: 'Morocco',
      city: 'Marrakech',
      latitude: 31.6295,
      longitude: -7.9811
    },
    status: 'online',
    securityStatus: 'vulnerable',
    type: 'Street',
    lastSeen: '2023-06-16T09:35:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1563889958749-625da26ed355?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam012',
    name: 'Mountain Pass',
    location: {
      country: 'Switzerland',
      city: 'Zermatt',
      latitude: 46.0207,
      longitude: 7.7491
    },
    status: 'online',
    securityStatus: 'secure',
    type: 'Scenic',
    lastSeen: '2023-06-16T12:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam013',
    name: 'Coastal Highway',
    location: {
      country: 'Ireland',
      city: 'Galway',
      latitude: 53.2707,
      longitude: -9.0568
    },
    status: 'online',
    securityStatus: 'unknown',
    type: 'Traffic',
    lastSeen: '2023-06-16T08:50:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam014',
    name: 'Desert Outpost',
    location: {
      country: 'United Arab Emirates',
      city: 'Dubai',
      latitude: 25.2048,
      longitude: 55.2708
    },
    status: 'online',
    securityStatus: 'secure',
    type: 'Security',
    lastSeen: '2023-06-16T14:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam015',
    name: 'IoT Home Security',
    location: {
      country: 'Canada',
      city: 'Toronto',
      latitude: 43.6532,
      longitude: -79.3832
    },
    status: 'online',
    securityStatus: 'vulnerable',
    type: 'IoT',
    lastSeen: '2023-06-16T15:10:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1580982327559-c1202864eb63?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam016',
    name: 'Factory Perimeter',
    location: {
      country: 'South Korea',
      city: 'Seoul',
      latitude: 37.5665,
      longitude: 126.9780
    },
    status: 'online',
    securityStatus: 'vulnerable',
    type: 'IoT',
    lastSeen: '2023-06-16T13:25:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1626885927365-fc13c9567284?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam017',
    name: 'Beach Boardwalk',
    location: {
      country: 'Brazil',
      city: 'Rio de Janeiro',
      latitude: -22.9068,
      longitude: -43.1729
    },
    status: 'online',
    securityStatus: 'secure',
    type: 'Beach',
    lastSeen: '2023-06-16T15:35:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam018',
    name: 'Rural Highway',
    location: {
      country: 'New Zealand',
      city: 'Queenstown',
      latitude: -45.0312,
      longitude: 168.6626
    },
    status: 'online',
    securityStatus: 'unknown',
    type: 'Traffic',
    lastSeen: '2023-06-16T16:40:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam019',
    name: 'Suburban Street',
    location: {
      country: 'South Africa',
      city: 'Cape Town',
      latitude: -33.9249,
      longitude: 18.4241
    },
    status: 'online',
    securityStatus: 'vulnerable',
    type: 'Street',
    lastSeen: '2023-06-16T12:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1622142765057-6e8e0b322e3d?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam020',
    name: 'City Square',
    location: {
      country: 'Poland',
      city: 'Warsaw',
      latitude: 52.2297,
      longitude: 21.0122
    },
    status: 'online',
    securityStatus: 'secure',
    type: 'Public',
    lastSeen: '2023-06-16T14:05:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1607427293702-036707e1ee48?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam021',
    name: 'Metro Station',
    location: {
      country: 'Russia',
      city: 'Moscow',
      latitude: 55.7558,
      longitude: 37.6173
    },
    status: 'online',
    securityStatus: 'vulnerable',
    type: 'Transport',
    lastSeen: '2023-06-16T10:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1556784344-07b03c75633f?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam022',
    name: 'University Campus',
    location: {
      country: 'Netherlands',
      city: 'Amsterdam',
      latitude: 52.3676,
      longitude: 4.9041
    },
    status: 'online',
    securityStatus: 'secure',
    type: 'Educational',
    lastSeen: '2023-06-16T09:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam023',
    name: 'Industrial Zone',
    location: {
      country: 'China',
      city: 'Shanghai',
      latitude: 31.2304,
      longitude: 121.4737
    },
    status: 'online',
    securityStatus: 'unknown',
    type: 'Industrial',
    lastSeen: '2023-06-16T08:50:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1565715101049-b9c0f9fd5629?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam024',
    name: 'Shopping District',
    location: {
      country: 'Mexico',
      city: 'Mexico City',
      latitude: 19.4326,
      longitude: -99.1332
    },
    status: 'online',
    securityStatus: 'vulnerable',
    type: 'Commercial',
    lastSeen: '2023-06-16T17:25:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1580037008772-fca9a1d0ddce?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam025',
    name: 'Historic Landmark',
    location: {
      country: 'Turkey',
      city: 'Istanbul',
      latitude: 41.0082,
      longitude: 28.9784
    },
    status: 'online',
    securityStatus: 'secure',
    type: 'Historic',
    lastSeen: '2023-06-16T13:10:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1539668642088-a8760ff96792?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam026',
    name: 'Rural Farmland',
    location: {
      country: 'United States',
      city: 'Bozeman',
      latitude: 45.6770,
      longitude: -111.0429
    },
    status: 'online',
    securityStatus: 'vulnerable',
    type: 'Rural',
    lastSeen: '2023-06-16T15:55:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam027',
    name: 'Market Square',
    location: {
      country: 'Sweden',
      city: 'Stockholm',
      latitude: 59.3293,
      longitude: 18.0686
    },
    status: 'online',
    securityStatus: 'unknown',
    type: 'Public',
    lastSeen: '2023-06-16T11:40:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1600623471616-8c1966c31e7c?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam028',
    name: 'Marina View',
    location: {
      country: 'Greece',
      city: 'Athens',
      latitude: 37.9838,
      longitude: 23.7275
    },
    status: 'online',
    securityStatus: 'secure',
    type: 'Waterfront',
    lastSeen: '2023-06-16T14:25:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1536665325334-3e82e2ed8246?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam029',
    name: 'Temple Grounds',
    location: {
      country: 'Thailand',
      city: 'Bangkok',
      latitude: 13.7563,
      longitude: 100.5018
    },
    status: 'online',
    securityStatus: 'secure',
    type: 'Cultural',
    lastSeen: '2023-06-16T09:50:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam030',
    name: 'Wildlife Reserve',
    location: {
      country: 'Kenya',
      city: 'Nairobi',
      latitude: -1.2921,
      longitude: 36.8219
    },
    status: 'online',
    securityStatus: 'unknown',
    type: 'Wildlife',
    lastSeen: '2023-06-16T12:35:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam031',
    name: 'Mountain Lodge',
    location: {
      country: 'Austria',
      city: 'Innsbruck',
      latitude: 47.2692,
      longitude: 11.4041
    },
    status: 'online',
    securityStatus: 'vulnerable',
    type: 'Scenic',
    lastSeen: '2023-06-16T16:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1520766439748-c68439ea7067?q=80&w=400&h=240&auto=format&fit=crop'
  },
  {
    id: 'cam032',
    name: 'Desert Highway',
    location: {
      country: 'Chile',
      city: 'Atacama',
      latitude: -23.8634,
      longitude: -69.1328
    },
    status: 'online',
    securityStatus: 'secure',
    type: 'Highway',
    lastSeen: '2023-06-16T13:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1596886456505-275d49755d9e?q=80&w=400&h=240&auto=format&fit=crop'
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
  { id: 'loc8', name: 'Spain', count: 4 },
  { id: 'loc9', name: 'Brazil', count: 6 },
  { id: 'loc10', name: 'China', count: 10 },
  { id: 'loc11', name: 'Russia', count: 7 },
  { id: 'loc12', name: 'India', count: 9 },
  { id: 'loc13', name: 'South Africa', count: 5 },
  { id: 'loc14', name: 'Mexico', count: 4 },
  { id: 'loc15', name: 'Canada', count: 8 },
  { id: 'loc16', name: 'New Zealand', count: 3 }
];

export const mockMapPoints = mockCameras.map(camera => ({
  id: camera.id,
  name: camera.name,
  latitude: camera.location.latitude,
  longitude: camera.location.longitude,
  type: camera.status === 'online' ? 'active' as const : 'inactive' as const
}));

// Enhanced search function that simulates a more realistic search experience
export const getSearchResults = (query: string) => {
  if (!query) return mockCameras;
  
  const lowerQuery = query.toLowerCase();
  
  // First do an exact match search
  const exactMatches = mockCameras.filter(camera => 
    camera.name.toLowerCase() === lowerQuery ||
    camera.location.country.toLowerCase() === lowerQuery ||
    camera.location.city.toLowerCase() === lowerQuery ||
    camera.id.toLowerCase() === lowerQuery ||
    camera.type.toLowerCase() === lowerQuery
  );
  
  if (exactMatches.length > 0) {
    return exactMatches;
  }
  
  // Then do a contains search
  return mockCameras.filter(camera => 
    camera.name.toLowerCase().includes(lowerQuery) ||
    camera.location.country.toLowerCase().includes(lowerQuery) ||
    camera.location.city.toLowerCase().includes(lowerQuery) ||
    camera.id.toLowerCase().includes(lowerQuery) ||
    camera.type.toLowerCase().includes(lowerQuery)
  );
};

// Improved location filtering with more precise matching
export const getFilteredByLocation = (locationId: string | null) => {
  if (!locationId) return mockCameras;
  
  const location = mockLocations.find(loc => loc.id === locationId);
  if (!location) return mockCameras;
  
  return mockCameras.filter(camera => 
    camera.location.country === location.name
  );
};

export const commonIoTCredentials = [
  { username: 'admin', password: 'admin' },
  { username: 'root', password: 'pass' },
  { username: 'admin', password: '12345' },
  { username: 'admin', password: '888888' },
  { username: 'admin', password: '4321' },
  { username: 'admin', password: '1111111' },
  { username: 'service', password: 'service' },
  { username: 'admin', password: '1234' }
];

export const attemptIoTCameraConnection = (cameraId: string, ipAddress: string) => {
  console.log(`Attempting to connect to camera ${cameraId} at ${ipAddress}`);
  
  const randomSuccess = Math.random() > 0.7;
  
  if (randomSuccess) {
    const credentialIndex = Math.floor(Math.random() * commonIoTCredentials.length);
    return {
      success: true,
      credential: commonIoTCredentials[credentialIndex],
      message: `Connected successfully using ${commonIoTCredentials[credentialIndex].username}:${commonIoTCredentials[credentialIndex].password}`
    };
  } else {
    return {
      success: false,
      message: 'Failed to connect with any of the provided credentials'
    };
  }
};

// Enhanced function to simulate searching external camera databases
export const searchLiveFeedsFromExternalSources = async (query: string = '') => {
  console.log(`Searching external sources for live feeds with query: ${query}`);
  
  // In a real implementation, this would use actual API calls to search engines or camera directories
  // For now, we'll simulate that by returning our enhanced mockCameras filtered by the query
  // and adding a delay to simulate network latency
  
  // Simulate different search results based on query to make it feel more dynamic
  let results = [];
  
  if (query) {
    const lowerQuery = query.toLowerCase();
    
    // First check for exact matches
    const exactMatches = mockCameras.filter(camera => 
      camera.name.toLowerCase() === lowerQuery ||
      camera.location.country.toLowerCase() === lowerQuery ||
      camera.location.city.toLowerCase() === lowerQuery ||
      camera.id.toLowerCase() === lowerQuery ||
      camera.type.toLowerCase() === lowerQuery
    );
    
    if (exactMatches.length > 0) {
      results = exactMatches;
    } else {
      // Then do partial matches
      results = mockCameras.filter(camera => 
        camera.name.toLowerCase().includes(lowerQuery) ||
        camera.location.country.toLowerCase().includes(lowerQuery) ||
        camera.location.city.toLowerCase().includes(lowerQuery) ||
        camera.id.toLowerCase().includes(lowerQuery) ||
        camera.type.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Add some randomness to make each search feel unique
    // In a real implementation, each search would actually be unique
    const shuffleResults = Math.random() > 0.5;
    if (shuffleResults && results.length > 5) {
      results = [...results].sort(() => Math.random() - 0.5);
    }
  } else {
    // If no query, return a smaller set of results
    results = mockCameras.slice(0, 12);
  }
  
  // Simulate network delay - longer for more complex queries
  const delay = query ? 800 + (query.length * 50) : 500;
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Only return online cameras
  const onlineResults = results.filter(camera => camera.status === 'online');
  
  return {
    success: true,
    results: onlineResults,
    totalFound: onlineResults.length,
    message: `Found ${onlineResults.length} cameras matching your search`,
    queryComplexity: query ? 'specific' : 'general'
  };
};
