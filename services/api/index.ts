/**
 * API Services
 * Export all API services for easy import
 */

import { BaseAPIService } from './base.service';

// Example interfaces for common content types
export interface Article {
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  featured?: boolean;
  author?: any;
  category?: any;
  tags?: any[];
  thumbnail?: any;
}

export interface User {
  username: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  role?: any;
}

export interface Category {
  name: string;
  slug: string;
  description?: string;
  articles?: any[];
}

export interface Tag {
  name: string;
  slug: string;
  articles?: any[];
}

// Create service instances
export const articleService = new BaseAPIService<Article>('/articles');
export const categoryService = new BaseAPIService<Category>('/categories');
export const tagService = new BaseAPIService<Tag>('/tags');

// Auth service with custom methods
class AuthService {
  async login(identifier: string, password: string) {
    const response = await apiClient.post('/auth/local', {
      identifier,
      password,
    });
    
    if (response.data.jwt) {
      await setAuthToken(response.data.jwt);
    }
    
    return response.data;
  }

  async register(username: string, email: string, password: string) {
    const response = await apiClient.post('/auth/local/register', {
      username,
      email,
      password,
    });
    
    if (response.data.jwt) {
      await setAuthToken(response.data.jwt);
    }
    
    return response.data;
  }

  async logout() {
    await clearAuthToken();
  }

  async forgotPassword(email: string) {
    return await apiClient.post('/auth/forgot-password', { email });
  }

  async resetPassword(code: string, password: string, passwordConfirmation: string) {
    return await apiClient.post('/auth/reset-password', {
      code,
      password,
      passwordConfirmation,
    });
  }

  async getMe() {
    return await apiClient.get('/users/me');
  }

  async updateMe(data: Partial<User>) {
    return await apiClient.put('/users/me', data);
  }
}

export const authService = new AuthService();

// Import necessary functions
import { apiClient, setAuthToken, clearAuthToken } from './client';

// Re-export useful types and utilities
export * from './base.service';
export { apiClient, setAuthToken, getAuthToken, clearAuthToken } from './client';
