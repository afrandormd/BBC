
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Image, MessageSquare, Loader2, Newspaper, FileText, Users, Eye, Link2 } from "lucide-react";
import type { ServerActionResponse, ImageItem, TestimonialItem, NewsItem, ArticleItem } from '@/types';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, LineChart as RechartsLineChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchImagesAction } from '@/app/actions/images';
import { fetchTestimonialsAction } from '@/app/actions/testimonials';
import { fetchNewsItemsAction } from '@/app/actions/news';
import { fetchArticlesAction } from '@/app/actions/articles';
import { useToast } from '@/hooks/use-toast';

interface StatData {
  images: number | null;
  testimonials: number | null;
  news: number | null;
  articles: number | null;
}

// Mock data for advanced analytics
const mockTrafficData = [
  { date: 'Mon', visits: Math.floor(Math.random() * 500) + 200 },
  { date: 'Tue', visits: Math.floor(Math.random() * 500) + 250 },
  { date: 'Wed', visits: Math.floor(Math.random() * 500) + 300 },
  { date: 'Thu', visits: Math.floor(Math.random() * 500) + 280 },
  { date: 'Fri', visits: Math.floor(Math.random() * 500) + 400 },
  { date: 'Sat', visits: Math.floor(Math.random() * 500) + 600 },
  { date: 'Sun', visits: Math.floor(Math.random() * 500) + 550 },
];

const mockContentViews = [
  { contentName: 'Introduction to Next.js', views: Math.floor(Math.random() * 1000) + 500, type: 'Article' },
  { contentName: 'Summer Collection Launch', views: Math.floor(Math.random() * 800) + 400, type: 'News' },
  { contentName: 'Product Showcase Video', views: Math.floor(Math.random() * 1200) + 600, type: 'Image' },
  { contentName: 'Advanced Tailwind Techniques', views: Math.floor(Math.random() * 700) + 300, type: 'Article' },
  { contentName: 'Community Meetup Highlights', views: Math.floor(Math.random() * 600) + 250, type: 'News' },
];

const mockReferralSources = [
  { source: 'Google', count: Math.floor(Math.random() * 2000) + 1000, change: `+${(Math.random() * 5 + 1).toFixed(1)}%` },
  { source: 'Twitter / X', count: Math.floor(Math.random() * 1000) + 500, change: `-${(Math.random() * 3 + 0.5).toFixed(1)}%` },
  { source: 'Direct', count: Math.floor(Math.random() * 800) + 400, change: `+${(Math.random() * 2 + 0.5).toFixed(1)}%` },
  { source: 'Facebook', count: Math.floor(Math.random() * 500) + 200, change: `+${(Math.random() * 1 + 0.2).toFixed(1)}%` },
  { source: 'LinkedIn', count: Math.floor(Math.random() * 300) + 100, change: `-${(Math.random() * 4 + 1).toFixed(1)}%` },
];


