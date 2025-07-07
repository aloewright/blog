// hooks/useTheme.ts
import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { createTheme } from '../utils/theme';

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const theme = createTheme(isDarkMode);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return {
    theme,
    isDarkMode,
    toggleTheme,
    setIsDarkMode,
  };
};
