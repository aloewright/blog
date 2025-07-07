/**
 * GraphQL Client
 * Configuration for GraphQL requests using graphql-request
 */

import { GraphQLClient } from 'graphql-request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../../config/api.config';

// Token storage key (shared with REST API)
const TOKEN_KEY = '@auth_token';

// Create GraphQL client factory
export const createGraphQLClient = async (): Promise<GraphQLClient> => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  
  return new GraphQLClient(API_CONFIG.STRAPI_GRAPHQL_URL, {
    headers: {
      ...(token && { authorization: `Bearer ${token}` }),
    },
    timeout: API_CONFIG.TIMEOUT,
  });
};

// Singleton client for non-authenticated requests
export const graphQLClient = new GraphQLClient(API_CONFIG.STRAPI_GRAPHQL_URL, {
  timeout: API_CONFIG.TIMEOUT,
});

// Helper function to make authenticated GraphQL requests
export const makeGraphQLRequest = async <T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> => {
  const client = await createGraphQLClient();
  try {
    return await client.request<T>(query, variables);
  } catch (error) {
    // Handle GraphQL errors
    if (error.response?.errors) {
      const message = error.response.errors[0]?.message || 'GraphQL Error';
      throw new Error(message);
    }
    throw error;
  }
};
