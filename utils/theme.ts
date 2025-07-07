// utils/theme.ts
import { Platform } from 'react-native';

export const Colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  danger: '#FF3B30',
  light: '#F2F2F7',
  dark: '#1C1C1E',
  text: {
    primary: '#000000',
    secondary: '#666666',
    light: '#999999',
    white: '#FFFFFF',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    dark: '#1C1C1E',
  },
  border: {
    light: '#E5E5EA',
    medium: '#C6C6C8',
    dark: '#38383A',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
};

export const Shadow = Platform.select({
  ios: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
  },
  android: {
    small: { elevation: 2 },
    medium: { elevation: 4 },
    large: { elevation: 8 },
  },
  web: {
    small: {
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    },
    medium: {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
    },
    large: {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
  },
  default: {},
});

export const createTheme = (isDark: boolean = false) => ({
  colors: {
    ...Colors,
    background: {
      ...Colors.background,
      primary: isDark ? Colors.background.dark : Colors.background.primary,
      secondary: isDark ? '#2C2C2E' : Colors.background.secondary,
    },
    text: {
      ...Colors.text,
      primary: isDark ? Colors.text.white : Colors.text.primary,
      secondary: isDark ? '#EBEBF5' : Colors.text.secondary,
    },
    border: {
      ...Colors.border,
      light: isDark ? Colors.border.dark : Colors.border.light,
    },
  },
  spacing: Spacing,
  typography: Typography,
  borderRadius: BorderRadius,
  shadow: Shadow,
  isDark,
});
