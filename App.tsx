import React, { useState, lazy, Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "./src/hooks/useTheme";
import ThemeToggle from './src/components/ui/ThemeToggle';
import { legacyRouteMapper } from "./src/router";
import { SCREEN_NAMES } from "../constants";

// Lazy load modals
const ConnectionStatusScreen = lazy(() => import("./src/components/Screens/ConnectionStatusScreen"));
const ConnectivityTestScreen = lazy(() => import("./src/components/Screens/ConnectivityTestScreen"));


// Main App component με React Router

const App: React.FC = () => {
  // QueryClient
  const queryClient = React.useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
      },
      mutations: { retry: 1 },
    },
  }), []);

  // Theme management
  const { theme, currentThemeKey, isMidnightTheme, handleThemeChange } = useTheme("noah");

  // Modal state management (from old useScreenManager)
  const [showConnectionStatus, setShowConnectionStatus] = useState(false);
  const [showConnectivityTest, setShowConnectivityTest] = useState(false);

  // Router navigation for modals that need it
  const navigate = useNavigate();
  const setCurrentScreen = (screenName: string) => {
    const newRoute = legacyRouteMapper[screenName as keyof typeof legacyRouteMapper];
    if (newRoute) {
      navigate(newRoute);
    } else {
      console.warn(`Unknown screen: ${screenName}`);
      navigate('/dashboard');
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`relative min-h-screen bg-gradient-to-br ${theme.background}`}>
        {/* Global Theme Toggle */}
        <ThemeToggle
          currentThemeKey={currentThemeKey}
          onThemeChange={handleThemeChange}
          className="fixed top-4 right-4 z-[60]"
          disabled={false}
        />

        {/* Router Outlet - renders current route */}
        <Outlet context={{ 
          theme, 
          currentThemeKey, 
          isMidnightTheme, 
          handleThemeChange,
          showConnectionStatus,
          setShowConnectionStatus,
          showConnectivityTest,
          setShowConnectivityTest
        }} />

        {/* Connection Status Modal */}
        {showConnectionStatus && (
          <Suspense fallback={<div className={`${theme.textPrimary}`}>Loading...</div>}>
            <ConnectionStatusScreen
              theme={theme}
              isMidnightTheme={isMidnightTheme}
              currentThemeKey={currentThemeKey}
              setCurrentScreen={setCurrentScreen}
              onClose={() => setShowConnectionStatus(false)}
              setShowConnectivityTest={setShowConnectivityTest}
            />
          </Suspense>
        )}

        {/* Connectivity Test Modal */}
        {showConnectivityTest && (
          <Suspense fallback={<div className={`${theme.textPrimary}`}>Loading...</div>}>
            <ConnectivityTestScreen
              theme={theme}
              isMidnightTheme={isMidnightTheme}
              currentThemeKey={currentThemeKey}
              setCurrentScreen={setCurrentScreen}
              onClose={() => setShowConnectivityTest(false)}
              setShowConnectionStatus={setShowConnectionStatus}
            />
          </Suspense>
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;