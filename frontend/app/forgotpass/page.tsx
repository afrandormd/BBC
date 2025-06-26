/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// Importing necessary libraries and components
import { useState } from "react";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/elements/button";
import { Input } from "@/components/elements/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/elements/card";
import Link from "next/link";
// Main component for the Forgot Password page
export default function ForgotPassword() {
  // State to manage loading state during API call simulation
  const [isLoading, setIsLoading] = useState(false);

  // State to manage if the email has been successfully sent
  const [isEmailSent, setIsEmailSent] = useState(false);

  // Handler function for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Set loading state to true
    // Simulate API call using setTimeout
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsEmailSent(true); // Mark email as sent
    setIsLoading(false); // Reset loading state
  };

  return (
    // Main container with full-screen flexbox layout
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      {/* Card component to display the Forgot Password form */}
      <Card className="w-full max-w-md">
        {/* Header Section */}
        <CardHeader className="space-y-1">
          {/* Back to Login and Title */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <CardTitle className="text-2xl font-bold">Lupa Password</CardTitle>
          </div>
          {/* Description of the process */}
          <CardDescription>
            Masukkan email Anda dan kami akan mengirimkan instruksi untuk
            mengatur ulang kata sandi Anda.
          </CardDescription>
        </CardHeader>
        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          <CardContent>
            {!isEmailSent ? (
              <div className="space-y-4">
                {/* Email Input Field */}
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="nama@email.com"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Success Message Section
              <div className="space-y-4 text-center p-4">
                <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Email Terkirim</h3>
                  <p className="text-sm text-muted-foreground">
                    Silakan periksa email Anda untuk instruksi lebih lanjut
                    tentang cara mengatur ulang kata sandi Anda.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          {/* Footer Section */}
          <CardFooter className="flex flex-col gap-4">
            {!isEmailSent ? (
              <>
                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Kirim Instruksi Reset
                </Button>
                {/* Link to Login */}
                <p className="text-sm text-center text-muted-foreground">
                  Ingat password Anda?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Kembali ke Login
                  </Link>
                </p>
              </>
            ) : (
              // Resend Email Button
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsEmailSent(false)}
              >
                Kirim Ulang Email
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
