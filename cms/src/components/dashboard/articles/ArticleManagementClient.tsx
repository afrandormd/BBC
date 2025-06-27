
"use client";

import { useState, useEffect } from 'react';
import type { ArticleItem, ServerActionResponse } from '@/types';
import { ArticleForm } from './ArticleForm';
import { ArticleCard } from './ArticleCard';
import { EditArticleModal } from './EditArticleModal';
import { FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchArticlesAction, addArticleAction, updateArticleAction, deleteArticleAction } from '@/app/actions/articles';

export function ArticleManagementClient() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      const response = await fetchArticlesAction();
      if (response.success && response.data) {
        setArticles(response.data.map(item => ({...item, publishedAt: new Date(item.publishedAt)})));
      } else {
        toast({ title: "Error", description: response.error || "Could not load articles.", variant: "destructive" });
      }
      setIsLoading(false);
    };
    loadArticles();
  }, [toast]);

  const handleArticleAdded = async (newArticleDraft: Omit<ArticleItem, 'id' | 'publishedAt'>) => {
    setIsProcessing(true);
    const response = await addArticleAction(newArticleDraft);
    if (response.success && response.data) {
      setArticles(prev => [response.data!, ...prev].sort((a,b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));
      toast({ title: "Article Added", description: `"${response.data.title}" has been successfully added.` });
    } else {
      toast({ title: "Add Error", description: response.error || "Could not add article.", variant: "destructive" });
    }
    setIsProcessing(false);
  };

  const handleOpenEditModal = (article: ArticleItem) => {
    setEditingArticle(article);
    setIsEditModalOpen(true);
  };

  const handleUpdateArticle = async (articleId: string, updates: Partial<Omit<ArticleItem, 'id' | 'publishedAt'>>) => {
    setIsProcessing(true);
    const response = await updateArticleAction(articleId, updates);
    if (response.success && response.data) {
      setArticles(prev => prev.map(item => item.id === articleId ? { ...response.data!, publishedAt: new Date(response.data!.publishedAt) } : item));
      toast({ title: "Article Updated", description: `"${response.data.title}" has been updated.` });
    } else {
      toast({ title: "Update Error", description: response.error || "Could not update article.", variant: "destructive" });
    }
    setIsProcessing(false);
    setIsEditModalOpen(false);
  };

  const handleDeleteArticle = async (articleId: string) => {
    setIsProcessing(true);
    const response = await deleteArticleAction(articleId);
    if (response.success) {
      setArticles(prev => prev.filter(item => item.id !== articleId));
      toast({ title: "Article Deleted", description: "The article has been successfully deleted." });
    } else {
      toast({ title: "Delete Error", description: response.error || "Could not delete article.", variant: "destructive" });
    }
    setIsProcessing(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-2">Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0">
      <h1 className="text-3xl font-bold mb-6">Article Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 lg:sticky lg:top-24">
          <ArticleForm onArticleAdded={handleArticleAdded} isProcessing={isProcessing} />
        </div>
        <div className="lg:col-span-2">
          {articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-lg bg-card">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No Articles Yet</h2>
              <p className="text-muted-foreground">Create your first article using the form.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {articles.map(item => (
                <ArticleCard
                  key={item.id}
                  article={item}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteArticle}
                  isProcessing={isProcessing}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {editingArticle && (
        <EditArticleModal
          isOpen={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          article={editingArticle}
          onSave={handleUpdateArticle}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
}
