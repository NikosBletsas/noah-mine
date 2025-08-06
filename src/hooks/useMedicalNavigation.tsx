import { useNavigate, useOutletContext } from 'react-router-dom';
import { useCallback } from 'react';
import { legacyRouteMapper } from '../router';

// Define the context type for better type safety
interface MedicalAppContext {
  theme: any;
  currentThemeKey: string;
  isMidnightTheme: boolean;
  handleThemeChange: (theme: string) => void;
  showConnectionStatus: boolean;
  setShowConnectionStatus: (show: boolean) => void;
  showConnectivityTest: boolean;
  setShowConnectivityTest: (show: boolean) => void;
}

/**
 * Simple hook για navigation και theme context
 */
export const useMedicalNavigation = () => {
  const navigate = useNavigate();
  
  // Παίρνουμε το context από το App component
  const context = useOutletContext<MedicalAppContext>();

  /**
   * Legacy setCurrentScreen function για backward compatibility
   */
  const setCurrentScreen = useCallback((screenName: string) => {
    const newRoute = legacyRouteMapper[screenName as keyof typeof legacyRouteMapper];
    if (newRoute) {
      navigate(newRoute);
    } else {
      console.warn(`Unknown screen: ${screenName}`);
      navigate('/dashboard');
    }
  }, [navigate]);

  /**
   * Go back function
   */
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    // Legacy compatibility
    setCurrentScreen,
    
    // Navigation
    navigate,
    goBack,
    
    // Context values
    ...context,
  };
};