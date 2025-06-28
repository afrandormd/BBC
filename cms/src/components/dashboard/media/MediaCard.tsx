
"use client";

import NextImage from 'next/image'; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { MediaItem } from '@/types';
import { CalendarDays, Pencil, Trash2, Loader2, Copy, Check } from 'lucide-react'; 
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
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
import type React from 'react';
import { useState } from 'react';

interface MediaCardProps {
  mediaItem: MediaItem;
  onEdit: (item: MediaItem) => void;
  onDelete: (itemId: string) => void;
  isProcessing: boolean;
}

export function MediaCard({ mediaItem, onEdit, onDelete, isProcessing }: MediaCardProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    onDelete(mediaItem.id);
  };

  const handleCopyUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(mediaItem.url)
      .then(() => {
        setCopied(true);
        toast({ title: "URL Copied!", description: "Image URL copied to clipboard." });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        toast({ title: "Copy Failed", description: "Could not copy URL.", variant: "destructive" });
        console.error('Failed to copy URL: ', err);
      });
  };

  return (
    <Card className="overflow-hidden shadow-lg transition-all hover:shadow-xl h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-video bg-muted">
          <NextImage 
            src={mediaItem.url} 
            alt={mediaItem.altText || mediaItem.name}
            layout="fill" 
            objectFit="cover"
            data-ai-hint="library image"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-base mb-1 truncate" title={mediaItem.name}>
            {mediaItem.name}
        </CardTitle>
        {mediaItem.altText && (
            <p className="text-xs text-muted-foreground truncate" title={mediaItem.altText}>
                Alt: {mediaItem.altText}
            </p>
        )}
      </CardContent>
      <CardFooter className="p-3 bg-muted/50 border-t flex flex-col items-start space-y-2">
        <div className="flex items-center text-xs text-muted-foreground w-full justify-between">
          <div className="flex items-center">
            <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
            {mediaItem.uploadedAt ? format(new Date(mediaItem.uploadedAt), "dd MMM yy") : 'N/A'}
          </div>
           <Button variant={copied ? "secondary" : "outline"} size="sm" onClick={handleCopyUrl} className="gap-1 px-2 h-7 text-xs" disabled={isProcessing}>
            {isProcessing ? <Loader2 className="h-3 w-3 animate-spin" /> : (copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />)}
            {copied ? 'Copied!' : 'Copy URL'}
          </Button>
        </div>
        <div className="flex items-center space-x-2 w-full pt-1 border-t border-border/50 mt-1">
          <Button variant="outline" size="sm" onClick={() => onEdit(mediaItem)} className="gap-1 flex-1 h-8" disabled={isProcessing}>
            {isProcessing && <Loader2 className="h-3 w-3 animate-spin" />}
            <Pencil className="h-3 w-3" />
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="gap-1 flex-1 h-8" disabled={isProcessing}>
                {isProcessing && <Loader2 className="h-3 w-3 animate-spin" />}
                <Trash2 className="h-3 w-3" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the media item "{mediaItem.name}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isProcessing}>
                  {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete Media
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
