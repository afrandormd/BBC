
"use client";

import { useState, useEffect } from 'react';
import type { NewsItem, ServerActionResponse } from '@/types';
import { NewsForm } from './NewsForm';
import { NewsCard } from './NewsCard';
import { EditNewsModal } from './EditNewsModal';
import { Newspaper, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchNewsItemsAction, addNewsItemAction, updateNewsItemAction, deleteNewsItemAction } from '@/app/actions/news';

export function NewsManagementClient() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNewsItem, setEditingNewsItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    const loadNewsItems = async () => {
      setIsLoading(true);
      const response = await fetchNewsItemsAction();
      if (response.success && response.data) {
        setNewsItems(response.data.map(item => ({...item, publishedAt: new Date(item.publishedAt)})));
      } else {
        toast({ title: "Error", description: response.error || "Could not load news items.", variant: "destructive" });
      }
      setIsLoading(false);
    };
    loadNewsItems();
  }, [toast]);

  const handleNewsItemAdded = async (newNewsItemDraft: Omit<NewsItem, 'id' | 'publishedAt'>) => {
    setIsProcessing(true);
    const response = await addNewsItemAction(newNewsItemDraft);
    if (response.success && response.data) {
      setNewsItems(prev => [response.data!, ...prev].sort((a,b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));
      toast({ title: "News Item Added", description: `"${response.data.title}" has been successfully added.` });
    } else {
      toast({ title: "Add Error", description: response.error || "Could not add news item.", variant: "destructive" });
    }
    setIsProcessing(false);
  };

  const handleOpenEditModal = (newsItem: NewsItem) => {
    setEditingNewsItem(newsItem);
    setIsEditModalOpen(true);
  };

  const handleUpdateNewsItem = async (newsItemId: string, updates: Partial<Omit<NewsItem, 'id' | 'publishedAt'>>) => {
    setIsProcessing(true);
    const response = await updateNewsItemAction(newsItemId, updates);
    if (response.success && response.data) {
      setNewsItems(prev => prev.map(item => item.id === newsItemId ? { ...response.data!, publishedAt: new Date(response.data!.publishedAt) } : item));
      toast({ title: "News Item Updated", description: `"${response.data.title}" has been updated.` });
    } else {
      toast({ title: "Update Error", description: response.error || "Could not update news item.", variant: "destructive" });
    }
    setIsProcessing(false);
    setIsEditModalOpen(false);
  };

  const handleDeleteNewsItem = async (newsItemId: string) => {
    setIsProcessing(true);
    const response = await deleteNewsItemAction(newsItemId);
    if (response.success) {
      setNewsItems(prev => prev.filter(item => item.id !== newsItemId));
      toast({ title: "News Item Deleted", description: "The news item has been successfully deleted." });
    } else {
      toast({ title: "Delete Error", description: response.error || "Could not delete news item.", variant: "destructive" });
    }
    setIsProcessing(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-2">Loading news items...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0">
      <h1 className="text-3xl font-bold mb-6">News Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 lg:sticky lg:top-24">
          <NewsForm onNewsItemAdded={handleNewsItemAdded} isProcessing={isProcessing} />
        </div>
        <div className="lg:col-span-2">
          {newsItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-lg bg-card">
              <Newspaper className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No News Items Yet</h2>
              <p className="text-muted-foreground">Add your first news item using the form.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {newsItems.map(item => (
                <NewsCard
                  key={item.id}
                  newsItem={item}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteNewsItem}
                  isProcessing={isProcessing}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {editingNewsItem && (
        <EditNewsModal
          isOpen={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          newsItem={editingNewsItem}
          onSave={handleUpdateNewsItem}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
}
