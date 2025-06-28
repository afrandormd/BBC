
"use client";

// This component is being refactored.
// Its functionality will be split into:
// - src/components/dashboard/images/ImageManagementClient.tsx
// - src/components/dashboard/testimonials/TestimonialManagementClient.tsx
// - src/components/dashboard/news/NewsManagementClient.tsx
// - src/components/dashboard/articles/ArticleManagementClient.tsx

// This file can be deleted or repurposed if there's common dashboard logic needed.
// For now, we'll leave it, but it won't be directly used by `/dashboard/page.tsx` anymore.

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export function DashboardClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-2">Loading dashboard sections...</p>
      </div>
    );
  }

  // This component will no longer render the main CRUD UIs.
  // They are moved to their respective pages under /dashboard/*
  // This could be a good place for a general "Dashboard Home" content
  // if /dashboard/page.tsx didn't already serve that purpose.
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard Hub</h1>
      <p>Select a management section from the sidebar.</p>
      {/* Or, if this component is meant to be dynamic based on route: */}
      {/* Render specific client components based on path, but this is better handled by Next.js pages */}
    </div>
  );
}
