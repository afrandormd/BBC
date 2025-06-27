
"use client";


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

 
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard Hub</h1>
      <p>Select a management section from the sidebar.</p>
      {/* Or, if this component is meant to be dynamic based on route: */}
      {/* Render specific client components based on path, but this is better handled by Next.js pages */}
    </div>
  );
}
