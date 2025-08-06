import React from 'react';
import { Save, ArrowLeft, Settings as SettingsIcon, Wifi, TestTubeDiagonal, HardDrive, Search, Zap } from 'lucide-react';
import { SCREEN_NAMES } from "../../../constants";
import AppHeader from '../Layout/AppHeader';
import FormSection from '../shared/FormSection';
import { LabelledInput, LabelledSelect } from '../shared/FormControls';
import { useMedicalNavigation } from '../../hooks/useMedicalNavigation';

const DeviceManufacturerRow: React.FC<{label: string; idPrefix: string; theme: any}> = ({label, idPrefix, theme}) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 items-end">
        <LabelledSelect label={`${label} Brand`} id={`${idPrefix}-brand`} theme={theme}>
            <option value="">Select Brand</option>
            <option value="contec">Contec</option>
            <option value="omron">Omron</option>
            <option value="choiceMMed">ChoiceMMed</option>
            <option value="other">Other</option>
        </LabelledSelect>
        <label htmlFor={`${idPrefix}-exists`} className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 cursor-pointer mt-2 md:mt-0 md:mb-1.5 sm:md:mb-2.5 lg:mb-3">
            <input type="checkbox" id={`${idPrefix}-exists`} className={`form-checkbox h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded ${theme.inputBorder} text-blue-500 focus:ring-blue-500`} />
            <span className={`${theme.textPrimary} text-xs sm:text-sm md:text-base lg:text-lg`}>{label} Device Exists</span>
        </label>
    </div>
);

