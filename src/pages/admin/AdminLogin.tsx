
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-accent/10 p-3 rounded-full">
              <ShieldAlert className="h-10 w-10 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Admin Portal</h1>
          <p className="text-muted-foreground mt-2">
            Secure access to EPLQ management
          </p>
        </div>
        
        <AuthForm defaultMode="login" userType="admin" />
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>User login? <a href="/login" className="text-primary hover:underline">Go to user portal</a></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