export function AnalyticsClient() {
  const [stats, setStats] = useState<StatData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // States for advanced analytics data (populated by mock data for now)
  const [trafficData, setTrafficData] = useState<typeof mockTrafficData>([]);
  const [contentViews, setContentViews] = useState<typeof mockContentViews>([]);
  const [referralSources, setReferralSources] = useState<typeof mockReferralSources>([]);


  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const [imagesRes, testimonialsRes, newsRes, articlesRes] = await Promise.all([
          fetchImagesAction(),
          fetchTestimonialsAction(),
          fetchNewsItemsAction(),
          fetchArticlesAction(),
        ]);
        
        setStats({
          images: (imagesRes.success && imagesRes.data) ? imagesRes.data.length : 0,
          testimonials: (testimonialsRes.success && testimonialsRes.data) ? testimonialsRes.data.length : 0,
          news: (newsRes.success && newsRes.data) ? newsRes.data.length : 0,
          articles: (articlesRes.success && articlesRes.data) ? articlesRes.data.length : 0,
        });

        // Simulate fetching advanced analytics data
        setTrafficData(mockTrafficData);
        setContentViews(mockContentViews.sort((a, b) => b.views - a.views)); // Sort by views
        setReferralSources(mockReferralSources.sort((a,b) => b.count - a.count));

        if (!imagesRes.success) console.error("Error fetching images for analytics:", imagesRes.error);
        if (!testimonialsRes.success) console.error("Error fetching testimonials for analytics:", testimonialsRes.error);
        if (!newsRes.success) console.error("Error fetching news for analytics:", newsRes.error);
        if (!articlesRes.success) console.error("Error fetching articles for analytics:", articlesRes.error);

      } catch (error) {
        console.error("Error loading stats from server actions for analytics:", error);
        toast({ title: "Analytics Error", description: "Could not load content statistics for analytics.", variant: "destructive" });
        setStats({ images: 0, testimonials: 0, news: 0, articles: 0 });
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [toast]);

  const contentCountChartData = stats ? [
    { name: 'Images', count: stats.images ?? 0, fill: "hsl(var(--chart-1))" },
    { name: 'Testimonials', count: stats.testimonials ?? 0, fill: "hsl(var(--chart-2))" },
    { name: 'News', count: stats.news ?? 0, fill: "hsl(var(--chart-3))" },
    { name: 'Articles', count: stats.articles ?? 0, fill: "hsl(var(--chart-4))" },
  ] : [];

  const contentCountChartConfig = {
    count: { label: "Total Items" },
    images: { label: "Images", color: "hsl(var(--chart-1))" },
    testimonials: { label: "Testimonials", color: "hsl(var(--chart-2))" },
    news: { label: "News", color: "hsl(var(--chart-3))" },
    articles: { label: "Articles", color: "hsl(var(--chart-4))" },
  } satisfies Parameters<typeof ChartContainer>[0]["config"];

  const trafficChartConfig = {
    visits: { label: "Visits", color: "hsl(var(--chart-1))" },
  } satisfies Parameters<typeof ChartContainer>[0]["config"];


  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">Content Analytics</CardTitle>
          </div>
          <CardDescription>Overview of your application's content and engagement statistics. Data is sourced via server actions and mock placeholders.</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Counts Summary</CardTitle>
          <CardDescription>A snapshot of your current content totals.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {isLoading || !stats ? (
            <>
              <StatDisplayCard title="Total Images" icon={Image} valueContent={<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />} />
              <StatDisplayCard title="Total Testimonials" icon={MessageSquare} valueContent={<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />} />
              <StatDisplayCard title="Total News" icon={Newspaper} valueContent={<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />} />
              <StatDisplayCard title="Total Articles" icon={FileText} valueContent={<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />} />
            </>
          ) : (
            <>
              <StatDisplayCard title="Total Images" icon={Image} value={stats.images?.toString() ?? "0"} />
              <StatDisplayCard title="Total Testimonials" icon={MessageSquare} value={stats.testimonials?.toString() ?? "0"} />
              <StatDisplayCard title="Total News" icon={Newspaper} value={stats.news?.toString() ?? "0"} />
              <StatDisplayCard title="Total Articles" icon={FileText} value={stats.articles?.toString() ?? "0"} />
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Distribution</CardTitle>
          <CardDescription>Visual breakdown of content types.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-72">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : contentCountChartData.length > 0 ? (
            <ChartContainer config={contentCountChartConfig} className="min-h-[300px] w-full">
              <RechartsBarChart data={contentCountChartData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis allowDecimals={false} tickMargin={10} axisLine={false} tickLine={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="count" radius={4} />
              </RechartsBarChart>
            </ChartContainer>
          ) : (
            <p className="text-center text-muted-foreground py-10">No data available to display chart.</p>
          )}
        </CardContent>
      </Card>
      
      {/* Advanced Analytics Sections */}
      <Card className="mt-8">
        <CardHeader>
            <div className="flex items-center space-x-3 mb-1">
                <Users className="h-7 w-7 text-primary" />
                <CardTitle className="text-xl">User Traffic Trends (Last 7 Days)</CardTitle>
            </div>
            <CardDescription>Mock data representing website visits. In a real app, this would come from an analytics service.</CardDescription>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                <div className="flex justify-center items-center h-60">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            ) : trafficData.length > 0 ? (
                 <ChartContainer config={trafficChartConfig} className="min-h-[250px] w-full">
                    <RechartsLineChart
                        data={trafficData}
                        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                        accessibilityLayer
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} allowDecimals={false}/>
                        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                        <Line type="monotone" dataKey="visits" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} activeDot={{r: 6}}/>
                    </RechartsLineChart>
                </ChartContainer>
            ) : (
                <p className="text-center text-muted-foreground py-10">No traffic data available.</p>
            )}
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
            <div className="flex items-center space-x-3 mb-1">
                <Eye className="h-7 w-7 text-primary" />
                <CardTitle className="text-xl">Top Content Views</CardTitle>
            </div>
            <CardDescription>Mock data for most viewed content. Real implementation would require view tracking.</CardDescription>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                 <div className="space-y-3">
                    {[...Array(3)].map((_, i) => 
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                            <div className="w-3/4 h-4 bg-muted rounded animate-pulse"></div>
                            <div className="w-1/5 h-4 bg-muted rounded animate-pulse"></div>
                        </div>
                    )}
                </div>
            ) : contentViews.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Content Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Views</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contentViews.map((item) => (
                        <TableRow key={item.contentName}>
                            <TableCell className="font-medium">{item.contentName}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell className="text-right">{item.views.toLocaleString()}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className="text-center text-muted-foreground py-10">No content view data available.</p>
            )}
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
            <div className="flex items-center space-x-3 mb-1">
                <Link2 className="h-7 w-7 text-primary" />
                <CardTitle className="text-xl">Referral Sources</CardTitle>
            </div>
            <CardDescription>Mock data showing where traffic originates. Real data needs tracking parameters.</CardDescription>
        </CardHeader>
        <CardContent>
             {isLoading ? (
                 <div className="space-y-3">
                    {[...Array(3)].map((_, i) => 
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                            <div className="w-1/3 h-4 bg-muted rounded animate-pulse"></div>
                            <div className="w-1/4 h-4 bg-muted rounded animate-pulse"></div>
                            <div className="w-1/6 h-4 bg-muted rounded animate-pulse"></div>
                        </div>
                    )}
                </div>
            ) : referralSources.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Visitors</TableHead>
                        <TableHead className="text-right">Change</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {referralSources.map((item) => (
                        <TableRow key={item.source}>
                            <TableCell className="font-medium">{item.source}</TableCell>
                            <TableCell className="text-right">{item.count.toLocaleString()}</TableCell>
                            <TableCell className={`text-right font-semibold ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {item.change}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                 <p className="text-center text-muted-foreground py-10">No referral data available.</p>
            )}
        </CardContent>
      </Card>
       <p className="mt-8 text-sm text-muted-foreground text-center">
        Advanced analytics data shown is for demonstration purposes only. A real implementation would require backend integration with an analytics service.
      </p>
    </div>
  );
}


interface StatDisplayCardProps {
  title: string;
  value?: string;
  icon: React.ElementType;
  valueContent?: React.ReactNode;
}
function StatDisplayCard({ title, value, icon: Icon, valueContent }: StatDisplayCardProps) {
  return (
    <Card className="p-4 shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0">
            {valueContent ? <div className="mt-1">{valueContent}</div> : <div className="text-2xl font-bold">{value}</div>}
        </CardContent>
    </Card>
  )
}


    