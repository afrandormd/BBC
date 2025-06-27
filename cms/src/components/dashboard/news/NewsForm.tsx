
"use client";

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { NewsItem } from '@/types';
import { Newspaper, Loader2, User, Tag, Image as ImageIcon } from 'lucide-react';
import NextImage from 'next/image';

interface NewsFormProps {
  onNewsItemAdded: (newsItemDraft: Omit<NewsItem, 'id' | 'publishedAt'>) => void;
  isProcessing: boolean;
}

export function NewsForm({ onNewsItemAdded, isProcessing }: NewsFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit for news images
        toast({
          title: "Image too large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive",
        });
        setImageFile(null);
        setImagePreview(null);
        event.target.value = '';
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim() || !category.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields (title, content, author, category).",
        variant: "destructive",
      });
      return;
    }

    const newNewsItemDraft: Omit<NewsItem, 'id' | 'publishedAt'> = {
      title,
      content,
      author,
      category,
      imageUrl: imagePreview || undefined, // Store data URI or undefined
    };

    onNewsItemAdded(newNewsItemDraft);
    setTitle('');
    setContent('');
    setAuthor('');
    setCategory('');
    setImageFile(null);
    setImagePreview(null);
    // Clear file input
    const fileInput = document.getElementById('news-image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Newspaper className="mr-3 h-7 w-7 text-primary" />
          Add News Item
        </CardTitle>
        <CardDescription>Create and publish a new news item.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="news-title">Title</Label>
            <Input id="news-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="News Title" disabled={isProcessing} required />
          </div>
          <div>
            <Label htmlFor="news-content">Content</Label>
            <Textarea id="news-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="News content..." rows={6} disabled={isProcessing} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="news-author" className="flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" /> Author
              </Label>
              <Input id="news-author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author's Name" disabled={isProcessing} required />
            </div>
            <div>
              <Label htmlFor="news-category" className="flex items-center">
                <Tag className="mr-2 h-4 w-4 text-muted-foreground" /> Category
              </Label>
              <Input id="news-category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Technology" disabled={isProcessing} required />
            </div>
          </div>
          <div>
            <Label htmlFor="news-image-upload" className="flex items-center">
              <ImageIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Optional Image (Max 5MB)
            </Label>
            <Input
              id="news-image-upload"
              type="file"
              accept="image/png, image/jpeg, image/gif, image/webp"
              onChange={handleImageChange}
              disabled={isProcessing}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            {imagePreview && (
              <div className="mt-4 relative w-full h-40 rounded-md overflow-hidden border">
                <NextImage src={imagePreview} alt="News image preview" layout="fill" objectFit="cover" />
              </div>
            )}
          </div>
          <Button type="submit" className="w-full text-base py-3" disabled={isProcessing}>
            {isProcessing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Newspaper className="mr-2 h-5 w-5" />}
            {isProcessing ? 'Adding...' : 'Add News Item'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
