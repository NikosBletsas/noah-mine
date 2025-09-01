import React, { lazy, Suspense, useMemo } from 'react';
import { SCREEN_NAMES } from "../../../constants";
import ThemeToggle from "../ui/ThemeToggle";

// Lazy load all screens
const LoginScreen = lazy(() => import("../Screens/LoginScreen"));
const DashboardScreen = lazy(() => import("../Screens/DashboardScreen"));
const PatientSearchScreen = lazy(() => import("../Screens/PatientSearchScreen"));
const PatientMonitorScreen = lazy(() => import("../Screens/PatientMonitorScreen"));
const MedicalMeasurementsScreen = lazy(() => import("../Screens/MedicalMeasurementsScreen"));
const SystemOperationsScreen = lazy(() => import("../Screens/SystemOperationsScreen"));
const SpirometerScreen = lazy(() => import("../Screens/SpirometerScreen"));
const EndoscopeScreen = lazy(() => import("../Screens/EndoscopeScreen"));
const SettingsScreen = lazy(() => import("../Screens/SettingsScreen"));
const AssignEmergencyScreen = lazy(() => import("../Screens/AssignEmergencyScreen"));
const EmergencyCaseDiagnosisScreen = lazy(() => import("../Screens/EmergencyCaseDiagnosisScreen"));
const DeviceConfigurationScreen = lazy(() => import("../Screens/DeviceConfigurationScreen"));
const ConnectionStatusScreen = lazy(() => import("../Screens/ConnectionStatusScreen"));
const ConnectivityTestScreen = lazy(() => import("../Screens/ConnectivityTestScreen"));
const ConsultationsScreen = lazy(() => import("../Screens/ConsultationsScreen"));

// Screen registry - O(1) lookup
const SCREEN_REGISTRY = {
  [SCREEN_NAMES.LOGIN]: LoginScreen,
  [SCREEN_NAMES.DASHBOARD]: DashboardScreen,
  [SCREEN_NAMES.PATIENT_SEARCH]: PatientSearchScreen,
  [SCREEN_NAMES.PATIENT_MONITOR]: PatientMonitorScreen,
  [SCREEN_NAMES.MEASUREMENTS]: MedicalMeasurementsScreen,
  [SCREEN_NAMES.SYSTEM_OPERATIONS]: SystemOperationsScreen,
  [SCREEN_NAMES.SPIROMETER]: SpirometerScreen,
  [SCREEN_NAMES.ENDOSCOPE]: EndoscopeScreen,
  [SCREEN_NAMES.SETTINGS]: SettingsScreen,
  [SCREEN_NAMES.ASSIGN_EMERGENCY]: AssignEmergencyScreen,
  [SCREEN_NAMES.EMERGENCY_CASE_DIAGNOSIS]: EmergencyCaseDiagnosisScreen,
  [SCREEN_NAMES.DEVICE_CONFIGURATION]: DeviceConfigurationScreen,
  [SCREEN_NAMES.CASE_CONSULTATIONS]: ConsultationsScreen,
} as const;

// Loading component
const ScreenLoader: React.FC<{ theme: any }> = ({ theme }) => (
  <div className={`flex items-center justify-center min-h-screen ${theme.background}`}>
    <div className="flex flex-col items-center space-y-4">
      <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme.accent}`} />
      <p className={`text-sm ${theme.textPrimary}`}>Loading...</p>
    </div>
  </div>
);

interface AppContentProps {
  screenManager: ReturnType<typeof import('../../hooks/useScreenManager').useScreenManager>;
  themeManager: ReturnType<typeof import('../../hooks/useTheme').useTheme>;
}

export const AppContent: React.FC<AppContentProps> = ({ 
  screenManager, 
  themeManager 
}) => {
  // Environment detection
  const isElectron = useMemo(() => 
    typeof window !== "undefined" &&
    typeof (window as any).process === "object" &&
    (window as any).process?.type === "renderer"
  , []);

  // console.log("Running in Electron:", isElectron);

  const {
    currentScreen,
    showConnectionStatus,
    showConnectivityTest,
    setShowConnectionStatus,
    setShowConnectivityTest,
    handleSetCurrentScreen,
  } = screenManager;

  const {
    theme,
    currentThemeKey,
    isMidnightTheme,
    handleThemeChange,
  } = themeManager;

  // Memoized common props for screens
  const commonScreenProps = useMemo(() => {
    const shouldPassModalSetters =
      currentScreen === SCREEN_NAMES.DEVICE_CONFIGURATION ||
      currentScreen === SCREEN_NAMES.LOGIN;

    return {
      theme,
      setCurrentScreen: handleSetCurrentScreen,
      isMidnightTheme,
      currentThemeKey: currentThemeKey as string,
      onThemeChange: handleThemeChange,
      setShowConnectionStatus: shouldPassModalSetters ? setShowConnectionStatus : undefined,
      setShowConnectivityTest: shouldPassModalSetters ? setShowConnectivityTest : undefined,
    };
  }, [
    theme,
    handleSetCurrentScreen,
    isMidnightTheme,
    currentThemeKey,
    handleThemeChange,
    currentScreen,
    setShowConnectionStatus,
    setShowConnectivityTest,
  ]);

  // Get current screen component - O(1) lookup
  const ScreenComponent = SCREEN_REGISTRY[currentScreen] || SCREEN_REGISTRY[SCREEN_NAMES.LOGIN];

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${theme.background}`}>
      {/* Global Theme Toggle */}
      <ThemeToggle
        currentThemeKey={currentThemeKey}
        onThemeChange={handleThemeChange}
        className="fixed top-4 right-4 z-[60]"
        disabled={false}
      />

      {/* Main screen content with lazy loading */}
      <Suspense fallback={<ScreenLoader theme={theme} />}>
        <ScreenComponent {...commonScreenProps} />
      </Suspense>

      {/* Connection Status Modal */}
      {showConnectionStatus && (
        <Suspense fallback={<div className={`${theme.textPrimary}`}>Loading...</div>}>
          <ConnectionStatusScreen
            theme={theme}
            isMidnightTheme={isMidnightTheme}
            currentThemeKey={currentThemeKey}
            setCurrentScreen={handleSetCurrentScreen}
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
            setCurrentScreen={handleSetCurrentScreen}
            onClose={() => setShowConnectivityTest(false)}
            setShowConnectionStatus={setShowConnectionStatus}
          />
        </Suspense>
      )}
    </div>
  );
};