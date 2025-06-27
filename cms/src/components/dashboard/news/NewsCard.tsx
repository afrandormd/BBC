
"use client";

import type React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { NewsItem } from '@/types';
import { CalendarDays, User, Tag, Pencil, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import NextImage from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface NewsCardProps {
  newsItem: NewsItem;
  onEdit: (newsItem: NewsItem) => void;
  onDelete: (newsItemId: string) => void;
  isProcessing: boolean;
}

export function NewsCard({ newsItem, onEdit, onDelete, isProcessing }: NewsCardProps) {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(newsItem.id);
  };

  return (
    <Card className="overflow-hidden shadow-lg h-full flex flex-col">
      {newsItem.imageUrl && (
        <CardHeader className="p-0">
          <div className="relative w-full aspect-video bg-muted">
            <NextImage
              src={newsItem.imageUrl}
              alt={newsItem.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint="news illustration"
            />
          </div>
        </CardHeader>
      )}
      <CardContent className={`p-4 flex-grow ${newsItem.imageUrl ? 'pt-4' : 'pt-6'}`}>
        <CardTitle className="text-xl mb-2">{newsItem.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-1 line-clamp-3" title={newsItem.content}>
          {newsItem.content}
        </CardDescription>
        <div className="text-xs text-muted-foreground space-y-1 mt-3">
          <div className="flex items-center">
            <User className="mr-2 h-3.5 w-3.5" /> Author: {newsItem.author}
          </div>
          <div className="flex items-center">
            <Tag className="mr-2 h-3.5 w-3.5" /> Category: {newsItem.category}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 border-t flex justify-between items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          Published: {newsItem.publishedAt ? format(new Date(newsItem.publishedAt), "MMM dd, yyyy") : 'N/A'}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(newsItem)} className="gap-1" disabled={isProcessing}>
            {isProcessing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Pencil className="h-3 w-3" />}
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="gap-1" disabled={isProcessing}>
                {isProcessing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the news item "{newsItem.title}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isProcessing}>
                  {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete News Item
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
