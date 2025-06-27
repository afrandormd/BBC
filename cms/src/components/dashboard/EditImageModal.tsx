
"use client";

import { useState, useEffect, type FormEvent } from 'react';
import type { ImageItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Loader2, XCircle, Save, FileImage } from 'lucide-react';
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

interface EditImageModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  image: ImageItem | null;
  onSave: (imageId: string, updates: Partial<Pick<ImageItem, 'name' | 'price'>>) => void;
  isProcessing: boolean;
}

export function EditImageModal({ isOpen, onOpenChange, image, onSave, isProcessing }: EditImageModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (image) {
      setName(image.name);
      setPrice(image.price === "Not set" ? '' : image.price);
    }
  }, [image]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!image || isProcessing) return;

    if (!name.trim()) {
        toast({
          title: "Missing Name",
          description: "Image name cannot be empty.",
          variant: "destructive",
        });
        return;
    }

    const numericPrice = price.trim().replace(/[^0-9]/g, ''); 
    const finalPrice = numericPrice === '' ? "Not set" : numericPrice;
    
    const updates: Partial<Pick<ImageItem, 'name' | 'price'>> = {};
    if (name !== image.name) {
        updates.name = name;
    }
    if (finalPrice !== image.price) {
        updates.price = finalPrice;
    }

    if (Object.keys(updates).length > 0) {
        onSave(image.id, updates);
    } else {
        toast({ title: "No Changes", description: "No changes were made to the image details." });
        onOpenChange(false);
    }
  };

  const handleRemovePrice = async () => {
    if (!image || isProcessing) return;
     const updates: Partial<Pick<ImageItem, 'name' | 'price'>> = { price: "Not set" };
     if (name !== image.name) {
        updates.name = name;
     }
    onSave(image.id, updates);
  }

  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && onOpenChange(open)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Image Details</DialogTitle>
          <DialogDescription>
            Update the name and/or price for the image. Price is in IDR.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <Label htmlFor="image-name" className="flex items-center mb-1">
              <FileImage className="mr-2 h-4 w-4 text-muted-foreground" />
              Image Name
            </Label>
            <Input
              id="image-name"
              type="text"
              placeholder="Enter image name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isProcessing}
              required
            />
          </div>
          <div>
            <Label htmlFor="price" className="flex items-center mb-1">
              <span className="mr-2 text-muted-foreground">Rp</span>
              Price (IDR)
            </Label>
            <Input
              id="price"
              type="text" 
              inputMode="numeric"
              placeholder="e.g., 150000"
              value={price}
              disabled={isProcessing}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) { // Allow only digits
                  setPrice(value);
                }
              }}
            />
             <p className="text-xs text-muted-foreground mt-1">Leave blank or enter 0 to mark as "Not set".</p>
          </div>
          <DialogFooter className="sm:justify-between mt-6 flex-col-reverse sm:flex-row gap-2">
            {image.price !== "Not set" && price.trim() !== "" ? ( 
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="destructive" className="w-full sm:w-auto gap-1" disabled={isProcessing}>
                    {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <XCircle className="h-4 w-4" /> Remove Price
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove Price?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will set the price for "{name}" to "Not set". Are you sure?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRemovePrice} disabled={isProcessing}>
                      {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Confirm Removal
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : <div className="hidden sm:block"></div>} 
            
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isProcessing} className="w-full sm:w-auto">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isProcessing} className="w-full sm:w-auto gap-1">
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
