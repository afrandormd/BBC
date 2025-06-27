
"use client";

import { useState, useEffect } from 'react';
import type { TestimonialItem, ServerActionResponse } from '@/types';
import { TestimonialForm } from '../TestimonialForm';
import { TestimonialCard } from '../TestimonialCard';
import { EditTestimonialModal } from '../EditTestimonialModal';
import { MessageSquareIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchTestimonialsAction, addTestimonialAction, updateTestimonialAction, deleteTestimonialAction } from '@/app/actions/testimonials';

export function TestimonialManagementClient() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true); // For initial data load
  const [isProcessing, setIsProcessing] = useState(false); // For CUD operations
  const { toast } = useToast();

  const [isEditTestimonialModalOpen, setIsEditTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);

  useEffect(() => {
    const loadTestimonials = async () => {
      setIsLoading(true);
      const response = await fetchTestimonialsAction();
      if (response.success && response.data) {
        setTestimonials(response.data.map(t => ({...t, createdAt: new Date(t.createdAt)})));
      } else {
        toast({ title: "Error", description: response.error || "Could not load testimonials.", variant: "destructive" });
      }
      setIsLoading(false);
    };
    loadTestimonials();
  }, [toast]);

  const handleTestimonialAdded = async (newTestimonialDraft: Omit<TestimonialItem, 'id' | 'createdAt'>) => {
    setIsProcessing(true);
    const response = await addTestimonialAction(newTestimonialDraft);
    if (response.success && response.data) {
      setTestimonials((prev) => [response.data!, ...prev].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      toast({ title: "Testimonial Added", description: `Testimonial by ${response.data.author} has been successfully added.` });
    } else {
      toast({ title: "Add Error", description: response.error || "Could not add testimonial.", variant: "destructive" });
    }
    setIsProcessing(false);
  };

  const handleOpenEditTestimonialModal = (testimonial: TestimonialItem) => {
    setEditingTestimonial(testimonial);
    setIsEditTestimonialModalOpen(true);
  };

  const handleUpdateTestimonial = async (testimonialId: string, newAuthor: string, newQuote: string) => {
    setIsProcessing(true);
    const response = await updateTestimonialAction(testimonialId, { author: newAuthor, quote: newQuote });
    if (response.success && response.data) {
      setTestimonials((prev) =>
        prev.map((item) =>
          item.id === testimonialId ? { ...response.data!, createdAt: new Date(response.data!.createdAt) } : item
        )
      );
      toast({ title: "Testimonial Updated", description: `Testimonial by ${newAuthor} has been updated.` });
    } else {
      toast({ title: "Update Error", description: response.error || "Could not update testimonial.", variant: "destructive" });
    }
    setIsProcessing(false);
    setIsEditTestimonialModalOpen(false);
  };

  const handleDeleteTestimonial = async (testimonialId: string) => {
    setIsProcessing(true);
    const response = await deleteTestimonialAction(testimonialId);
    if (response.success) {
      setTestimonials((prev) => prev.filter((item) => item.id !== testimonialId));
      toast({ title: "Testimonial Deleted", description: "The testimonial has been successfully deleted." });
    } else {
      toast({ title: "Delete Error", description: response.error || "Could not delete testimonial.", variant: "destructive" });
    }
    setIsProcessing(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-2">Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0">
      <h1 className="text-3xl font-bold mb-6">Testimonial Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 lg:sticky lg:top-24">
          <TestimonialForm onTestimonialAdded={handleTestimonialAdded} isProcessing={isProcessing} />
        </div>
        <div className="lg:col-span-2">
          {testimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed rounded-lg bg-card">
              <MessageSquareIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No Testimonials Yet</h2>
              <p className="text-muted-foreground">Add your first testimonial using the form.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard 
                    key={testimonial.id} 
                    testimonial={testimonial} 
                    onEditTestimonial={handleOpenEditTestimonialModal}
                    onDeleteTestimonial={handleDeleteTestimonial}
                    isProcessing={isProcessing}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {editingTestimonial && (
        <EditTestimonialModal
          isOpen={isEditTestimonialModalOpen}
          onOpenChange={setIsEditTestimonialModalOpen}
          testimonial={editingTestimonial}
          onSave={handleUpdateTestimonial}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
}
