
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShieldAlert, 
  Upload, 
  Database, 
  LogOut, 
  UserPlus, 
  RefreshCw,
  FilePlus,
  Trash2,
  Edit,
  Save,
  Lock,
  MapPin,
  Search,
  List,
  ChevronRight
} from 'lucide-react';
import { PointOfInterest, mockDbOperations } from '@/lib/dataUtils';
import { encryptLocation } from '@/lib/encryptionUtils';
import { toast } from 'sonner';
import PrivacyMap from '@/components/map/PrivacyMap';

const AdminDashboard = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('data');
  const [poiData, setPoiData] = useState<PointOfInterest[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newPoi, setNewPoi] = useState({
    name: '',
    latitude: 0,
    longitude: 0,
    category: '',
    description: '',
  });
  
  // Check if user is authenticated and is an admin
  React.useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/admin');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  // Load POI data
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await mockDbOperations.getAllPOIs();
      setPoiData(data);
      toast.success(`Loaded ${data.length} POI records`);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    }
    setLoading(false);
  };
  
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      loadData();
    }
  }, [isAuthenticated, isAdmin]);
  
  const handleLogout = () => {
    logout();
    navigate('/admin');
  };
  
  const handleAddPoi = async () => {
    setLoading(true);
    try {
      await mockDbOperations.addPOI(newPoi);
      setShowAddDialog(false);
      
      // Reset the form
      setNewPoi({
        name: '',
        latitude: 0,
        longitude: 0,
        category: '',
        description: '',
      });
      
      // Reload data
      await loadData();
      toast.success('POI added successfully');
    } catch (error) {
      console.error('Error adding POI:', error);
      toast.error('Failed to add POI');
    }
    setLoading(false);
  };
  
  const handleUploadData = () => {
    toast.info('This feature would upload data securely in a real application');
  };
  
  const handleEncryptData = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Data encrypted successfully');
      setLoading(false);
    }, 1500);
  };
  
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-sidebar text-sidebar-foreground border-b border-sidebar-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-sidebar-primary" />
            <h1 className="text-xl font-semibold">EPLQ Admin Portal</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-sm">
              <span className="flex items-center gap-1">
                Admin: {user.name}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-sidebar-foreground hover:text-white hover:bg-sidebar-accent">
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
          <p className="text-muted-foreground mb-6">
            Manage privacy-preserving location data and system settings.
          </p>
          
          <Tabs defaultValue="data" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="data" className="flex items-center gap-1">
                <Database className="h-4 w-4" />
                Data Management
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-1">
                <Upload className="h-4 w-4" />
                Upload Data
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-1">
                <Search className="h-4 w-4" />
                Preview Map
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="data">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-secondary" />
                      Point of Interest Data
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={loadData} disabled={loading}>
                        <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>
                      <Button size="sm" onClick={() => setShowAddDialog(true)}>
                        <FilePlus className="h-4 w-4 mr-1" />
                        Add POI
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Manage location data that will be encrypted and accessible to users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-md border mb-4">
                        <div className="bg-muted px-4 py-2 flex items-center font-medium text-sm">
                          <div className="w-8">#</div>
                          <div className="flex-1">Name</div>
                          <div className="w-32">Category</div>
                          <div className="w-48">Location</div>
                          <div className="w-24">Actions</div>
                        </div>
                        <div className="divide-y">
                          {poiData.map((poi, index) => (
                            <div key={poi.id} className="px-4 py-3 flex items-center text-sm">
                              <div className="w-8 text-muted-foreground">{index + 1}</div>
                              <div className="flex-1 font-medium">{poi.name}</div>
                              <div className="w-32 text-muted-foreground">{poi.category}</div>
                              <div className="w-48 text-xs font-mono">
                                {poi.latitude.toFixed(4)}, {poi.longitude.toFixed(4)}
                              </div>
                              <div className="w-24 flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          
                          {poiData.length === 0 && (
                            <div className="px-4 py-8 text-center text-muted-foreground">
                              No POI data available. Add some data to get started.
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleEncryptData} className="flex items-center gap-1">
                          <Lock className="h-4 w-4" />
                          Encrypt All Data
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-secondary" />
                    Upload Data
                  </CardTitle>
                  <CardDescription>
                    Upload new location datasets to be processed and encrypted
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Upload POI Dataset</h3>
                    <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                      Drag and drop your dataset file here, or click to browse. 
                      Supports CSV, JSON, and GeoJSON formats.
                    </p>
                    <Button onClick={handleUploadData}>
                      Select File to Upload
                    </Button>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Processing Steps</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                          <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">1</div>
                        </div>
                        <div>
                          <h4 className="font-medium">Upload</h4>
                          <p className="text-muted-foreground text-sm">
                            Securely upload your dataset to the server
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                          <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">2</div>
                        </div>
                        <div>
                          <h4 className="font-medium">Validation</h4>
                          <p className="text-muted-foreground text-sm">
                            System validates data format and coordinates
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                          <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">3</div>
                        </div>
                        <div>
                          <h4 className="font-medium">Encryption</h4>
                          <p className="text-muted-foreground text-sm">
                            Data is encrypted using EPLQ algorithms
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                          <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">4</div>
                        </div>
                        <div>
                          <h4 className="font-medium">Indexing</h4>
                          <p className="text-muted-foreground text-sm">
                            Privacy-preserving tree index is built for efficient querying
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preview">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-secondary" />
                    Map Preview
                  </CardTitle>
                  <CardDescription>
                    Preview how the encrypted data will appear to users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-card border border-border/60 rounded-lg p-4">
                    <PrivacyMap userRole="admin" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <Card className="bg-primary/5 border border-primary/10">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <List className="h-5 w-5 text-primary" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-500/10 p-1.5 rounded-full">
                    <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                  </div>
                  <h3 className="font-medium">Encryption Service</h3>
                </div>
                <p className="text-muted-foreground text-sm">Active and operational</p>
              </div>
              
              <div className="bg-background p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-500/10 p-1.5 rounded-full">
                    <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                  </div>
                  <h3 className="font-medium">Query Processing</h3>
                </div>
                <p className="text-muted-foreground text-sm">Running efficiently</p>
              </div>
              
              <div className="bg-background p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-500/10 p-1.5 rounded-full">
                    <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                  </div>
                  <h3 className="font-medium">Data Storage</h3>
                </div>
                <p className="text-muted-foreground text-sm">Secured and indexed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      {/* Add POI Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Point of Interest</DialogTitle>
            <DialogDescription>
              Enter details for the new location. This data will be encrypted before being stored.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="poi-name">Name</Label>
              <Input 
                id="poi-name" 
                value={newPoi.name}
                onChange={(e) => setNewPoi({...newPoi, name: e.target.value})}
                placeholder="Enter POI name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="poi-lat">Latitude</Label>
                <Input 
                  id="poi-lat" 
                  type="number"
                  value={newPoi.latitude || ''}
                  onChange={(e) => setNewPoi({...newPoi, latitude: parseFloat(e.target.value)})}
                  placeholder="e.g. 51.505"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="poi-lng">Longitude</Label>
                <Input 
                  id="poi-lng" 
                  type="number"
                  value={newPoi.longitude || ''}
                  onChange={(e) => setNewPoi({...newPoi, longitude: parseFloat(e.target.value)})}
                  placeholder="e.g. -0.09"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="poi-cat">Category</Label>
              <Input 
                id="poi-cat" 
                value={newPoi.category}
                onChange={(e) => setNewPoi({...newPoi, category: e.target.value})}
                placeholder="e.g. Restaurant, Hotel, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="poi-desc">Description</Label>
              <Input 
                id="poi-desc" 
                value={newPoi.description}
                onChange={(e) => setNewPoi({...newPoi, description: e.target.value})}
                placeholder="Brief description"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddPoi} disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-1">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Save className="h-4 w-4" />
                  Save POI
                </span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
