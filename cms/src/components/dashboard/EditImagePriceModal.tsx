
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
import { Loader2, XCircle } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast'; // Toast is handled by parent
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

interface EditImagePriceModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  image: ImageItem | null;
  onSave: (imageId: string, newPrice: string) => void; // Parent handles async and toast
  isProcessing: boolean;
}

export function EditImagePriceModal({ isOpen, onOpenChange, image, onSave, isProcessing }: EditImagePriceModalProps) {
  const [price, setPrice] = useState('');
  // const { toast } = useToast(); // Parent will handle toast

  useEffect(() => {
    if (image) {
      setPrice(image.price === "Not set" ? '' : image.price);
    }
  }, [image]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!image || isProcessing) return;

    const numericPrice = price.trim().replace(/[^0-9]/g, ''); 
    const finalPrice = numericPrice === '' ? "Not set" : numericPrice;
    
    onSave(image.id, finalPrice); // Parent handles the async logic
    // onOpenChange(false); // Parent might close it after successful save
  };

  const handleRemovePrice = async () => {
    if (!image || isProcessing) return;
    onSave(image.id, "Not set");
    // onOpenChange(false); // Parent might close it
  }

  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && onOpenChange(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Price for {image.name}</DialogTitle>
          <DialogDescription>
            Set or update the price in IDR (e.g., 150000). Leave blank to mark as "Not set".
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
                if (/^\d*$/.test(value)) {
                  setPrice(value);
                }
              }}
            />
          </div>
          <DialogFooter className="sm:justify-between">
            {image.price !== "Not set" && price.trim() !== "" ? ( 
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="destructive" className="gap-1" disabled={isProcessing}>
                    {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <XCircle className="h-4 w-4" /> Remove Price
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove Price?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will set the price for "{image.name}" to "Not set". Are you sure?
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
            ) : <div></div>}
            
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isProcessing}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isProcessing}>
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Price
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
