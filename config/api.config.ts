/**
 * API Configuration
 * Central configuration for all API endpoints and settings
 */

// Determine if we're in development or production
const isDevelopment = __DEV__ || process.env.NODE_ENV === 'development';

// API Base URLs
export const API_CONFIG = {
  // Strapi REST API
  STRAPI_BASE_URL: isDevelopment 
    ? 'http://localhost:1337/api' 
    : process.env.EXPO_PUBLIC_STRAPI_URL || 'https://your-production-strapi.com/api',
  
  // Strapi GraphQL endpoint
  STRAPI_GRAPHQL_URL: isDevelopment
    ? 'http://localhost:1337/graphql'
    : process.env.EXPO_PUBLIC_STRAPI_GRAPHQL_URL || 'https://your-production-strapi.com/graphql',
  
  // Upload URL for media
  STRAPI_UPLOAD_URL: isDevelopment
    ? 'http://localhost:1337'
    : process.env.EXPO_PUBLIC_STRAPI_UPLOAD_URL || 'https://your-production-strapi.com',
  
  // API timeout
  TIMEOUT: 30000, // 30 seconds
  
  // Retry configuration
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  
  // Cache configuration
  CACHE_TIME: 5 * 60 * 1000, // 5 minutes
  STALE_TIME: 2 * 60 * 1000, // 2 minutes
};

// Request headers
export const getHeaders = (token?: string | null) => ({
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});

// GraphQL headers
export const getGraphQLHeaders = (token?: string | null) => ({
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});
