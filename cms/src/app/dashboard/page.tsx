
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Image, MessageSquare, Settings, Loader2, BarChart3, Newspaper, FileText } from "lucide-react";
import type { ServerActionResponse, ImageItem, TestimonialItem, NewsItem, ArticleItem } from '@/types';
import { fetchImagesAction } from '@/app/actions/images';
import { fetchTestimonialsAction } from '@/app/actions/testimonials';
import { fetchNewsItemsAction } from '@/app/actions/news';
import { fetchArticlesAction } from '@/app/actions/articles';
import { useToast } from '@/hooks/use-toast';

export default function DashboardOverviewPage() {
  const [imageCount, setImageCount] = useState<number | null>(null);
  const [testimonialCount, setTestimonialCount] = useState<number | null>(null);
  const [newsCount, setNewsCount] = useState<number | null>(null);
  const [articleCount, setArticleCount] = useState<number | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadStats = async () => {
      setIsLoadingStats(true);
      try {
        const [imagesRes, testimonialsRes, newsRes, articlesRes] = await Promise.all([
          fetchImagesAction(),
          fetchTestimonialsAction(),
          fetchNewsItemsAction(),
          fetchArticlesAction(),
        ]);

        if (imagesRes.success && imagesRes.data) setImageCount(imagesRes.data.length);
        else { setImageCount(0); console.error("Error fetching images:", imagesRes.error); }
        
        if (testimonialsRes.success && testimonialsRes.data) setTestimonialCount(testimonialsRes.data.length);
        else { setTestimonialCount(0); console.error("Error fetching testimonials:", testimonialsRes.error); }

        if (newsRes.success && newsRes.data) setNewsCount(newsRes.data.length);
        else { setNewsCount(0); console.error("Error fetching news items:", newsRes.error); }

        if (articlesRes.success && articlesRes.data) setArticleCount(articlesRes.data.length);
        else { setArticleCount(0); console.error("Error fetching articles:", articlesRes.error); }

      } catch (error) {
        console.error("Error loading stats from server actions:", error);
        toast({ title: "Stat Loading Error", description: "Could not load all content statistics.", variant: "destructive" });
        setImageCount(0);
        setTestimonialCount(0);
        setNewsCount(0);
        setArticleCount(0);
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