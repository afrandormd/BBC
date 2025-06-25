
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar as UiSidebar,
  SidebarHeader as UiSidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayoutDashboard, Image, MessageSquare, User, Settings, LogOut, PanelLeftClose, PanelLeftOpen, BarChart3, Newspaper, FileText } from 'lucide-react'; // Added Newspaper, FileText
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/images', label: 'Image Management', icon: Image },
  { href: '/dashboard/testimonials', label: 'Testimonials', icon: MessageSquare },
  { href: '/dashboard/news', label: 'News Management', icon: Newspaper },
  { href: '/dashboard/articles', label: 'Article Management', icon: FileText },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { type: 'separator' as const },
  { href: '/dashboard/profile', label: 'User Profile', icon: User },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const { setOpenMobile, openMobile, isMobile, state: sidebarState } = useSidebar();

  return (
    <UiSidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r bg-card text-card-foreground"
      sheetTitle="Askhajaya Menu"
    >
      <UiSidebarHeader className="p-2 flex justify-between items-center">
        <Link href="/dashboard" className={cn(
            "flex items-center gap-2",
            isMobile && "hidden",
            "group-data-[collapsible=icon]:group-data-[state=expanded]:inline-flex",
            "group-data-[collapsible=icon]:group-data-[state=collapsed]:w-full group-data-[collapsible=icon]:group-data-[state=collapsed]:justify-center"
            )}>
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
          <span className={cn(
              "text-lg font-semibold",
              "group-data-[collapsible=icon]:group-data-[state=collapsed]:hidden"
            )}>Askhajaya</span>
        </Link>

        {isMobile && (
          <Button variant="ghost" size="icon" onClick={() => setOpenMobile(!openMobile)} className="md:hidden">
              {openMobile ? <PanelLeftClose /> : <PanelLeftOpen />}
          </Button>
        )}
      </UiSidebarHeader>
      <ScrollArea className="flex-1">
        <SidebarContent className="p-2">
          <SidebarMenu>
            {menuItems.map((item, index) =>
              item.type === 'separator' ? (
                <hr key={`sep-${index}`} className="my-2 border-border" />
              ) : (
                item.href && (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href} passHref legacyBehavior>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                        tooltip={item.label}
                      >
                        <a>
                          <item.icon className="h-4 w-4 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                )
              )
            )}
          </SidebarMenu>
        </SidebarContent>
      </ScrollArea>
      <SidebarFooter className="p-2 group/sidebar" data-state={sidebarState}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 text-left p-2 h-8 text-sm",
             (!isMobile && sidebarState === "collapsed") && "w-8 h-8 p-0 justify-center"
          )}
          onClick={logout}
          title="Logout"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className={cn(
            "truncate",
            (!isMobile && sidebarState === "collapsed") && "hidden"
            )}>Logout</span>
        </Button>
      </SidebarFooter>
    </UiSidebar>
  );
}
