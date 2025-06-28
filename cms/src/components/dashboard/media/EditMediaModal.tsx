
"use client";

import { useState, useEffect, type FormEvent } from 'react';
import type { MediaItem } from '@/types';
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
import { Loader2, Save, FileText, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NextImage from 'next/image';

interface EditMediaModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  mediaItem: MediaItem | null;
  onSave: (mediaId: string, updates: Partial<Pick<MediaItem, 'name' | 'altText'>>) => void;
  isProcessing: boolean;
}

export function EditMediaModal({ isOpen, onOpenChange, mediaItem, onSave, isProcessing }: EditMediaModalProps) {
  const [name, setName] = useState('');
  const [altText, setAltText] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (mediaItem) {
      setName(mediaItem.name);
      setAltText(mediaItem.altText || '');
    }
  }, [mediaItem]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!mediaItem || isProcessing) return;

    if (!name.trim()) {
        toast({
          title: "Missing Name",
          description: "Media name cannot be empty.",
          variant: "destructive",
        });
        return;
    }
    
    const updates: Partial<Pick<MediaItem, 'name' | 'altText'>> = {};
    if (name !== mediaItem.name) {
        updates.name = name;
    }
    if (altText !== (mediaItem.altText || '')) { // Handle undefined altText case
        updates.altText = altText.trim() || undefined; // Send undefined if empty to clear it
    }

    if (Object.keys(updates).length > 0) {
        onSave(mediaItem.id, updates);
    } else {
        toast({ title: "No Changes", description: "No changes were made to the media details." });
        onOpenChange(false);
    }
  };

  if (!mediaItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && onOpenChange(open)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Media Details</DialogTitle>
          <DialogDescription>
            Update the name and alt text for this media item.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {mediaItem.url && (
            <div className="relative aspect-video w-full rounded-md overflow-hidden border mb-4">
                <NextImage src={mediaItem.url} alt={altText || name} layout="fill" objectFit="contain" />
            </div>
          )}
          <div>
            <Label htmlFor="media-item-name" className="flex items-center mb-1">
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              Media Name
            </Label>
            <Input
              id="media-item-name"
              type="text"
              placeholder="Enter media name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isProcessing}
              required
            />
          </div>
          <div>
            <Label htmlFor="media-item-alt-text" className="flex items-center mb-1">
              <ImageIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              Alt Text (Optional)
            </Label>
            <Textarea
              id="media-item-alt-text"
              placeholder="Describe the image for accessibility"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              rows={3}
              disabled={isProcessing}
            />
          </div>
          <DialogFooter className="sm:justify-end mt-6">
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
