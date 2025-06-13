
'use server';

import type { TestimonialItem, ServerActionResponse } from '@/types';

// let mockTestimonialStore: TestimonialItem[] = [];

export async function fetchTestimonialsAction(): Promise<ServerActionResponse<TestimonialItem[]>> {
  console.log('Server Action: fetchTestimonialsAction');
  await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay
  // return { success: true, data: mockTestimonialStore };
  return { success: true, data: [] };
}

export async function addTestimonialAction(
  newTestimonial: Omit<TestimonialItem, 'id' | 'createdAt'> & { createdAt?: Date }
): Promise<ServerActionResponse<TestimonialItem>> {
  console.log('Server Action: addTestimonialAction for author', newTestimonial.author);
  await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay

  const testimonialToSave: TestimonialItem = {
    ...newTestimonial,
    id: crypto.randomUUID(),
    createdAt: newTestimonial.createdAt || new Date(),
  };

  // mockTestimonialStore.unshift(testimonialToSave);
  
  console.log('Server Action: testimonial added successfully for', newTestimonial.author);
  return { success: true, data: testimonialToSave };
}

export async function updateTestimonialAction(
  testimonialId: string,
  updates: Pick<TestimonialItem, 'author' | 'quote'>
): Promise<ServerActionResponse<TestimonialItem>> {
  console.log('Server Action: updateTestimonialAction for ID', testimonialId);
  await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay

  // const testimonialIndex = mockTestimonialStore.findIndex(t => t.id === testimonialId);
  // if (testimonialIndex === -1) {
  //   return { success: false, error: "Testimonial not found or not authorized."};
  // }
  // mockTestimonialStore[testimonialIndex] = { ...mockTestimonialStore[testimonialIndex], ...updates, createdAt: new Date(mockTestimonialStore[testimonialIndex].createdAt) };
  // return { success: true, data: mockTestimonialStore[testimonialIndex] };

  const mockUpdatedTestimonial: TestimonialItem = {
    id: testimonialId,
    author: updates.author,
    quote: updates.quote,
    createdAt: new Date(), // Or fetch existing createdAt if only updating
  };
  return { success: true, data: mockUpdatedTestimonial };
}

export async function deleteTestimonialAction(testimonialId: string): Promise<ServerActionResponse> {
  console.log('Server Action: deleteTestimonialAction for ID', testimonialId);
  await new Promise(resolve => setTimeout(resolve, 50)); // Reduced delay

  // const initialLength = mockTestimonialStore.length;
  // mockTestimonialStore = mockTestimonialStore.filter(t => t.id !== testimonialId);
  // if (mockTestimonialStore.length === initialLength) {
  //    return { success: false, error: "Testimonial not found." };
  // }
  
  console.log('Server Action: testimonial deletion successful for', testimonialId);
  return { success: true };
}

