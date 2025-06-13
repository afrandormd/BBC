
'use server';

import type { User, ServerActionResponse } from '@/types';
// import { z } from 'zod'; // For input validation if needed later

// Placeholder: In a real app, you'd use a library like bcrypt for password hashing/comparison
// const MOCK_PASSWORD_HASH = 'hashed_password_for_demo_user'; // Do not use in production

export async function loginAction(username: string, pass: string): Promise<ServerActionResponse<User>> {
  console.log('Server Action: loginAction attempt for', username);
  // Simulate database call and password check
  await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay

  if (username.trim() !== '' && pass.trim() !== '') {
    // Mock successful login
    const loggedInUser: User = {
      id: `user_${Date.now()}`,
      username: username,
      email: `${username.toLowerCase().replace(/\s+/g, '')}@example.com`,
      displayName: username,
      role: 'admin', // Default role for prototype
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log('Server Action: login successful for', username);
    return { success: true, data: loggedInUser };
  } else {
    console.log('Server Action: login failed for', username);
    return { success: false, error: 'Invalid username or password' };
  }
}

export async function fetchUserProfile(userId?: string): Promise<ServerActionResponse<User | null>> {
  console.log('Server Action: fetchUserProfile attempt for userId:', userId);
  // Simulate fetching user based on session (if userId is not provided) or by ID
  await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay

  // For this placeholder, we'll assume no persistent session without a real backend token.
  // If a userId is passed (e.g. from a mock context), we can return a mock user.
  if (userId) {
     const mockUser: User = {
        id: userId,
        username: "mockUser",
        email: "mock@example.com",
        displayName: "Mock User Profile",
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return { success: true, data: mockUser };
  }
  
  return { success: true, data: null }; // No user session on initial load
}

export async function updateUserProfileAction(
  userId: string,
  updates: Partial<Pick<User, 'displayName' | 'email' | 'role'>>
): Promise<ServerActionResponse<User>> {
  console.log(`Server Action: updateUserProfileAction for user ${userId} with data:`, updates);
  await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay

  // Mock successful update
  const mockUpdatedUser: User = {
    id: userId,
    username: `user_${userId.substring(0,4)}`, // Preserve username
    email: updates.email || `current_email_${userId.substring(0,4)}@example.com`,
    displayName: updates.displayName || `Current Display Name ${userId.substring(0,4)}`,
    role: updates.role || 'operator',
    createdAt: new Date(Date.now() - 100000), // older date
    updatedAt: new Date(),
  };
  console.log('Server Action: profile update successful for', userId);
  return { success: true, data: mockUpdatedUser };
}

export async function logoutAction(): Promise<ServerActionResponse> {
  console.log('Server Action: logoutAction attempt');
  await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay
  // In a real app, you would invalidate the session here
  console.log('Server Action: logout successful');
  return { success: true };
}

