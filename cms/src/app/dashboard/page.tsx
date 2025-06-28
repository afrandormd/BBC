
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LibraryBig, Settings, Loader2, BarChart3, Package, User } from "lucide-react";
import type { ServerActionResponse, MediaItem, ProductItem } from '@/types';
import { fetchMediaItemsAction } from '@/app/actions/media';
import { fetchProductsAction } from '@/app/actions/products';
import { useToast } from '@/hooks/use-toast';


export default function DashboardOverviewPage() {
  const [mediaCount, setMediaCount] = useState<number | null>(null);
  const [productCount, setProductCount] = useState<number | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadStats = async () => {
      setIsLoadingStats(true);
      try {
        const [mediaRes, productsRes] = await Promise.all([
          fetchMediaItemsAction(),
          fetchProductsAction(),
        ]);

        if (mediaRes.success && mediaRes.data) setMediaCount(mediaRes.data.length);
        else { setMediaCount(0); console.error("Error fetching media items:", mediaRes.error); }
        
        if (productsRes.success && productsRes.data) setProductCount(productsRes.data.length);
        else { setProductCount(0); console.error("Error fetching products:", productsRes.error); }


      } catch (error) {
        console.error("Error loading stats from server actions:", error);
        toast({ title: "Stat Loading Error", description: "Could not load all content statistics.", variant: "destructive" });
        setMediaCount(0);
        setProductCount(0);
      } finally {
        setIsLoadingStats(false);
      }
    };
    loadStats();
  }, [toast]);

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to Askhajaya Dashboard</CardTitle>
          <CardDescription>Manage your application's content and settings from here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Use the sidebar navigation to access different management sections of your application.
            Here are some quick links to get you started:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardLinkCard
              href="/dashboard/media"
              icon={LibraryBig}
              title="Media Library"
              description="Upload, view, and manage your images and media."
            />
            <DashboardLinkCard
              href="/dashboard/products"
              icon={Package}
              title="Product Management"
              description="Manage your product catalog and pricing."
            />
             <DashboardLinkCard
              href="/dashboard/profile"
              icon={User}
              title="User Profile"
              description="Manage your profile information."
            />
             <DashboardLinkCard
              href="/dashboard/settings"
              icon={Settings}
              title="Application Settings"
              description="Configure application preferences."
            />
             <DashboardLinkCard
              href="/dashboard/analytics"
              icon={BarChart3}
              title="Analytics"
              description="View application content statistics."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>A brief overview of your content.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {isLoadingStats ? (
            <>
              <StatCard title="Total Media" valueContent={<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />} />
              <StatCard title="Total Products" valueContent={<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />} />
            </>
          ) : (
            <>
              <StatCard title="Total Media" value={mediaCount !== null ? mediaCount.toString() : "N/A"} />
              <StatCard title="Total Products" value={productCount !== null ? productCount.toString() : "N/A"} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface DashboardLinkCardProps {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  disabled?: boolean;
}

function DashboardLinkCard({ href, icon: Icon, title, description, disabled }: DashboardLinkCardProps) {
  return (
    <Link href={href} passHref legacyBehavior={true}>
      <a className={`block p-1 ${disabled ? 'pointer-events-none' : ''}`}>
        <Card className={`hover:shadow-md transition-shadow h-full ${disabled ? 'opacity-50 bg-muted' : ''}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            <Icon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}

interface StatCardProps {
  title: string;
  value?: string;
  valueContent?: React.ReactNode;
}
function StatCard({ title, value, valueContent }: StatCardProps) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium text-muted-foreground">{title}</p>
      {valueContent ? <div className="mt-1">{valueContent}</div> : <p className="text-2xl font-bold">{value}</p>}
    </Card>
  )
}
