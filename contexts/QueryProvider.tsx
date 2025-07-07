/**
 * React Query Provider
 * Configures React Query with offline support and caching strategies
 */

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Platform, AppState } from 'react-native';
import { API_CONFIG } from '../config/api.config';
import NetInfo from '@react-native-community/netinfo';
import { focusManager, onlineManager } from '@tanstack/react-query';

// Configure React Query to work with React Native's NetInfo for offline support
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(state.isConnected ?? false);
  });
});

// Configure focus manager for React Native
if (Platform.OS !== 'web') {
  focusManager.setEventListener((setFocused) => {
    const subscription = AppState.addEventListener('change', (state) => {
      setFocused(state === 'active');
    });

    return () => subscription.remove();
  });
}

// Create a client with offline-first configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for offline support
      staleTime: API_CONFIG.STALE_TIME,
      gcTime: API_CONFIG.CACHE_TIME, // formerly cacheTime
      
      // Retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < API_CONFIG.RETRY_ATTEMPTS;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Keep previous data while fetching
      keepPreviousData: true,
      
      // Refetch on reconnect
      refetchOnReconnect: true,
      refetchOnWindowFocus: false, // Disable for mobile
      
      // Network mode for offline support
      networkMode: 'offlineFirst',
    },
    mutations: {
      // Retry mutations on failure
      retry: 1,
      networkMode: 'offlineFirst',
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

// Export query client for use in other parts of the app
export { queryClient };
