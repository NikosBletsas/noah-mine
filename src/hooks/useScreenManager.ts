import { useState, useCallback } from 'react';
import { SCREEN_NAMES } from "../../constants"
import { ScreenName } from "../../types";

export const useScreenManager = (initialScreen: ScreenName) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>(initialScreen);
  const [showConnectionStatus, setShowConnectionStatus] = useState(false);
  const [showConnectivityTest, setShowConnectivityTest] = useState(false);

  const handleSetCurrentScreen = useCallback((screen: ScreenName) => {
    if (
      screen !== SCREEN_NAMES.DEVICE_CONFIGURATION &&
      screen !== SCREEN_NAMES.LOGIN
    ) {
      setShowConnectionStatus(false);
      setShowConnectivityTest(false);
    }
    setCurrentScreen(screen);
  }, []);

  return {
    currentScreen,
    showConnectionStatus,
    showConnectivityTest,
    setShowConnectionStatus,
    setShowConnectivityTest,
    handleSetCurrentScreen,
  } as const;
};