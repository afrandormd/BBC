
"use client";

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LogIn, Loader2, AlertCircle } from 'lucide-react';
// import Link from 'next/link'; // Removed as per previous request

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Local loading state for the form submission, AuthContext has its own global isLoading
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const { login, authError } = useAuth(); // Get authError from context
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const success = await login(username, password);
    setIsSubmitting(false);
    if (success) {
      router.push('/dashboard');
      toast({
        title: "Login Successful",
        description: "Welcome to Askhajaya!",
      });
    } else {
      // Error is now handled by authError from context, but we can still show a toast
      // The specific error message will come from authError
      toast({
        title: "Login Failed",
        description: authError || "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
        </div>
        <CardTitle className="text-3xl font-bold">AskhaJaya</CardTitle>
        <CardDescription>Aplikasi CMS AskhaJaya</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {authError && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <p>{authError}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="text-base"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-base"
            />
          </div>
          <Button type="submit" className="w-full text-base py-3" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <LogIn className="mr-2 h-5 w-5" />
            )}
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center text-sm space-y-2 pt-4">
        {/* Sign Up and Forgot Password links were previously removed */}
      </CardFooter>
    </Card>
  );
}
