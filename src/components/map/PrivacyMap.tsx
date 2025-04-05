
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  Search, 
  Lock, 
  Unlock, 
  Shield, 
  Eye, 
  EyeOff,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { encryptLocation, decryptLocation } from '@/lib/encryptionUtils';
import { PointOfInterest, generateMockPOIs } from '@/lib/dataUtils';

interface PrivacyMapProps {
  userRole?: 'user' | 'admin';
  initialLocation?: [number, number];
}

const PrivacyMap: React.FC<PrivacyMapProps> = ({ 
  userRole = 'user',
  initialLocation = [51.505, -0.09] // London by default
}) => {
  const [searchRadius, setSearchRadius] = useState(1000); // meters
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<PointOfInterest[]>([]);
  const [showEncrypted, setShowEncrypted] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<[number, number]>(initialLocation);
  const [isDecrypting, setIsDecrypting] = useState(false);
  
  // Generate mock POIs when component mounts
  useEffect(() => {
    // This would normally come from a secure backend
    const mockPOIs = generateMockPOIs(currentLocation, 20, 2000);
    console.log(`Generated ${mockPOIs.length} mock POIs around location`);
  }, [currentLocation]);

  const handleSearch = async () => {
    setIsSearching(true);
    toast.info(`Searching with privacy protection...`);
    
    // Simulate encryption delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, this would use real encryption and a secure backend
    const encryptedQuery = encryptLocation(currentLocation, searchRadius);
    console.log('Encrypted query:', encryptedQuery);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get mock POIs within the search radius
    const mockPOIs = generateMockPOIs(currentLocation, 20, 2000)
      .filter(poi => {
        const distance = calculateDistance(
          currentLocation[0], 
          currentLocation[1], 
          poi.latitude, 
          poi.longitude
        );
        return distance <= searchRadius;
      });
    
    // Encrypt the results
    const encryptedPOIs = mockPOIs.map(poi => ({
      ...poi,
      // In a real app, these would be properly encrypted
      encryptedData: encryptLocation([poi.latitude, poi.longitude], 0),
      isDecrypted: false
    }));
    
    setSearchResults(encryptedPOIs);
    setIsSearching(false);
    
    toast.success(`Found ${encryptedPOIs.length} points of interest`);
  };

  const decryptPOI = async (poiId: string) => {
    setIsDecrypting(true);
    
    // Find the POI to decrypt
    const updatedResults = searchResults.map(poi => {
      if (poi.id === poiId) {
        // Simulate decryption process
        const decryptedLocation = decryptLocation(poi.encryptedData);
        console.log(`Decrypting POI ${poi.id}:`, decryptedLocation);
        
        return {
          ...poi,
          isDecrypted: true
        };
      }
      return poi;
    });
    
    // Simulate decryption delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setSearchResults(updatedResults);
    setIsDecrypting(false);
    toast.success('Location data decrypted');
  };

  const toggleEncryptionView = () => {
    setShowEncrypted(!showEncrypted);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <div className="relative w-full h-[400px] bg-slate-200 rounded-lg overflow-hidden">
              {/* This would be a real map in a production app */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-lg font-semibold">Interactive Map</p>
                  <p className="text-sm text-muted-foreground">Center: {currentLocation[0].toFixed(4)}, {currentLocation[1].toFixed(4)}</p>
                </div>
              </div>
              
              {/* Encryption visualization overlay */}
              {showEncrypted && (
                <div className="absolute inset-0 encryption-overlay flex items-center justify-center">
                  <div className="bg-background/80 p-4 rounded-lg shadow-lg text-center max-w-xs">
                    <Shield className="h-6 w-6 text-accent mx-auto animate-pulse-opacity" />
                    <p className="text-sm font-medium mt-2">Privacy Protection Active</p>
                    <p className="text-xs text-muted-foreground">Location data is encrypted</p>
                  </div>
                </div>
              )}
              
              {/* Visual representation of search radius */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div 
                  className="rounded-full border-2 border-secondary/60 bg-secondary/20"
                  style={{ 
                    width: `${Math.min(300, searchRadius / 10)}px`, 
                    height: `${Math.min(300, searchRadius / 10)}px`,
                    transition: 'all 0.3s ease'
                  }}
                ></div>
              </div>
              
              {/* POI markers */}
              {searchResults.map((poi, index) => (
                <div 
                  key={poi.id}
                  className="absolute"
                  style={{ 
                    top: `${50 + (Math.cos(index) * 30)}%`, 
                    left: `${50 + (Math.sin(index) * 30)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className={`
                    w-3 h-3 rounded-full
                    ${poi.isDecrypted 
                      ? 'bg-secondary animate-pulse-opacity' 
                      : 'bg-accent/50'
                    }
                  `}></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Search Settings
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">
                      Search Radius: {searchRadius}m
                    </label>
                    <Slider
                      value={[searchRadius]}
                      min={100}
                      max={5000}
                      step={100}
                      onValueChange={(values) => setSearchRadius(values[0])}
                      className="my-2"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Current Location"
                      value={`${currentLocation[0].toFixed(4)}, ${currentLocation[1].toFixed(4)}`}
                      readOnly
                      className="text-sm"
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="icon"
                            variant="outline"
                            onClick={toggleEncryptionView}
                          >
                            {showEncrypted ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {showEncrypted ? 'Show raw location data' : 'Show encrypted view'}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleSearch}
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Processing Encrypted Query...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Search Securely
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Privacy Info
                </h3>
                <div className="bg-muted p-3 rounded-md text-sm">
                  <p className="mb-2 flex items-center gap-1">
                    <Info className="h-4 w-4 text-secondary" />
                    <span>Using EPLQ for privacy-preserving spatial queries</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your location data is encrypted before being sent to the server.
                    Only data within your search radius is processed.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-3">Search Results</h3>
            <div className="space-y-2">
              {searchResults.map((poi) => (
                <div 
                  key={poi.id}
                  className="p-3 bg-muted/50 rounded-md flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-accent" />
                      {poi.name}
                      {poi.category && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          {poi.category}
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm mt-1">
                      {poi.isDecrypted ? (
                        <span className="text-secondary-foreground">
                          Lat: {poi.latitude.toFixed(4)}, Lng: {poi.longitude.toFixed(4)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground font-mono text-xs">
                          {poi.encryptedData.substring(0, 20)}...
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={poi.isDecrypted ? "outline" : "default"}
                    onClick={() => !poi.isDecrypted && decryptPOI(poi.id)}
                    disabled={isDecrypting || poi.isDecrypted}
                  >
                    {poi.isDecrypted ? (
                      <>
                        <Unlock className="h-3 w-3 mr-1" />
                        Decrypted
                      </>
                    ) : (
                      <>
                        <Lock className="h-3 w-3 mr-1" />
                        Decrypt
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Haversine formula to calculate distance between two coordinates
function calculateDistance(
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number {
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
}

export default PrivacyMap;
