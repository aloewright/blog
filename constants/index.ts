// constants/index.ts
import { Platform, Dimensions } from 'react-native';

export const APP_CONFIG = {
  name: 'Expo Next.js App',
  version: '1.0.0',
  description: 'A cross-platform app built with Expo Router and React Navigation',
};

export const PLATFORM = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  isWeb: Platform.OS === 'web',
  isNative: Platform.OS !== 'web',
};

export const SCREEN_DIMENSIONS = Dimensions.get('window');

export const LAYOUT = {
  headerHeight: Platform.select({
    ios: 44,
    android: 56,
    web: 64,
    default: 56,
  }),
  tabBarHeight: Platform.select({
    ios: 49,
    android: 56,
    web: 60,
    default: 56,
  }),
  statusBarHeight: Platform.select({
    ios: 20,
    android: 24,
    web: 0,
    default: 20,
  }),
};

export const API_ENDPOINTS = {
  base: 'https://api.example.com',
  users: '/users',
  posts: '/posts',
  comments: '/comments',
};

export const STORAGE_KEYS = {
  userToken: '@user_token',
  userPreferences: '@user_preferences',
  appSettings: '@app_settings',
  themeMode: '@theme_mode',
};

export const ROUTES = {
  home: '/',
  about: '/about',
  tabs: '/(tabs)',
  tabsHome: '/(tabs)/home',
  tabsProfile: '/(tabs)/profile',
  tabsSettings: '/(tabs)/settings',
};

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

export const DEBOUNCE_DELAY = {
  search: 300,
  input: 500,
  api: 1000,
};

export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  server: 'Server error. Please try again later.',
  validation: 'Please check your input.',
  unauthorized: 'You are not authorized to perform this action.',
  notFound: 'The requested resource was not found.',
  generic: 'Something went wrong. Please try again.',
};
