
"use client";

import { useState, useEffect, type FormEvent } from 'react';
import type { ProductItem } from '@/types';
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
import { Loader2, Save, Type, DollarSign, AlignLeft, Tag, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NextImage from 'next/image';

interface EditProductModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  product: ProductItem | null;
  onSave: (productId: string, updates: Partial<Omit<ProductItem, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  isProcessing: boolean;
}

export function EditProductModal({ isOpen, onOpenChange, product, onSave, isProcessing }: EditProductModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(String(product.price));
      setDescription(product.description || '');
      setCategory(product.category);
      setImage(product.image);
    }
  }, [product]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!product || isProcessing) return;

    if (!name.trim() || !price.trim() || !category.trim() || !image.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in name, price, category, and image URL.",
        variant: "destructive",
      });
      return;
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid positive number for the price.",
        variant: "destructive",
      });
      return;
    }
     try {
      new URL(image); // Validate URL
    } catch (_) {
      toast({
        title: "Invalid Image URL",
        description: "Please enter a valid URL for the product image.",
        variant: "destructive",
      });
      return;
    }

    const updates: Partial<Omit<ProductItem, 'id' | 'createdAt' | 'updatedAt'>> = {
      name,
      price: parsedPrice,
      description: description.trim() || null,
      category,
      image,
    };
    
    onSave(String(product.id), updates);
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && onOpenChange(open)}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the details for "{product.name}".
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <Label htmlFor="edit-product-name" className="flex items-center mb-1">
                <Type className="mr-2 h-4 w-4 text-muted-foreground" /> Product Name
            </Label>
            <Input id="edit-product-name" value={name} onChange={(e) => setName(e.target.value)} disabled={isProcessing} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-product-price" className="flex items-center mb-1">
                  <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Price (IDR)
              </Label>
              <Input id="edit-product-price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} disabled={isProcessing} required min="0" step="100" />
            </div>
            <div>
              <Label htmlFor="edit-product-category" className="flex items-center mb-1">
                  <Tag className="mr-2 h-4 w-4 text-muted-foreground" /> Category
              </Label>
              <Input id="edit-product-category" value={category} onChange={(e) => setCategory(e.target.value)} disabled={isProcessing} required />
            </div>
          </div>
          <div>
            <Label htmlFor="edit-product-image-url" className="flex items-center mb-1">
                <LinkIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Image URL
            </Label>
            <Input id="edit-product-image-url" value={image} onChange={(e) => setImage(e.target.value)} disabled={isProcessing} required type="url" />
             {image && (
              <div className="mt-2 relative aspect-video w-full max-w-xs mx-auto rounded-md overflow-hidden border bg-muted">
                <NextImage src={image} alt="Product image preview" layout="fill" objectFit="contain" data-ai-hint="product photo" onError={() => console.warn("Error loading image preview for URL:", image)} />
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="edit-product-description" className="flex items-center mb-1">
                <AlignLeft className="mr-2 h-4 w-4 text-muted-foreground" /> Description (Optional)
            </Label>
            <Textarea id="edit-product-description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} disabled={isProcessing} />
          </div>
          <DialogFooter className="mt-2">
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
