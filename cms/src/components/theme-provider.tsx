
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Removed the isClient check to allow next-themes to manage FOUC
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
