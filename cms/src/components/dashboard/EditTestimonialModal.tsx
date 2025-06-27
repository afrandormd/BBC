
"use client";

import { useState, useEffect, type FormEvent } from 'react';
import type { TestimonialItem } from '@/types';
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
import { Loader2, User, Quote as QuoteIcon, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EditTestimonialModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  testimonial: TestimonialItem | null;
  onSave: (testimonialId: string, newAuthor: string, newQuote: string) => void;
  isProcessing: boolean;
}

export function EditTestimonialModal({ isOpen, onOpenChange, testimonial, onSave, isProcessing }: EditTestimonialModalProps) {
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (testimonial) {
      setAuthor(testimonial.author);
      setQuote(testimonial.quote);
    }
  }, [testimonial]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!testimonial || isProcessing) return;

    if (!author.trim() || !quote.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both author and quote.",
        variant: "destructive",
      });
      return;
    }
    
    onSave(testimonial.id, author, quote);
    // Parent handles toast and closing modal
  };

  if (!testimonial) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isProcessing && onOpenChange(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Testimonial</DialogTitle>
          <DialogDescription>
            Update the author and quote for this testimonial. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <Label htmlFor="edit-author" className="flex items-center mb-1">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
              Author
            </Label>
            <Input
              id="edit-author"
              type="text"
              placeholder="e.g., Jane Doe"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              disabled={isProcessing}
            />
          </div>
          <div>
            <Label htmlFor="edit-quote" className="flex items-center mb-1">
                <QuoteIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              Quote
            </Label>
            <Textarea
              id="edit-quote"
              placeholder="Enter the testimonial content here..."
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              required
              rows={4}
              disabled={isProcessing}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isProcessing}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
