import { THEME_KEYS, SCREEN_NAMES, DIAGNOSIS_STEP_KEYS } from './constants';
import React from 'react';

export interface Theme {
  name: string;
  background: string;
  primary: string;
  accent: string;
  card: string;
  icon: string;
  textPrimary: string;
  textSecondary: string;
  textOnAccent: string;
  inputBackground: string;
  inputBorder: string;
  inputPlaceholder: string;
  buttonSecondaryBorder: string;
  buttonSecondaryText: string;
  buttonSecondaryHoverBg: string;
}

export type ThemeKey = typeof THEME_KEYS[number];

export type ScreenName = typeof SCREEN_NAMES[keyof typeof SCREEN_NAMES];

export type DiagnosisStepKey = typeof DIAGNOSIS_STEP_KEYS[number];

export interface AppHeaderProps {
  theme: any;
  title: string;
  onBack: () => void;
  showThemeButton?: boolean;
  onShowThemeSelector?: () => void;
  onThemeChange?: (themeKey: string) => void;
  isMidnightTheme: boolean;
  currentThemeKey?: string;
}

export interface BaseScreenProps {
  theme: any;
  setCurrentScreen: (screen: ScreenName) => void; // Changed from string to ScreenName
  isMidnightTheme: boolean;
  currentThemeKey: string;
  setShowThemeSelector?: (show: boolean) => void;
  onThemeChange?: (themeKey: string) => void;
  setShowConnectionStatus?: (show: boolean) => void;
  setShowConnectivityTest?: (show: boolean) => void;
}

export interface ModalScreenProps { 
  theme: Theme;
  isMidnightTheme: boolean;
  currentThemeKey: ThemeKey;
  setCurrentScreen: (screen: ScreenName) => void; 
  onClose: () => void;
  setShowConnectionStatus?: (show: boolean) => void;
  setShowConnectivityTest?: (show: boolean) => void; 
}

export interface DiagnosisStep {
  key: DiagnosisStepKey;
  label: string;
  component: React.FC<DiagnosisFormStepProps>;
}

export interface DiagnosisFormStepProps {
  theme: Theme;
  isMidnightTheme: boolean;
  onFormChange?: () => void;
}

export interface Consultation {
  caseId: string;
  name: string;
  surname: string;
  consultationDate: string;
  details: string;
  doctor: string;
}

export interface Patient {
  id: string;
  name: string;
  surname: string;
  dob: string;
  gender: string;
  ssn: string;
  sid: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalRecordNumber?: string;
  insuranceNumber?: string;
}

export interface OperationButtonProps {
  icon: React.ReactElement<{ className?: string }>; 
  label: string;
  gradient: string;
  borderColor: string;
  textColor: string;
  onClick?: () => void;
  theme: BaseScreenProps['theme']; 
}

export interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  theme: BaseScreenProps['theme'];
}

export interface DeviceTileProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  gradient: string;
  borderColor: string;
  theme: BaseScreenProps['theme'];
  currentThemeKey: string; // Change from ThemeKey to string
}

export interface IconButtonProps {
  icon: React.ReactElement<{ className?: string }>;
  label: string;
  onClick?: () => void;
  theme: BaseScreenProps['theme'];
  bgColorClass: string;
  iconColorClass?: string;
  disabled?: boolean;
}

export interface DashboardTileProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  theme: BaseScreenProps["theme"];
  isMidnightTheme: boolean;
}

export interface AccessPoint {
  name: string;
  signal: number;
}