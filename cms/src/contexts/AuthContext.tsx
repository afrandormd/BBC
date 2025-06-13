
"use client";

import type React from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User, ServerActionResponse } from '@/types';
import { loginAction, fetchUserProfile, updateUserProfileAction, logoutAction } from '@/app/actions/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateUserContext: (updatedData: Partial<Pick<User, 'displayName' | 'email' | 'role'>>) => Promise<User | null>;
  isLoading: boolean;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to extract a string message from the error
const getErrorMessage = (error: ServerActionResponse['error'], defaultMessage: string): string => {
    if (!error) return defaultMessage;
    if (typeof error === 'string') return error;
    // If it's an object (like Zod errors), attempt to get the first message from the first field
    const firstErrorKey = Object.keys(error)[0];
    if (firstErrorKey && Array.isArray(error[firstErrorKey]) && error[firstErrorKey].length > 0) {
        return error[firstErrorKey][0];
    }
    return defaultMessage;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      setAuthError(null);
      try {
        const response = await fetchUserProfile();
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          setUser(null);
          if (!response.success) {
            // console.error("AuthContext: Error fetching user profile on mount:", response.error);
            // Optionally set an authError here if it's critical for UI, though typically silent failure is okay
          }
        }
      } catch (e) {
        // console.error("AuthContext: Exception during checkSession:", e);
        setUser(null);
        // setAuthError("Failed to initialize session due to an unexpected error.");
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = useCallback(async (username: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await loginAction(username, pass);
      if (response.success && response.data) {
        setUser(response.data);
        return true;
      } else {
        setAuthError(getErrorMessage(response.error, "Login failed. Please check your credentials."));
        setUser(null);
        return false;
      }
    } catch (e) {
      // console.error("AuthContext: Exception during login:", e);
      setAuthError("An unexpected error occurred during login.");
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      await logoutAction();
    } catch (e) {
      // console.error("AuthContext: Exception during logout:", e);
      // Error during logout is usually not critical to user, but log it.
    } finally {
      setUser(null);
      setIsLoading(false);
      router.push('/login');
    }
  }, [router]);

  const updateUserContext = useCallback(async (updatedData: Partial<Pick<User, 'displayName' | 'email' | 'role'>>): Promise<User | null> => {
    if (!user) {
      setAuthError("No user logged in to update.");
      return null;
    }
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await updateUserProfileAction(user.id, updatedData);
      if (response.success && response.data) {
        setUser(response.data);
        return response.data;
      } else {
        setAuthError(getErrorMessage(response.error, "Failed to update profile."));
        return null; 
      }
    } catch (e) {
      // console.error("AuthContext: Exception during profile update:", e);
      setAuthError("An unexpected error occurred while updating profile.");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);
  
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateUserContext, isLoading, authError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
