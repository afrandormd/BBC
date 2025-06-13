
'use server';

import type { ArticleItem, ServerActionResponse } from '@/types';

// let mockArticleStore: ArticleItem[] = [];

export async function fetchArticlesAction(): Promise<ServerActionResponse<ArticleItem[]>> {
  console.log('Server Action: fetchArticlesAction');
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate delay
  // return { success: true, data: mockArticleStore };
  return { success: true, data: [] };
}

export async function addArticleAction(
  newArticle: Omit<ArticleItem, 'id' | 'publishedAt'> & { publishedAt?: Date }
): Promise<ServerActionResponse<ArticleItem>> {
  console.log('Server Action: addArticleAction for title', newArticle.title);
  await new Promise(resolve => setTimeout(resolve, 50));

  const articleToSave: ArticleItem = {
    ...newArticle,
    id: crypto.randomUUID(),
    publishedAt: newArticle.publishedAt || new Date(),
    tags: newArticle.tags || [],
  };
  // mockArticleStore.unshift(articleToSave);
  console.log('Server Action: article added successfully for', newArticle.title);
  return { success: true, data: articleToSave };
}

export async function updateArticleAction(
  articleId: string,
  updates: Partial<Omit<ArticleItem, 'id' | 'publishedAt'>>
): Promise<ServerActionResponse<ArticleItem>> {
  console.log('Server Action: updateArticleAction for ID', articleId);
  await new Promise(resolve => setTimeout(resolve, 50));

  // const articleIndex = mockArticleStore.findIndex(a => a.id === articleId);
  // if (articleIndex === -1) {
  //   return { success: false, error: "Article not found." };
  // }
  // mockArticleStore[articleIndex] = { 
  //   ...mockArticleStore[articleIndex], 
  //   ...updates, 
  //   publishedAt: new Date(mockArticleStore[articleIndex].publishedAt) 
  // };
  // return { success: true, data: mockArticleStore[articleIndex] };
   const mockUpdatedArticle: ArticleItem = {
    id: articleId,
    title: updates.title || `Article ${articleId.substring(0,4)}`,
    content: updates.content || `Content for article ${articleId.substring(0,4)}`,
    author: updates.author || 'Default Author',
    category: updates.category || 'Default Category',
    tags: updates.tags || [],
    imageUrl: updates.imageUrl,
    publishedAt: new Date(), // Or fetch existing publishedAt
  };
  return { success: true, data: mockUpdatedArticle };
}

export async function deleteArticleAction(articleId: string): Promise<ServerActionResponse> {
  console.log('Server Action: deleteArticleAction for ID', articleId);
  await new Promise(resolve => setTimeout(resolve, 50));

  // const initialLength = mockArticleStore.length;
  // mockArticleStore = mockArticleStore.filter(a => a.id !== articleId);
  // if (mockArticleStore.length === initialLength) {
  //    return { success: false, error: "Article not found." };
  // }
  console.log('Server Action: article deletion successful for', articleId);
  return { success: true };
}
