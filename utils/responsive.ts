import { Dimensions, Platform } from 'react-native';

// Get device dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Breakpoints
export const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Device types
export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Screen size helpers
export const isSmallScreen = screenWidth < breakpoints.sm;
export const isMediumScreen = screenWidth >= breakpoints.sm && screenWidth < breakpoints.md;
export const isLargeScreen = screenWidth >= breakpoints.md && screenWidth < breakpoints.lg;
export const isExtraLargeScreen = screenWidth >= breakpoints.lg;

// Responsive value calculator
export function responsive<T>(values: {
  base?: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}): T {
  const width = screenWidth;
  
  if (width >= breakpoints['2xl'] && values['2xl'] !== undefined) return values['2xl'];
  if (width >= breakpoints.xl && values.xl !== undefined) return values.xl;
  if (width >= breakpoints.lg && values.lg !== undefined) return values.lg;
  if (width >= breakpoints.md && values.md !== undefined) return values.md;
  if (width >= breakpoints.sm && values.sm !== undefined) return values.sm;
  if (width >= breakpoints.xs && values.xs !== undefined) return values.xs;
  
  return values.base!;
}

// Responsive spacing
export const spacing = {
  xs: responsive({ base: 4, sm: 6, md: 8 }),
  sm: responsive({ base: 8, sm: 10, md: 12 }),
  md: responsive({ base: 16, sm: 18, md: 20 }),
  lg: responsive({ base: 24, sm: 28, md: 32 }),
  xl: responsive({ base: 32, sm: 40, md: 48 }),
  '2xl': responsive({ base: 48, sm: 56, md: 64 }),
};

// Responsive font sizes
export const fontSize = {
  xs: responsive({ base: 12, sm: 13, md: 14 }),
  sm: responsive({ base: 14, sm: 15, md: 16 }),
  base: responsive({ base: 16, sm: 17, md: 18 }),
  lg: responsive({ base: 18, sm: 20, md: 22 }),
  xl: responsive({ base: 20, sm: 24, md: 28 }),
  '2xl': responsive({ base: 24, sm: 30, md: 36 }),
  '3xl': responsive({ base: 30, sm: 36, md: 42 }),
  '4xl': responsive({ base: 36, sm: 42, md: 48 }),
};

// Media query hooks
import { useState, useEffect } from 'react';

export function useMediaQuery(query: keyof typeof breakpoints): boolean {
  const [matches, setMatches] = useState(screenWidth >= breakpoints[query]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setMatches(window.width >= breakpoints[query]);
    });

    return () => subscription?.remove();
  }, [query]);

  return matches;
}

// Platform-specific styles
export function platformStyles<T extends Record<string, any>>(styles: {
  common?: T;
  web?: T;
  ios?: T;
  android?: T;
  native?: T;
}): T {
  const platformStyle = Platform.select({
    web: styles.web,
    ios: styles.ios || styles.native,
    android: styles.android || styles.native,
  });

  return {
    ...styles.common,
    ...platformStyle,
  } as T;
}

// Responsive grid columns
export function getGridColumns(containerWidth: number): number {
  if (containerWidth < breakpoints.sm) return 1;
  if (containerWidth < breakpoints.md) return 2;
  if (containerWidth < breakpoints.lg) return 3;
  if (containerWidth < breakpoints.xl) return 4;
  return 6;
}

// Image dimensions calculator
export function calculateImageDimensions(
  containerWidth: number,
  aspectRatio: number = 16 / 9,
  columns: number = 1,
  gap: number = 16
): { width: number; height: number } {
  const totalGap = gap * (columns - 1);
  const width = (containerWidth - totalGap) / columns;
  const height = width / aspectRatio;

  return { width, height };
}

// Orientation helpers
export function useOrientation() {
  const [orientation, setOrientation] = useState(
    screenHeight > screenWidth ? 'portrait' : 'landscape'
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setOrientation(window.height > window.width ? 'portrait' : 'landscape');
    });

    return () => subscription?.remove();
  }, []);

  return orientation;
}

export default {
  breakpoints,
  responsive,
  spacing,
  fontSize,
  useMediaQuery,
  platformStyles,
  getGridColumns,
  calculateImageDimensions,
  useOrientation,
};
