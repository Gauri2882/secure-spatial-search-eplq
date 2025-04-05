
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import PrivacyMap from '@/components/map/PrivacyMap';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  LogOut, 
  User, 
  Info, 
  Map, 
  Search,
  Lock,
  ListFilter
} from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-accent" />
            <h1 className="text-xl font-semibold">EPLQ Secure Location Service</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {user.name}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-secondary" />
                Privacy Status
              </CardTitle>
              <CardDescription>Your privacy protection is active</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="bg-accent/10 p-2 rounded-full">
                  <Lock className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">EPLQ Protection Active</p>
                  <p className="text-xs text-muted-foreground">Using predicate-only encryption</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Map className="h-5 w-5 text-secondary" />
                Location Service
              </CardTitle>
              <CardDescription>Find points of interest safely</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Spatial Range Queries</p>
                  <p className="text-xs text-muted-foreground">Encrypted circular area search</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <ListFilter className="h-5 w-5 text-secondary" />
                Query Performance
              </CardTitle>
              <CardDescription>Fast and efficient searches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="bg-secondary/10 p-2 rounded-full">
                  <Info className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">~0.9s Query Generation</p>
                  <p className="text-xs text-muted-foreground">Using privacy-preserving tree index</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Privacy-Preserving Location Search</h2>
          <p className="text-muted-foreground mb-6">
            Search for points of interest within a specified radius while keeping your exact location encrypted.
          </p>
          
          <div className="bg-card border border-border/60 rounded-lg p-4">
            <PrivacyMap userRole="user" />
          </div>
        </div>
        
        <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mt-8">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            How Your Privacy is Protected
          </h3>
          <p className="text-sm mb-3">
            EPLQ uses advanced cryptographic techniques to ensure your location data remains private:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-background p-3 rounded-md shadow-sm">
              <h4 className="font-medium mb-1">Predicate-Only Encryption</h4>
              <p className="text-muted-foreground text-xs">
                Allows searching encrypted data without revealing the actual values
              </p>
            </div>
            <div className="bg-background p-3 rounded-md shadow-sm">
              <h4 className="font-medium mb-1">Inner Product Range</h4>
              <p className="text-muted-foreground text-xs">
                Determines if a location is within a circular area without decryption
              </p>
            </div>
            <div className="bg-background p-3 rounded-md shadow-sm">
              <h4 className="font-medium mb-1">Privacy-Preserving Tree Index</h4>
              <p className="text-muted-foreground text-xs">
                Optimizes query performance while maintaining strong privacy guarantees
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
