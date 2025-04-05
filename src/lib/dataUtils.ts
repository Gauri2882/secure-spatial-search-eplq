
/**
 * Data Utilities for EPLQ Application
 * 
 * Contains functions for generating and managing Points of Interest (POIs)
 * and other data-related operations.
 */

export interface PointOfInterest {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  category?: string;
  description?: string;
  encryptedData?: string;
  isDecrypted?: boolean;
}

// List of sample POI categories
const poiCategories = [
  'Restaurant',
  'Hotel',
  'Landmark',
  'Shopping',
  'Entertainment',
  'Park',
  'Hospital',
  'School',
  'Gas Station',
  'Parking'
];

// List of sample POI name prefixes
const poiNamePrefixes = [
  'Royal',
  'Central',
  'Golden',
  'Silver',
  'Blue',
  'Green',
  'Grand',
  'Metro',
  'Urban',
  'City',
  'Town',
];

// List of sample POI name suffixes
const poiNameSuffixes = [
  'Plaza',
  'Tower',
  'Center',
  'Square',
  'Gardens',
  'Park',
  'Station',
  'Building',
  'Mall',
  'Corner',
  'Place',
];

// Generate a random name for a POI
const generateRandomPOIName = (): string => {
  const usePrefix = Math.random() > 0.3;
  const prefix = usePrefix ? poiNamePrefixes[Math.floor(Math.random() * poiNamePrefixes.length)] : '';
  const suffix = poiNameSuffixes[Math.floor(Math.random() * poiNameSuffixes.length)];
  const category = poiCategories[Math.floor(Math.random() * poiCategories.length)];
  
  return usePrefix ? `${prefix} ${category} ${suffix}` : `${category} ${suffix}`;
};

// Generate a random category for a POI
const getRandomCategory = (): string => {
  return poiCategories[Math.floor(Math.random() * poiCategories.length)];
};

// Generate a random coordinate within a given radius around a center point
const generateRandomCoordinate = (
  centerLat: number,
  centerLng: number,
  radiusInMeters: number
): [number, number] => {
  // Earth's radius in meters
  const earthRadius = 6371000;
  
  // Convert radius from meters to degrees
  const radiusInDegrees = radiusInMeters / earthRadius * (180 / Math.PI);
  
  // Generate random distance within the radius
  const distance = Math.random() * radiusInDegrees;
  
  // Generate random angle
  const angle = Math.random() * 2 * Math.PI;
  
  // Calculate offset
  const latOffset = distance * Math.cos(angle);
  const lngOffset = distance * Math.sin(angle) / Math.cos(centerLat * Math.PI / 180);
  
  // Return new coordinates
  return [
    centerLat + latOffset,
    centerLng + lngOffset
  ];
};

// Generate mock POIs around a center point
export const generateMockPOIs = (
  centerCoordinates: [number, number],
  count: number,
  maxRadius: number
): PointOfInterest[] => {
  const pois: PointOfInterest[] = [];
  
  for (let i = 0; i < count; i++) {
    const [latitude, longitude] = generateRandomCoordinate(
      centerCoordinates[0],
      centerCoordinates[1],
      maxRadius
    );
    
    pois.push({
      id: `poi-${i}-${Date.now()}`,
      name: generateRandomPOIName(),
      latitude,
      longitude,
      category: getRandomCategory(),
      description: `This is a mock POI generated for demonstration purposes.`
    });
  }
  
  return pois;
};

// Format a coordinate for display
export const formatCoordinate = (coordinate: number): string => {
  return coordinate.toFixed(6);
};

// Calculate the distance between two coordinates in meters
export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance; // in meters
};

// Mock database operations for admin data management
export const mockDbOperations = {
  addPOI: async (poi: Omit<PointOfInterest, 'id'>): Promise<PointOfInterest> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newPOI: PointOfInterest = {
      ...poi,
      id: `poi-${Date.now()}`
    };
    
    console.log('Added new POI:', newPOI);
    return newPOI;
  },
  
  updatePOI: async (id: string, updates: Partial<PointOfInterest>): Promise<PointOfInterest> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // This would normally update a database
    console.log('Updated POI:', { id, updates });
    
    // Return a mock updated POI
    return {
      id,
      name: updates.name || 'Updated POI',
      latitude: updates.latitude || 0,
      longitude: updates.longitude || 0,
      category: updates.category,
      description: updates.description
    };
  },
  
  deletePOI: async (id: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // This would normally delete from a database
    console.log('Deleted POI:', id);
  },
  
  getAllPOIs: async (): Promise<PointOfInterest[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate some mock POIs
    return generateMockPOIs([51.505, -0.09], 10, 5000);
  }
};
