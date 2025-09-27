// App.tsx (Refactored main application)
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { queryClient } from "./config/queryClient";
import { AppKitProvider } from "./context/AppKitContext";
import { AppContent } from "./components/app/AppContent";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Toaster />
          <AppKitProvider>
            <AppContent />
          </AppKitProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

// Re-export the context hook for backwards compatibility
export { useAppKitContext } from "./context/AppKitContext";
