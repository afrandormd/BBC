
"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { ProductItem } from '@/types';
import { PackagePlus, Loader2, Type, DollarSign, AlignLeft, Tag, Link as LinkIcon } from 'lucide-react';
import NextImage from 'next/image';

interface ProductFormProps {
  onProductAdded: (productDraft: Omit<ProductItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  isProcessing: boolean;
}

export function ProductForm({ onProductAdded, isProcessing }: ProductFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
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

    const newProductDraft: Omit<ProductItem, 'id' | 'createdAt' | 'updatedAt'> = {
      name,
      price: parsedPrice,
      description: description.trim() || null,
      category,
      image,
    };

    onProductAdded(newProductDraft);
    setName('');
    setPrice('');
    setDescription('');
    setCategory('');
    setImage('');
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <PackagePlus className="mr-3 h-7 w-7 text-primary" />
          Add New Product
        </CardTitle>
        <CardDescription>Enter details for a new product in your catalog.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="product-name" className="flex items-center mb-1">
                <Type className="mr-2 h-4 w-4 text-muted-foreground" /> Product Name
            </Label>
            <Input id="product-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Keripik Pisang Coklat" disabled={isProcessing} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="product-price" className="flex items-center mb-1">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> Price (IDR)
              </Label>
              <Input id="product-price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 15000" disabled={isProcessing} required min="0" step="100" />
            </div>
            <div>
              <Label htmlFor="product-category" className="flex items-center mb-1">
                <Tag className="mr-2 h-4 w-4 text-muted-foreground" /> Category
              </Label>
              <Input id="product-category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Keripik" disabled={isProcessing} required />
            </div>
          </div>
          <div>
            <Label htmlFor="product-image-url" className="flex items-center mb-1">
                <LinkIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Image URL
            </Label>
            <Input id="product-image-url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/image.jpg (Copy from Media Library)" disabled={isProcessing} required type="url" />
             {image && (
              <div className="mt-3 relative aspect-video w-full max-w-xs mx-auto rounded-md overflow-hidden border bg-muted">
                <NextImage src={image} alt="Product image preview" layout="fill" objectFit="contain" data-ai-hint="product photo" onError={() => console.warn("Error loading image preview for URL:", image)} />
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="product-description" className="flex items-center mb-1">
                <AlignLeft className="mr-2 h-4 w-4 text-muted-foreground" /> Description (Optional)
            </Label>
            <Textarea id="product-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Briefly describe the product..." rows={3} disabled={isProcessing} />
          </div>
          
          <Button type="submit" className="w-full text-base py-3 mt-2" disabled={isProcessing}>
            {isProcessing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <PackagePlus className="mr-2 h-5 w-5" />}
            {isProcessing ? 'Adding Product...' : 'Add Product to Catalog'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
