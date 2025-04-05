
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  User, 
  ShieldAlert, 
  ChevronRight, 
  Lock,
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
      
      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-16">
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
              <Link to="#" className="hover:text-foreground">Privacy Policy</Link>
              <Link to="#" className="hover:text-foreground">Terms of Service</Link>
              <Link to="#" className="hover:text-foreground">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
