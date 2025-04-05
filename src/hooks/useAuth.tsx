
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role?: 'admin' | 'user') => Promise<void>;
  register: (name: string, email: string, password: string, role?: 'admin' | 'user') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock database to simulate user storage
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Test User',
    email: 'user@example.com',
    role: 'user',
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for existing session on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('eplq-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
    
    // Log the authentication check
    console.log('Auth check completed', { userFound: !!storedUser });
  }, []);

  const login = async (email: string, password: string, role: 'admin' | 'user' = 'user') => {
    // Simulate API request delay
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, this would validate against a secure backend
    const matchedUser = mockUsers.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && u.role === role
    );

    if (matchedUser) {
      console.log(`User ${matchedUser.name} logged in successfully`);
      setUser(matchedUser);
      localStorage.setItem('eplq-user', JSON.stringify(matchedUser));
      toast.success(`Welcome back, ${matchedUser.name}!`);
    } else {
      console.error('Login failed: Invalid credentials');
      throw new Error('Invalid credentials');
    }
    
    setLoading(false);
  };

  const register = async (name: string, email: string, password: string, role: 'admin' | 'user' = 'user') => {
    // Simulate API request delay
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      console.error('Registration failed: Email already in use');
      setLoading(false);
      throw new Error('Email already in use');
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
    };

    // In a real app, this would send the data to a secure backend
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('eplq-user', JSON.stringify(newUser));
    
    console.log(`New ${role} registered: ${name}, ${email}`);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('eplq-user');
    setUser(null);
    console.log('User logged out');
    toast.success('Logged out successfully');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      isAuthenticated,
      isAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
