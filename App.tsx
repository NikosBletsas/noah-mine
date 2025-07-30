import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SCREEN_NAMES } from "./constants";
import { useScreenManager } from "./src/hooks/useScreenManager"
import { useTheme } from "./src/hooks/useTheme";
import { AppContent } from "./src/components/Layout/AppContent";

/**
 * Main application component
 */
const App: React.FC = () => {
  // console.log("App component rendering");

  // QueryClient initialization
  const queryClient = React.useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        retry: 2,
        refetchOnWindowFocus: false,
      },
      mutations: { retry: 1 },
    },
  }), []);

  // Custom hooks for state management
  const screenManager = useScreenManager(SCREEN_NAMES.LOGIN);
  const themeManager = useTheme("noah");

  return (
    <QueryClientProvider client={queryClient}>
      <AppContent 
        screenManager={screenManager}
        themeManager={themeManager}
      />
    </QueryClientProvider>
  );
};

export default App;