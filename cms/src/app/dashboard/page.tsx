
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
