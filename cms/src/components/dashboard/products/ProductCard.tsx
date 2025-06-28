
"use client";

import NextImage from 'next/image'; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ProductItem } from '@/types';
import { CalendarDays, Pencil, Trash2, Loader2, Tag, DollarSign } from 'lucide-react'; 
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

interface ProductCardProps {
  product: ProductItem;
  onEdit: (product: ProductItem) => void;
  onDelete: (productId: string) => void;
  isProcessing: boolean;
}

export function ProductCard({ product, onEdit, onDelete, isProcessing }: ProductCardProps) {

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    onDelete(String(product.id));
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price);

  return (
    <Card className="overflow-hidden shadow-lg transition-all hover:shadow-xl h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative w-full aspect-video bg-muted">
          <NextImage 
            src={product.image || "https://placehold.co/600x400.png?text=No+Image"} 
            alt={product.name}
            layout="fill" 
            objectFit="cover"
            data-ai-hint="product photo"
            onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400.png?text=Error')}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-1 truncate" title={product.name}>
            {product.name}
        </CardTitle>
        <p className="text-xl font-semibold text-primary mb-2">{formattedPrice}</p>
        <div className="flex items-center text-xs text-muted-foreground mb-2">
            <Tag className="mr-1.5 h-3.5 w-3.5" /> Category: {product.category}
        </div>
        {product.description && (
            <CardDescription className="text-xs text-muted-foreground line-clamp-2" title={product.description}>
                {product.description}
            </CardDescription>
        )}
      </CardContent>
      <CardFooter className="p-3 bg-muted/50 border-t flex flex-col items-start space-y-2">
        <div className="flex items-center text-xs text-muted-foreground w-full justify-between">
          <div className="flex items-center">
            <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
            Added: {product.createdAt ? format(new Date(product.createdAt), "dd MMM yy") : 'N/A'}
          </div>
          <div className="text-xs text-muted-foreground">
            Updated: {product.updatedAt ? format(new Date(product.updatedAt), "dd MMM yy") : 'N/A'}
          </div>
        </div>
        <div className="flex items-center space-x-2 w-full pt-1 border-t border-border/50 mt-1">
          <Button variant="outline" size="sm" onClick={() => onEdit(product)} className="gap-1 flex-1 h-8" disabled={isProcessing}>
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
                  This action cannot be undone. This will permanently delete the product "{product.name}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isProcessing}>
                  {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete Product
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
