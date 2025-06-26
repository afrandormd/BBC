
"use client";

import type React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ArticleItem } from '@/types';
import { CalendarDays, User, Tag, Pencil, Trash2, Loader2, Image as ImageIcon, CheckSquare } from 'lucide-react';
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

interface ArticleCardProps {
  article: ArticleItem;
  onEdit: (article: ArticleItem) => void;
  onDelete: (articleId: string) => void;
  isProcessing: boolean;
}

export function ArticleCard({ article, onEdit, onDelete, isProcessing }: ArticleCardProps) {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(article.id);
  };

  return (
    <Card className="overflow-hidden shadow-lg h-full flex flex-col">
      {article.imageUrl && (
        <CardHeader className="p-0">
          <div className="relative w-full aspect-video bg-muted">
            <NextImage
              src={article.imageUrl}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint="article illustration"
            />
          </div>
        </CardHeader>
      )}
      <CardContent className={`p-4 flex-grow ${article.imageUrl ? 'pt-4' : 'pt-6'}`}>
        <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-4" title={article.content}>
          {article.content.substring(0, 200)}{article.content.length > 200 ? "..." : ""}
        </CardDescription>
        <div className="text-xs text-muted-foreground space-y-1 mt-2">
          <div className="flex items-center">
            <User className="mr-2 h-3.5 w-3.5" /> Author: {article.author}
          </div>
          <div className="flex items-center">
            <Tag className="mr-2 h-3.5 w-3.5" /> Category: {article.category}
          </div>
          {article.tags && article.tags.length > 0 && (
            <div className="flex items-start pt-1">
              <CheckSquare className="mr-2 h-3.5 w-3.5 mt-0.5 shrink-0" />
              <div className="flex flex-wrap gap-1">
                {article.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 border-t flex justify-between items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          Published: {article.publishedAt ? format(new Date(article.publishedAt), "MMM dd, yyyy") : 'N/A'}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(article)} className="gap-1" disabled={isProcessing}>
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
                  This action cannot be undone. This will permanently delete the article "{article.title}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isProcessing}>
                  {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete Article
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
