
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  User, 
  ShieldAlert, 
  ChevronRight, 
  Globe, 
  Lock,
  Database,
  Search
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">EPLQ</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              User Login
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <ShieldAlert className="h-4 w-4" />
              Admin Portal
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-2 bg-secondary/10 rounded-full mb-4">
            <Lock className="h-5 w-5 text-secondary mr-2" />
            <span className="text-sm font-medium">Privacy-Preserving Location Services</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            EPLQ: Efficient Privacy-preserving Location-based Queries
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Protect your location privacy while enjoying location-based services.
            EPLQ enables spatial range queries without compromising your sensitive information.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card border border-border/60 rounded-lg p-6 flex flex-col">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Privacy Protection</h3>
            <p className="text-muted-foreground mb-4 flex-grow">
              Our predicate-only encryption system prevents location data exposure
              while enabling effective spatial queries.
            </p>
            <div className="text-sm text-primary font-medium flex items-center">
              Advanced Encryption <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
          
          <div className="bg-card border border-border/60 rounded-lg p-6 flex flex-col">
            <div className="bg-accent/10 p-3 rounded-full w-fit mb-4">
              <Search className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Spatial Range Queries</h3>
            <p className="text-muted-foreground mb-4 flex-grow">
              Find points of interest within circular areas while keeping
              your exact location encrypted and secure.
            </p>
            <div className="text-sm text-primary font-medium flex items-center">
              Efficient Searching <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
          
          <div className="bg-card border border-border/60 rounded-lg p-6 flex flex-col">
            <div className="bg-secondary/10 p-3 rounded-full w-fit mb-4">
              <Database className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Optimized Performance</h3>
            <p className="text-muted-foreground mb-4 flex-grow">
              Our privacy-preserving tree index structure delivers 
              fast query responses without compromising security.
            </p>
            <div className="text-sm text-primary font-medium flex items-center">
              Low Latency <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 bg-card rounded-lg border border-border/60 my-16">
        <h2 className="text-3xl font-bold text-center mb-12">How EPLQ Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">1</div>
            </div>
            <h3 className="font-semibold mb-2">Encrypt Location</h3>
            <p className="text-sm text-muted-foreground">
              Your device encrypts your location data before sending any queries
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">2</div>
            </div>
            <h3 className="font-semibold mb-2">Create Secure Query</h3>
            <p className="text-sm text-muted-foreground">
              The system generates a privacy-preserving spatial range query
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">3</div>
            </div>
            <h3 className="font-semibold mb-2">Process with EPLQ</h3>
            <p className="text-sm text-muted-foreground">
              Our server processes the query using encrypted data and tree index
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">4</div>
            </div>
            <h3 className="font-semibold mb-2">Receive Secure Results</h3>
            <p className="text-sm text-muted-foreground">
              You receive encrypted results that only you can decrypt
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Protect Your Location Privacy?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join EPLQ today and experience location-based services with enhanced privacy protection.
          </p>
          <Link to="/register">
            <Button size="lg" className="px-8">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold">EPLQ</span>
              <span className="text-sm text-muted-foreground ml-2">
                © {new Date().getFullYear()} Privacy-Preserving Location Services
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Terms of Service</a>
              <a href="#" className="hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
