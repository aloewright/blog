// Shared types for the application

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

export interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

export interface SettingsState {
  notifications: boolean;
  darkMode: boolean;
  location: boolean;
}

// Platform-specific types
export type PlatformType = 'ios' | 'android' | 'web' | 'native';

export interface PlatformStyles {
  ios?: any;
  android?: any;
  web?: any;
  default?: any;
}

// Router types for Expo Router
export interface RouterProps {
  href: string;
  asChild?: boolean;
  replace?: boolean;
  push?: boolean;
}
