import { useState, useMemo, useCallback } from 'react';
import { THEMES } from "../../constants"
import { ThemeKey } from "../../types";

export const useTheme = (initialTheme: ThemeKey = "noah") => {
  const [currentThemeKey, setCurrentThemeKey] = useState<ThemeKey>(initialTheme);

  const theme = useMemo(() => THEMES[currentThemeKey], [currentThemeKey]);
  const isMidnightTheme = useMemo(() => currentThemeKey === "black", [currentThemeKey]);

  const handleThemeChange = useCallback((themeKey: string) => {
    if (themeKey === "noah" || themeKey === "black") {
      setCurrentThemeKey(themeKey as ThemeKey);
    }
  }, []);

  return {
    theme,
    currentThemeKey,
    isMidnightTheme,
    handleThemeChange,
  } as const;
};