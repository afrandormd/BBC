
"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { TestimonialItem } from '@/types';
import { MessageSquare, Loader2, User, Quote as QuoteIcon } from 'lucide-react';

interface TestimonialFormProps {
  onTestimonialAdded: (testimonialDraft: Omit<TestimonialItem, 'id' | 'createdAt'>) => void;
  isProcessing: boolean;
}

export function TestimonialForm({ onTestimonialAdded, isProcessing }: TestimonialFormProps) {
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!author.trim() || !quote.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both author and quote for the testimonial.",
        variant: "destructive",
      });
      return;
    }

    // ID and createdAt will be set by server/action
    const newTestimonialDraft: Omit<TestimonialItem, 'id' | 'createdAt'> = {
      author,
      quote,
    };

    onTestimonialAdded(newTestimonialDraft);
    // Toast for successful add is handled by parent component
    setAuthor('');
    setQuote('');
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <MessageSquare className="mr-3 h-7 w-7 text-primary" />
          Add New Testimonial
        </CardTitle>
        <CardDescription>Share a new customer testimonial.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="author" className="flex items-center mb-1">
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              Author
            </Label>
            <Input
              id="author"
              type="text"
              placeholder="e.g., Jane Doe"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              disabled={isProcessing}
            />
          </div>
          <div>
            <Label htmlFor="quote" className="flex items-center mb-1">
                <QuoteIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              Quote
            </Label>
            <Textarea
              id="quote"
              placeholder="Enter the testimonial content here..."
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              required
              rows={4}
              disabled={isProcessing}
            />
          </div>
          <Button type="submit" className="w-full text-base py-3" disabled={isProcessing}>
            {isProcessing ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <MessageSquare className="mr-2 h-5 w-5" />
            )}
            {isProcessing ? 'Adding...' : 'Add Testimonial'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
