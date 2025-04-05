
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ShieldCheck, User, UserPlus, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

type AuthMode = 'login' | 'register';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

const AuthForm = ({ defaultMode = 'login', userType = 'user' }: { defaultMode?: AuthMode, userType?: 'user' | 'admin' }) => {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onLoginSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      await login(data.email, data.password, userType);
      toast.success(`Welcome back!`);
      navigate(userType === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please check your credentials.');
    }
  };

  const onRegisterSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await register(data.name, data.email, data.password, userType);
      toast.success('Account created successfully!');
      navigate(userType === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to create account. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg border border-accent/10">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 mb-2">
          {userType === 'admin' ? (
            <ShieldCheck className="h-6 w-6 text-accent" />
          ) : (
            <User className="h-6 w-6 text-secondary" />
          )}
          <CardTitle className="text-2xl font-bold">
            {userType === 'admin' ? 'Admin' : 'User'} {mode === 'login' ? 'Login' : 'Registration'}
          </CardTitle>
        </div>
        <CardDescription>
          {mode === 'login' 
            ? 'Enter your credentials to access your account' 
            : 'Create a new account to get started'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {mode === 'login' ? (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-primary/40 focus-within:border-primary">
                        <Mail className="ml-2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="you@example.com" className="border-0 focus-visible:ring-0" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-primary/40 focus-within:border-primary">
                        <Lock className="ml-2 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="********" className="border-0 focus-visible:ring-0" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </Form>
        ) : (
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-primary/40 focus-within:border-primary">
                        <User className="ml-2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Your name" className="border-0 focus-visible:ring-0" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-primary/40 focus-within:border-primary">
                        <Mail className="ml-2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="you@example.com" className="border-0 focus-visible:ring-0" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-primary/40 focus-within:border-primary">
                        <Lock className="ml-2 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="********" className="border-0 focus-visible:ring-0" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Register</Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="link" 
          className="w-full" 
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? (
            <span className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              Don't have an account? Register
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Already have an account? Login
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
