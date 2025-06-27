
"use client";

import NextImage from 'next/image'; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ImageItem } from '@/types';
import { CalendarDays, Pencil, Trash2, Loader2 } from 'lucide-react'; 
import { format } from 'date-fns';
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

interface ImageCardProps {
  image: ImageItem;
  onEdit: (image: ImageItem) => void; // Changed from onEditPrice to onEdit
  onDeleteImage: (imageId: string) => void;
  isProcessing: boolean; // To disable buttons during operations
}

function formatPrice(price: string) {
  if (price === "Not set" || price === null || price === undefined) return "Price not set";
  const number = parseFloat(price);
  if (isNaN(number)) return "Invalid price";
  return `Rp ${number.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function ImageCard({ image, onEdit, onDeleteImage, isProcessing }: ImageCardProps) {
  const isPriceSet = image.price && image.price !== "Not set";

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    onDeleteImage(image.id);
  };

  return (
    <Card className="overflow-hidden shadow-lg transition-all hover:shadow-xl h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-[16/10] bg-muted">
          <NextImage 
            src={image.dataUri} 
            alt={image.name} 
            layout="fill" 
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-1 truncate" title={image.name}>{image.name}</CardTitle>
        
        <div className="text-primary font-semibold text-xl mb-2">
            {formatPrice(image.price)}
        </div>
        
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 border-t flex justify-between items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          {image.uploadedAt ? format(new Date(image.uploadedAt), "dd MMM yy, HH:mm") : 'N/A'}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(image)} className="gap-1" disabled={isProcessing}>
            {isProcessing && <Loader2 className="h-3 w-3 animate-spin" />}
            <Pencil className="h-3 w-3" />
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="gap-1" disabled={isProcessing}>
                {isProcessing && <Loader2 className="h-3 w-3 animate-spin" />}
                <Trash2 className="h-3 w-3" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the image "{image.name}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isProcessing}>
                  {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete Image
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
