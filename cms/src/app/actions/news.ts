
'use server';

import type { NewsItem, ServerActionResponse } from '@/types';

// let mockNewsStore: NewsItem[] = [];

export async function fetchNewsItemsAction(): Promise<ServerActionResponse<NewsItem[]>> {
  console.log('Server Action: fetchNewsItemsAction');
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate delay
  // For now, return an empty array or some mock data
  // return { success: true, data: mockNewsStore };
  return { success: true, data: [] };
}

export async function addNewsItemAction(
  newNewsItem: Omit<NewsItem, 'id' | 'publishedAt'> & { publishedAt?: Date }
): Promise<ServerActionResponse<NewsItem>> {
  console.log('Server Action: addNewsItemAction for title', newNewsItem.title);
  await new Promise(resolve => setTimeout(resolve, 50));

  const newsItemToSave: NewsItem = {
    ...newNewsItem,
    id: crypto.randomUUID(),
    publishedAt: newNewsItem.publishedAt || new Date(),
  };
  // mockNewsStore.unshift(newsItemToSave);
  console.log('Server Action: news item added successfully for', newNewsItem.title);
  return { success: true, data: newsItemToSave };
}

export async function updateNewsItemAction(
  newsItemId: string,
  updates: Partial<Omit<NewsItem, 'id' | 'publishedAt'>>
): Promise<ServerActionResponse<NewsItem>> {
  console.log('Server Action: updateNewsItemAction for ID', newsItemId);
  await new Promise(resolve => setTimeout(resolve, 50));

  // const newsItemIndex = mockNewsStore.findIndex(n => n.id === newsItemId);
  // if (newsItemIndex === -1) {
  //   return { success: false, error: "News item not found." };
  // }
  // mockNewsStore[newsItemIndex] = { 
  //   ...mockNewsStore[newsItemIndex], 
  //   ...updates, 
  //   publishedAt: new Date(mockNewsStore[newsItemIndex].publishedAt) // Preserve original publish date or update if part of 'updates'
  // };
  // return { success: true, data: mockNewsStore[newsItemIndex] };
  const mockUpdatedNewsItem: NewsItem = {
    id: newsItemId,
    title: updates.title || `Title ${newsItemId.substring(0,4)}`,
    content: updates.content || `Content ${newsItemId.substring(0,4)}`,
    author: updates.author || 'Author',
    category: updates.category || 'General',
    imageUrl: updates.imageUrl,
    publishedAt: new Date(), // Or fetch existing publishedAt
  };
  return { success: true, data: mockUpdatedNewsItem };
}

export async function deleteNewsItemAction(newsItemId: string): Promise<ServerActionResponse> {
  console.log('Server Action: deleteNewsItemAction for ID', newsItemId);
  await new Promise(resolve => setTimeout(resolve, 50));

  // const initialLength = mockNewsStore.length;
  // mockNewsStore = mockNewsStore.filter(n => n.id !== newsItemId);
  // if (mockNewsStore.length === initialLength) {
  //    return { success: false, error: "News item not found." };
  // }
  console.log('Server Action: news item deletion successful for', newsItemId);
  return { success: true };
}