const DeviceConfigurationScreen: React.FC = () => { 
  const {
    theme,
    setCurrentScreen,
    isMidnightTheme,
    currentThemeKey,
    handleThemeChange,
    setShowConnectionStatus,
    setShowConnectivityTest
  } = useMedicalNavigation();
  
  const deviceManufacturers = [
    { label: "ECG", idPrefix: "ecg" },
    { label: "Blood Pressure Meter", idPrefix: "bp" },
    { label: "Respirometer", idPrefix: "respirometer" },
    { label: "Glucose/Urine/Cholesterol", idPrefix: "glucose" },
    { label: "Temperature Meter", idPrefix: "temp" },
    { label: "Weight Scale", idPrefix: "weight" },
  ];

  const baseButtonStyles = "justify-center px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-lg text-sm md:text-base lg:text-lg font-medium flex items-center space-x-2 md:space-x-2.5";

  if (!theme) return <div>Loading...</div>;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex flex-col`}>
      <AppHeader 
        theme={theme} 
        title="Device Setup" 
        onBack={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)}
        showThemeButton={true}
        onThemeChange={handleThemeChange}
        isMidnightTheme={isMidnightTheme}
        currentThemeKey={currentThemeKey}
      />

      <div className="flex-grow p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          
          {/* HMS Section */}
          <FormSection title="HMS" theme={theme}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
              <LabelledInput label="Local Address" id="hms-local-address" placeholder="e.g., 192.168.1.100" theme={theme} />
              <LabelledInput label="Local Port" id="hms-local-port" placeholder="e.g., 8080" theme={theme} />
            </div>
            <label htmlFor="hms-device-exists" className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 cursor-pointer mb-4 sm:mb-6 md:mb-7 lg:mb-8">
                <input type="checkbox" id="hms-device-exists" className={`form-checkbox h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded ${theme.inputBorder} text-blue-500 focus:ring-blue-500`} />
                <span className={`${theme.textPrimary} text-xs sm:text-sm md:text-base lg:text-lg`}>HMS Device Exists</span>
            </label>

            {/* HMS Oximeter Subsection */}
            <FormSection title="HMS Oximeter" theme={theme} isSubSection>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                    <LabelledSelect label="Oximeter Brand" id="hms-oximeter-brand" theme={theme}>
                        <option value="">Select Brand</option>
                        <option value="contec">Contec</option>
                        <option value="choiceMMed">ChoiceMMed</option>
                        <option value="other">Other</option>
                    </LabelledSelect>
                    <LabelledSelect label="Port" id="hms-oximeter-port" theme={theme}>
                        <option value="">Select Port</option>
                        <option value="COM1">COM1</option>
                        <option value="COM2">COM2</option>
                        <option value="USB0">USB0</option>
                    </LabelledSelect>
                </div>
                <label htmlFor="hms-oximeter-exists" className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 cursor-pointer my-3 sm:my-4 md:my-5 lg:my-6">
                    <input type="checkbox" id="hms-oximeter-exists" className={`form-checkbox h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded ${theme.inputBorder} text-blue-500 focus:ring-blue-500`} />
                    <span className={`${theme.textPrimary} text-xs sm:text-sm md:text-base lg:text-lg`}>Oximeter Device Exists</span>
                </label>
                
                {/* Action buttons for oximeter */}
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mt-3 sm:mt-4 md:mt-5 lg:mt-6">
                    <button className={`${baseButtonStyles} w-full sm:flex-1 ${
                      currentThemeKey === 'noah' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    }`}>
                        <Search size={16} className="md:size-5 lg:size-6"/>
                        <span>Find All Ports</span>
                    </button>
                    <button className={`${baseButtonStyles} w-full sm:flex-1 ${
                      currentThemeKey === 'noah' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    }`}>
                        <Zap size={16} className="md:size-5 lg:size-6"/>
                        <span>Test Connection</span>
                    </button>
                    <button className={`${baseButtonStyles} w-full sm:flex-1 ${
                      currentThemeKey === 'noah' 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                    }`}>
                        <HardDrive size={16} className="md:size-5 lg:size-6"/>
                        <span>Auto Detect</span>
                    </button>
                </div>
            </FormSection>
          </FormSection>

          {/* Device Manufacturer Section */}
          <FormSection title="Device Manufacturer" theme={theme}>
            <div className="space-y-4 sm:space-y-6 md:space-y-7 lg:space-y-8">
              {deviceManufacturers.map(device => (
                <DeviceManufacturerRow key={device.idPrefix} label={device.label} idPrefix={device.idPrefix} theme={theme} />
              ))}
            </div>
          </FormSection>

          {/* Network & Connectivity Section */}
          <FormSection title="Network & Connectivity" theme={theme}>
             <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3">
                 <button 
                    onClick={() => setShowConnectionStatus && setShowConnectionStatus(true)}
                    className={`${baseButtonStyles} w-full sm:flex-1 ${
                      currentThemeKey === 'noah' 
                        ? `bg-gradient-to-r ${theme.primary} ${theme.textOnAccent}` 
                        : 'bg-gradient-to-r from-violet-500 to-violet-600 text-white'
                    }`}
                    aria-label="Open Network Settings"
                    >
                    <Wifi size={16} className="md:size-5 lg:size-6" />
                    <span>Network Settings</span>
                </button>
                <button 
                    onClick={() => setShowConnectivityTest && setShowConnectivityTest(true)}
                    className={`${baseButtonStyles} w-full sm:flex-1 ${
                      currentThemeKey === 'noah' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    }`}
                    aria-label="Run Connectivity Tests"
                    >
                    <TestTubeDiagonal size={16} className="md:size-5 lg:size-6" />
                    <span>Run Connectivity Tests</span>
                </button>
            </div>
          </FormSection>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className={`sticky bottom-0 left-0 right-0 ${
        currentThemeKey === 'noah' 
          ? `bg-gradient-to-r ${theme.accent}` 
          : 'bg-gradient-to-r from-slate-800 to-slate-900'
      } p-3 md:p-4 lg:p-5 shadow-top z-10 border-t ${isMidnightTheme || currentThemeKey === 'black' ? 'border-gray-600' : 'border-white/10'}`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3">
          <button 
            onClick={() => console.log("Save Device Configuration action")}
            className={`${baseButtonStyles} ${
              currentThemeKey === 'noah' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
            }`}
          >
            <Save size={16} className="md:size-5 lg:size-6" />
            <span>Save</span>
          </button>
          <button
            onClick={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)}
            className={`${baseButtonStyles} ${
              currentThemeKey === 'noah' 
                ? `border ${theme.buttonSecondaryBorder} ${theme.buttonSecondaryText}` 
                : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white'
            }`}
          >
            <ArrowLeft size={16} className="md:size-5 lg:size-6" />
            <span>Return</span>
          </button>
          <button
            onClick={() => setCurrentScreen(SCREEN_NAMES.SETTINGS)}
            className={`${baseButtonStyles} ${
              currentThemeKey === 'noah' 
                ? `border ${theme.buttonSecondaryBorder} ${theme.buttonSecondaryText}` 
                : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white'
            }`}
          >
            <SettingsIcon size={16} className="md:size-5 lg:size-6" />
            <span>Advanced</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceConfigurationScreen;