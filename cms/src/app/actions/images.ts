
'use server';

import type { ImageItem, ServerActionResponse } from '@/types';
// import { z } from 'zod'; // For input validation if needed

// Placeholder for user ID, in a real app this would come from the session
// const MOCK_USER_ID = 'mock-user-id';

// In-memory store for demonstration purposes if not using a DB
// let mockImageStore: ImageItem[] = [];

export async function fetchImagesAction(): Promise<ServerActionResponse<ImageItem[]>> {
  console.log('Server Action: fetchImagesAction');
  await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay
  // For now, return an empty array or some mock data if desired
  // return { success: true, data: mockImageStore };
  return { success: true, data: [] };
}

export async function uploadImageAction(newImage: Omit<ImageItem, 'id' | 'uploadedAt'> & { uploadedAt?: Date }): Promise<ServerActionResponse<ImageItem>> {
  console.log('Server Action: uploadImageAction', newImage.name);
  await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay
  
  const imageToSave: ImageItem = {
    ...newImage,
    id: crypto.randomUUID(),
    uploadedAt: newImage.uploadedAt || new Date(),
    // userId: MOCK_USER_ID, // Associate with user
  };
  
  // mockImageStore.unshift(imageToSave); // Add to mock store

  console.log('Server Action: image upload successful for', newImage.name);
  return { success: true, data: imageToSave };
}

export async function updateImageAction(
  imageId: string,
  updates: Partial<Pick<ImageItem, 'name' | 'price'>>
): Promise<ServerActionResponse<ImageItem>> {
  console.log('Server Action: updateImageAction for ID', imageId, 'with updates:', updates);
  await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay

  // const imageIndex = mockImageStore.findIndex(img => img.id === imageId);
  // if (imageIndex === -1) {
  //   return { success: false, error: "Image not found or not authorized." };
  // }
  // mockImageStore[imageIndex] = { 
  //   ...mockImageStore[imageIndex], 
  //   ...updates, 
  //   uploadedAt: new Date(mockImageStore[imageIndex].uploadedAt) 
  // };
  // return { success: true, data: mockImageStore[imageIndex] };

  // Mock update
  const mockUpdatedImage: ImageItem = {
    id: imageId,
    name: updates.name || `Image ${imageId.substring(0,4)}`,
    dataUri: 'https://placehold.co/600x400.png', // This would be fetched from the existing item
    price: updates.price !== undefined ? updates.price : "Not set", // Handle price update
    uploadedAt: new Date() // Or fetch existing uploadedAt
  };
  return { success: true, data: mockUpdatedImage };
}

export async function deleteImageAction(imageId: string): Promise<ServerActionResponse> {
  console.log('Server Action: deleteImageAction for ID', imageId);
  await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay

  // const initialLength = mockImageStore.length;
  // mockImageStore = mockImageStore.filter(img => img.id !== imageId);
  // if (mockImageStore.length === initialLength) {
  //    return { success: false, error: "Image not found." };
  // }
  
  console.log('Server Action: image deletion successful for', imageId);
  return { success: true };
}
