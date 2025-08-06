import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { SCREEN_NAMES } from '../../constants';
import App from '../../App'

// Lazy load όλα τα screens
const LoginScreen = lazy(() => import('../components/Screens/LoginScreen'));
const DashboardScreen = lazy(() => import('../components/Screens/DashboardScreen'));
const PatientSearchScreen = lazy(() => import('../components/Screens/PatientSearchScreen'));
const PatientMonitorScreen = lazy(() => import('../components/Screens/PatientMonitorScreen'));
const MedicalMeasurementsScreen = lazy(() => import('../components/Screens/MedicalMeasurementsScreen'));
const SystemOperationsScreen = lazy(() => import('../components/Screens/SystemOperationsScreen'));
const SpirometerScreen = lazy(() => import('../components/Screens/SpirometerScreen'));
const EndoscopeScreen = lazy(() => import('../components/Screens/EndoscopeScreen'));
const SettingsScreen = lazy(() => import('../components/Screens/SettingsScreen'));
const AssignEmergencyScreen = lazy(() => import('../components/Screens/AssignEmergencyScreen'));
const EmergencyCaseDiagnosisScreen = lazy(() => import('../components/Screens/EmergencyCaseDiagnosisScreen'));
const DeviceConfigurationScreen = lazy(() => import('../components/Screens/DeviceConfigurationScreen'));
const ConsultationsScreen = lazy(() => import('../components/Screens/ConsultationsScreen'));

// Simple loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Router configuration
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Redirect root to login
      { index: true, element: <Navigate to="/login" replace /> },
      
      // All routes με lazy loading
      { path: 'login', element: <Suspense fallback={<Loading />}><LoginScreen /></Suspense> },
      { path: 'dashboard', element: <Suspense fallback={<Loading />}><DashboardScreen /></Suspense> },
      { path: 'patient-search', element: <Suspense fallback={<Loading />}><PatientSearchScreen /></Suspense> },
      { path: 'measurements', element: <Suspense fallback={<Loading />}><MedicalMeasurementsScreen /></Suspense> },
      { path: 'patient-monitor', element: <Suspense fallback={<Loading />}><PatientMonitorScreen /></Suspense> },
      { path: 'system-operations', element: <Suspense fallback={<Loading />}><SystemOperationsScreen /></Suspense> },
      { path: 'spirometer', element: <Suspense fallback={<Loading />}><SpirometerScreen /></Suspense> },
      { path: 'endoscope', element: <Suspense fallback={<Loading />}><EndoscopeScreen /></Suspense> },
      { path: 'settings', element: <Suspense fallback={<Loading />}><SettingsScreen /></Suspense> },
      { path: 'assign-emergency', element: <Suspense fallback={<Loading />}><AssignEmergencyScreen /></Suspense> },
      { path: 'emergency-case-diagnosis', element: <Suspense fallback={<Loading />}><EmergencyCaseDiagnosisScreen /></Suspense> },
      { path: 'device-configuration', element: <Suspense fallback={<Loading />}><DeviceConfigurationScreen /></Suspense> },
      { path: 'consultations', element: <Suspense fallback={<Loading />}><ConsultationsScreen /></Suspense> },
    ],
  },
]);

// Helper για legacy support
export const legacyRouteMapper = {
  [SCREEN_NAMES.LOGIN]: '/login',
  [SCREEN_NAMES.DASHBOARD]: '/dashboard',
  [SCREEN_NAMES.PATIENT_SEARCH]: '/patient-search',
  [SCREEN_NAMES.MEASUREMENTS]: '/measurements',
  [SCREEN_NAMES.PATIENT_MONITOR]: '/patient-monitor',
  [SCREEN_NAMES.SYSTEM_OPERATIONS]: '/system-operations',
  [SCREEN_NAMES.SPIROMETER]: '/spirometer',
  [SCREEN_NAMES.ENDOSCOPE]: '/endoscope',
  [SCREEN_NAMES.SETTINGS]: '/settings',
  [SCREEN_NAMES.ASSIGN_EMERGENCY]: '/assign-emergency',
  [SCREEN_NAMES.EMERGENCY_CASE_DIAGNOSIS]: '/emergency-case-diagnosis',
  [SCREEN_NAMES.DEVICE_CONFIGURATION]: '/device-configuration',
  [SCREEN_NAMES.CASE_CONSULTATIONS]: '/consultations',
};