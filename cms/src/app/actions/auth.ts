'use server';

import type { User, ServerActionResponse } from '@/types';
import { cookies } from 'next/headers';
import { getAuthToken } from '@/lib/api-helpers';

// ===================================================================================
// IMPORTANT: AUTHENTICATION IS MOCKED
// To ensure a smooth development experience without a backend dependency, all
// authentication and user management actions are mocked. They do not make
// real API calls.
// ===================================================================================

let mockUserStore: User = {
    id: 'dev-user-01',
    name: 'Tirta (Dev Mode)',
    email: 'tirta@gmail.com',
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

// This action is mocked to always succeed, preventing startup errors.
export async function fetchAndSetJwtAction(): Promise<ServerActionResponse<{token: string}>> {
  console.log('Server Action: fetchAndSetJwtAction (Mock)');
  const mockToken = 'mock-jwt-token-for-development';
  (await cookies()).set('token', mockToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60, // 1 hour
  });
  return { success: true, data: { token: mockToken } };
}

// Mock login to allow easy entry into the dashboard.
export async function loginAction(email: string, pass: string): Promise<ServerActionResponse<User>> {
  console.log('Server Action: loginAction (Mock) attempt for', email);
  await new Promise(resolve => setTimeout(resolve, 500)); 

  if (email && pass) {
    // Return the current state of the mock user
    return { success: true, data: mockUserStore };
  } else {
    return { success: false, error: "Invalid credentials (mock)" };
  }
}

// Mock profile fetch.
export async function fetchUserProfile(tokenOverride?: string): Promise<ServerActionResponse<User | null>> {
  console.log('Server Action: fetchUserProfile (Mock)');
  // In the mock setup, we directly return the mock user without a token check
  // to ensure a smooth and error-free startup experience for development.
  await new Promise(resolve => setTimeout(resolve, 50)); 
  return { success: true, data: mockUserStore };
}

// Mock profile update.
export async function updateUserProfileAction(
  userId: string | number,
  updates: Partial<Pick<User, 'name' | 'email' | 'role'>>
): Promise<ServerActionResponse<User>> {
   console.log('Server Action: updateUserProfileAction (Mock) for ID', userId);
   // The token check is removed in the mock implementation to allow profile updates
   // without a real backend connection.
   await new Promise(resolve => setTimeout(resolve, 100));

   // Update the in-memory mock user
   mockUserStore = { ...mockUserStore, ...updates, updatedAt: new Date().toISOString() };
    
   return { success: true, data: mockUserStore };
}

export async function logoutAction(): Promise<ServerActionResponse> {
  console.log('Server Action: logoutAction attempt');
  (await cookies()).delete('token');
  return { success: true };
}
