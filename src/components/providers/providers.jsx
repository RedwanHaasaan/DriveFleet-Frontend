"use client";

import { ThemeProvider } from "next-themes";
import { BackendAuthSync } from "@/components/auth/BackendAuthSync";
import { EntryLoader } from "@/components/loading/EntryLoader";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <EntryLoader>
        <BackendAuthSync />
        {children}
      </EntryLoader>
    </ThemeProvider>
  );
}
