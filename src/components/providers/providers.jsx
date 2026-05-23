"use client";

import { ThemeProvider } from "next-themes";
import { BackendAuthSync } from "@/components/auth/BackendAuthSync";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BackendAuthSync />
      {children}
    </ThemeProvider>
  );
}
