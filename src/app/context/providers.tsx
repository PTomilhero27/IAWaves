'use client'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode; 
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}