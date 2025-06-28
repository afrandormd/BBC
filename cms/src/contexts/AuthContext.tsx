
"use client";

import type React from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User, ServerActionResponse } from '@/types';
import { fetchAndSetJwtAction, loginAction, fetchUserProfile, updateUserProfileAction, logoutAction } from '@/app/actions/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateUserContext: (updatedData: Partial<Pick<User, 'name' | 'email' | 'role'>>) => Promise<User | null>;
  isLoading: boolean;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getErrorMessage = (error: ServerActionResponse['error'], defaultMessage: string): string => {
    if (!error) return defaultMessage;
    if (typeof error === 'string') return error;
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
    const initializeSession = async () => {
      setIsLoading(true);
      setAuthError(null);
      
      // In a fully mocked environment, we directly fetch the mock user profile
      // without performing a token exchange first. This ensures the app starts
      // quickly and without errors, even if the backend is unavailable.
      const profileResponse = await fetchUserProfile();

      if (profileResponse.success && profileResponse.data) {
        setUser(profileResponse.data);
      } else {
        // This case should not happen with the updated mock fetchUserProfile action.
        console.error("AuthContext: Could not initialize mock session.", profileResponse.error);
        setUser(null);
      }
      
      setIsLoading(false);
    };

    initializeSession();
  }, []);

  const login = useCallback(async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);
    const response = await loginAction(email, pass);
    if (response.success && response.data) {
      setUser(response.data);
      await fetchAndSetJwtAction(); // Set a mock cookie on successful login for consistency
      setIsLoading(false);
      return true;
    } else {
      setAuthError(getErrorMessage(response.error, "Login failed. Please check your credentials."));
      setIsLoading(false);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);
    await logoutAction();
    setUser(null);
    setIsLoading(false);
    router.push('/login');
  }, [router]);

  const updateUserContext = useCallback(async (updatedData: Partial<Pick<User, 'name' | 'email' | 'role'>>): Promise<User | null> => {
    if (!user) {
      setAuthError("No user logged in to update.");
      return null;
    }
    
    setIsLoading(true);
    setAuthError(null);
    const response = await updateUserProfileAction(user.id, updatedData);
    if (response.success && response.data) {
      setUser(response.data);
      setIsLoading(false);
      return response.data;
    } else {
      setAuthError(getErrorMessage(response.error, "Failed to update profile."));
      setIsLoading(false);
      return null; 
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
