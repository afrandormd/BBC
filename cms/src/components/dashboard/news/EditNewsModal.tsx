
"use client";

import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import type { NewsItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Loader2, Save, User, Tag, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NextImage from 'next/image';

interface EditNewsModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  newsItem: NewsItem | null;
  onSave: (newsItemId: string, updates: Partial<Omit<NewsItem, 'id' | 'publishedAt'>>) => void;
  isProcessing: boolean;
}

export function EditNewsModal({ isOpen, onOpenChange, newsItem, onSave, isProcessing }: EditNewsModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(undefined);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (newsItem) {
      setTitle(newsItem.title);
      setContent(newsItem.content);
      setAuthor(newsItem.author);
      setCategory(newsItem.category);
      setCurrentImageUrl(newsItem.imageUrl);
      setNewImageFile(null);
      setNewImagePreview(null);
    }
  }, [newsItem]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Image too large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive",
        });
        setNewImageFile(null);
        setNewImagePreview(null);
        event.target.value = '';
        return;
      }
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setNewImageFile(null);
      setNewImagePreview(null);
    }
  };
  
  const handleRemoveImage = () => {
    setCurrentImageUrl(undefined);
    setNewImageFile(null);
    setNewImagePreview(null);
    const fileInput = document.getElementById('edit-news-image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!newsItem || isProcessing) return;

    if (!title.trim() || !content.trim() || !author.trim() || !category.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const updates: Partial<Omit<NewsItem, 'id' | 'publishedAt'>> = {
      title,
      content,
      author,
      category,
      imageUrl: newImagePreview || currentImageUrl, // Prioritize new image
    };
    
    onSave(newsItem.id, updates);
  };

  if (!newsItem) return null;

  const displayImageUrl = newImagePreview || currentImageUrl;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && onOpenChange(open)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit News Item</DialogTitle>
          <DialogDescription>
            Update the details for "{newsItem.title}". Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <Label htmlFor="edit-news-title">Title</Label>
            <Input id="edit-news-title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isProcessing} required />
          </div>
          <div>
            <Label htmlFor="edit-news-content">Content</Label>
            <Textarea id="edit-news-content" value={content} onChange={(e) => setContent(e.target.value)} rows={5} disabled={isProcessing} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-news-author" className="flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" /> Author
              </Label>
              <Input id="edit-news-author" value={author} onChange={(e) => setAuthor(e.target.value)} disabled={isProcessing} required />
            </div>
            <div>
              <Label htmlFor="edit-news-category" className="flex items-center">
                <Tag className="mr-2 h-4 w-4 text-muted-foreground" /> Category
              </Label>
              <Input id="edit-news-category" value={category} onChange={(e) => setCategory(e.target.value)} disabled={isProcessing} required />
            </div>
          </div>
           <div>
            <Label htmlFor="edit-news-image-upload" className="flex items-center">
              <ImageIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Image (Max 5MB)
            </Label>
            <Input
              id="edit-news-image-upload"
              type="file"
              accept="image/png, image/jpeg, image/gif, image/webp"
              onChange={handleImageChange}
              disabled={isProcessing}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 mb-2"
            />
            {displayImageUrl && (
              <div className="mt-2 space-y-2">
                <div className="relative w-full h-40 rounded-md overflow-hidden border">
                  <NextImage src={displayImageUrl} alt="News image preview" layout="fill" objectFit="cover" />
                </div>
                <Button type="button" variant="outline" size="sm" onClick={handleRemoveImage} disabled={isProcessing}>
                  Remove Image
                </Button>
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isProcessing}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
