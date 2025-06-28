
"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MailQuestion, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Placeholder for forgot password logic
    // In a real app, this would call `forgotPasswordAction(email)`
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate an error for an unregistered email
     if (email === 'notfound@example.com') {
      setError("No account found with that email address.");
      setIsSubmitting(false);
      return;
    }

    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
        <Card className="w-full max-w-md shadow-xl text-center">
            <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-fit">
                    <CheckCircle className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
                <CardDescription>A password reset link has been sent to <span className="font-semibold text-primary">{email}</span>. Please check your inbox and spam folder.</CardDescription>
            </CardHeader>
             <CardContent>
                <Link href="/login" passHref>
                    <Button className="w-full">
                        Return to Sign In
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
         <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
          <MailQuestion className="h-7 w-7 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold">Forgot Password</CardTitle>
        <CardDescription>Enter your email and we&apos;ll send you a link to reset your password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
           {error && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your account's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full text-base py-3" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Send className="mr-2 h-5 w-5" />
            )}
            Send Reset Link
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm pt-4">
        <Link href="/login" passHref>
            <span className="font-semibold text-primary hover:underline cursor-pointer">
              Back to Sign In
            </span>
        </Link>
      </CardFooter>
    </Card>
  );
}
