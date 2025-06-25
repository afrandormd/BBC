
"use client";

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Laptop } from 'lucide-react';

// Theme type matches next-themes: 'light', 'dark', 'system'
type ThemeValue = string | undefined;

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null to avoid hydration mismatch,
    // as theme state might not be available on initial server render.
    // This also helps prevent FOUC by not rendering the switcher until client-side.
    return (
      <div className="flex items-center space-x-2 rounded-lg bg-muted p-1 w-fit h-[40px]">
        <Button variant="ghost" size="sm" className="rounded-md px-3 py-1.5" disabled>
          <Sun className="mr-2 h-4 w-4" /> Light
        </Button>
        <Button variant="ghost" size="sm" className="rounded-md px-3 py-1.5" disabled>
          <Moon className="mr-2 h-4 w-4" /> Dark
        </Button>
        <Button variant="ghost" size="sm" className="rounded-md px-3 py-1.5" disabled>
          <Laptop className="mr-2 h-4 w-4" /> System
        </Button>
      </div>
    );
  }

  // Determine current effective theme for UI state, defaulting to system if theme is undefined
  const currentUiTheme: ThemeValue = theme || 'system';

  return (
    <div className="flex items-center space-x-2 rounded-lg bg-muted p-1 w-fit">
      <Button
        variant={currentUiTheme === 'light' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('light')}
        className="rounded-md px-3 py-1.5"
        aria-pressed={currentUiTheme === 'light'}
      >
        <Sun className="mr-2 h-4 w-4" />
        Light
      </Button>
      <Button
        variant={currentUiTheme === 'dark' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('dark')}
        className="rounded-md px-3 py-1.5"
        aria-pressed={currentUiTheme === 'dark'}
      >
        <Moon className="mr-2 h-4 w-4" />
        Dark
      </Button>
      <Button
        variant={currentUiTheme === 'system' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setTheme('system')}
        className="rounded-md px-3 py-1.5"
        aria-pressed={currentUiTheme === 'system'}
      >
        <Laptop className="mr-2 h-4 w-4" />
        System (Currently: {resolvedTheme === 'dark' ? 
            <Moon className="ml-1.5 h-3 w-3 inline-block" /> : 
            <Sun className="ml-1.5 h-3 w-3 inline-block" />})
      </Button>
    </div>
  );
}
