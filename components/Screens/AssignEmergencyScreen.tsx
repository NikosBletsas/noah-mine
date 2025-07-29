import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Send } from 'lucide-react';
import { BaseScreenProps } from '../../types';
import { SCREEN_NAMES } from '../../constants';
import AppHeader from '../shared/AppHeader';

const AssignEmergencyScreen: React.FC<BaseScreenProps> = ({ 
  theme, 
  setCurrentScreen, 
  isMidnightTheme,
  currentThemeKey,
  setShowThemeSelector 
}) => {
  const [dateTimeValue, setDateTimeValue] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  });

  const tableRows = Array(10).fill(null).map((_, index) => ({
    id: `${index + 1}`,
    availableFrom: '',
    availableUntil: '',
    doctorName: '',
    speciality: '',
    hospital: '',
  }));

  const tableHeaders = ["ID", "Available From", "Available Until", "Doctor Name", "Speciality", "Hospital"];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex flex-col`}>
      <AppHeader 
        theme={theme} 
        title="Assign Emergency" 
        onBack={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)}
        showThemeButton={true}
        onShowThemeSelector={setShowThemeSelector}
        isMidnightTheme={isMidnightTheme}
        currentThemeKey={currentThemeKey}
      />

      <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex-grow">
        <div className={`${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col h-full`}>
          
          {/* Table Section - Full height with proper spacing */}
          <div className="flex-grow mb-6">
            <div className="h-full overflow-hidden border border-gray-300/70 rounded-lg">
              <table className="min-w-full h-full text-sm">
                <thead className="bg-slate-700 text-white">
                  <tr>
                    {tableHeaders.map(header => (
                      <th key={header} className="px-4 py-3 font-semibold text-left whitespace-nowrap border-r border-slate-600 last:border-r-0">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`${theme.card} ${isMidnightTheme ? 'bg-gray-800/60' : 'bg-white'}`}>
                  {tableRows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={`border-b ${isMidnightTheme ? 'border-gray-700' : 'border-gray-200'} ${theme.textPrimary} ${isMidnightTheme ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className={`px-4 py-4 whitespace-nowrap border-r ${isMidnightTheme ? 'border-gray-700' : 'border-gray-200'} font-medium`}>
                        {row.id}
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap border-r ${isMidnightTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                        {row.availableFrom}
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap border-r ${isMidnightTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                        {row.availableUntil}
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap border-r ${isMidnightTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                        {row.doctorName}
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap border-r ${isMidnightTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                        {row.speciality}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {row.hospital}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Date-Time Input Section */}
          <div className="mb-6">
            <label htmlFor="availability-datetime" className={`block text-sm font-medium ${theme.textSecondary} mb-2`}>
              Date - Time to check availability from
            </label>
            <input
              type="datetime-local"
              id="availability-datetime"
              value={dateTimeValue}
              onChange={(e) => setDateTimeValue(e.target.value)}
              className={`w-full max-w-xs px-4 py-3 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base`}
            />
          </div>

          {/* Buttons Section - Horizontal layout like in the image */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Primary button - Send Data */}
            <button 
              className={`flex items-center justify-center space-x-3 bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium text-base`}
            >
              <Send size={20} />
              <span>Send Data to DrTMA</span>
            </button>

            {/* Secondary buttons container */}
            <div className="flex flex-col sm:flex-row gap-4 sm:ml-auto">
              <button 
                className={`flex items-center justify-center space-x-3 bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium text-base`}
              >
                <RefreshCw size={20} />
                <span>Refresh List</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)}
                className={`flex items-center justify-center space-x-3 bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium text-base`}
              >
                <ArrowLeft size={20} />
                <span>Return</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignEmergencyScreen;