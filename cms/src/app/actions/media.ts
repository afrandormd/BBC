
'use server';

import type { MediaItem, ServerActionResponse } from '@/types';

// ===================================================================================
// IMPORTANT: MEDIA MANAGEMENT IS MOCKED
// The provided API documentation does not include endpoints for media/image management
// (list, upload, update, delete). Therefore, this feature operates on a temporary,
// in-memory data store to allow UI development without a backend dependency.
// All data will be lost on server restart.
// ===================================================================================

let mockMediaItemStore: MediaItem[] = [
    {
        id: 'media-1',
        name: 'askhajaya-logo.png',
        url: 'https://placehold.co/600x400.png',
        altText: 'Askhajaya company logo',
        uploadedAt: new Date(new Date().setDate(new Date().getDate()-1)).toISOString(),
    },
    {
        id: 'media-2',
        name: 'product-packaging.jpg',
        url: 'https://placehold.co/600x400.png',
        altText: 'Packaging design for keripik products',
        uploadedAt: new Date().toISOString(),
    }
]; 

export async function fetchMediaItemsAction(): Promise<ServerActionResponse<MediaItem[]>> {
  console.log('Server Action: fetchMediaItemsAction (Mock)');
  await new Promise(resolve => setTimeout(resolve, 50)); 
  return { success: true, data: [...mockMediaItemStore].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()) };
}

export async function uploadMediaItemAction(
  newMediaData: Pick<MediaItem, 'name' | 'url' | 'altText'>
): Promise<ServerActionResponse<MediaItem>> {
  console.log('Server Action: uploadMediaItemAction (Mock) for', newMediaData.name);
  await new Promise(resolve => setTimeout(resolve, 500));

  const createdMediaItem: MediaItem = {
    id: crypto.randomUUID(),
    name: newMediaData.name,
    url: newMediaData.url, // The URL is a base64 data URI from the form
    altText: newMediaData.altText,
    uploadedAt: new Date(),
  };

  mockMediaItemStore.unshift(createdMediaItem);
    
  return { success: true, data: createdMediaItem };
}

export async function updateMediaItemAction(
  mediaId: string,
  updates: Partial<Pick<MediaItem, 'name' | 'altText'>>
): Promise<ServerActionResponse<MediaItem>> {
  console.log('Server Action: updateMediaItemAction (Mock) for ID', mediaId);
  await new Promise(resolve => setTimeout(resolve, 50));

  const itemIndex = mockMediaItemStore.findIndex(item => item.id === mediaId);
  if (itemIndex === -1) {
    return { success: false, error: "Media item not found." };
  }
  
  mockMediaItemStore[itemIndex] = { 
    ...mockMediaItemStore[itemIndex], 
    ...updates,
  };
  
  return { success: true, data: mockMediaItemStore[itemIndex] };
}

export async function deleteMediaItemAction(mediaId: string): Promise<ServerActionResponse> {
  console.log('Server Action: deleteMediaItemAction (Mock) for ID', mediaId);
  await new Promise(resolve => setTimeout(resolve, 50));

  const initialLength = mockMediaItemStore.length;
  mockMediaItemStore = mockMediaItemStore.filter(item => item.id !== mediaId);
  
  if (mockMediaItemStore.length === initialLength) {
     return { success: false, error: "Media item not found for deletion." };
  }
  
  return { success: true };
}
