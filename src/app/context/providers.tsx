"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";
import { ReactNode } from "react";
import { SidebarProvider } from "../components/sidebar/sidebarConfig";
import { TooltipProvider } from "../components/ui/tooltip/tooltip";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
