
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Shield } from 'lucide-react';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground mt-2">
            Join EPLQ to access privacy-protected location services
          </p>
        </div>
        
        <AuthForm defaultMode="register" userType="user" />
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Already have an account? <a href="/login" className="text-primary hover:underline">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
