
"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { TestimonialItem } from '@/types';
import { CalendarDays, Quote as QuoteIcon, User, Pencil, Trash2, Loader2 } from 'lucide-react';
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

interface TestimonialCardProps {
  testimonial: TestimonialItem;
  onEditTestimonial: (testimonial: TestimonialItem) => void;
  onDeleteTestimonial: (testimonialId: string) => void;
  isProcessing: boolean;
}

export function TestimonialCard({ testimonial, onEditTestimonial, onDeleteTestimonial, isProcessing }: TestimonialCardProps) {

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDeleteTestimonial(testimonial.id);
  };

  return (
    <Card className="overflow-hidden shadow-lg h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{testimonial.author}</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onEditTestimonial(testimonial)} className="p-1" disabled={isProcessing}>
                {isProcessing && <Loader2 className="h-4 w-4 animate-spin" />}
                {!isProcessing && <Pencil className="h-4 w-4" />}
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow relative">
        <QuoteIcon className="absolute top-0 left-0 h-8 w-8 text-muted-foreground/30 transform -translate-x-2 -translate-y-2" />
        <p className="text-muted-foreground italic leading-relaxed pl-4 border-l-2 border-primary/50">
          {testimonial.quote}
        </p>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 border-t flex justify-between items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          Added: {testimonial.createdAt ? format(new Date(testimonial.createdAt), "MMM dd, yyyy") : 'N/A'}
        </div>
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
                This action cannot be undone. This will permanently delete the testimonial by "{testimonial.author}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isProcessing}>
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete Testimonial
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
