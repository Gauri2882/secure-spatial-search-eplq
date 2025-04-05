
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Shield } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">EPLQ Secure Location Service</h1>
          <p className="text-muted-foreground mt-2">
            Privacy-preserving location-based queries
          </p>
        </div>
        
        <AuthForm defaultMode="login" userType="user" />
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Admin login? <a href="/admin" className="text-primary hover:underline">Go to admin portal</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
