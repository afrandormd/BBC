
"use client";

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, UserCircle, PanelLeft, Menu, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';

export function AppHeader() {
  const { user, logout } = useAuth();
  const { isMobile, setOpenMobile, openMobile } = useSidebar();

  const displayName = user?.name || "User";
  const userEmail = user?.email || "user@example.com";
  // API role is uppercase, so we just format it nicely.
  const userRole = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase() : "N/A";
  
  const getAvatarFallback = () => {
    if (user?.name && user.name.length >= 2) {
      return user.name.substring(0, 2).toUpperCase();
    }
    if (user?.name && user.name.length === 1) {
      return user.name.toUpperCase();
    }
    return "XX";
  };
  const avatarFallback = getAvatarFallback();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 px-4 shadow-sm backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-2">
        {isMobile ? (
           <Button variant="ghost" size="icon" onClick={() => setOpenMobile(!openMobile)} className="md:hidden">
             <Menu className="h-6 w-6" />
           </Button>
        ) : (
          <SidebarTrigger className="hidden md:flex" />
        )}
         <Link href="/dashboard" className="flex items-center gap-2 md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
            <span className="text-xl font-semibold text-foreground">Askhajaya</span>
        </Link>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {userEmail}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled className="focus:bg-transparent">
            <ShieldAlert className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Role:</span>
            <Badge variant="secondary" className="ml-auto">{userRole}</Badge>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Link href="/dashboard/profile" passHref>
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard/settings" passHref>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive focus:bg-destructive/10">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
