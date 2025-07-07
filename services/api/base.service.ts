/**
 * Base API Service
 * Provides common CRUD operations for Strapi collections
 */

import { apiClient } from './client';
import { AxiosRequestConfig } from 'axios';

// Strapi API response types
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T & StrapiAttributes;
}

// Query parameters for Strapi
export interface StrapiQueryParams {
  filters?: Record<string, any>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  populate?: string | string[] | Record<string, any>;
  fields?: string[];
  publicationState?: 'live' | 'preview';
  locale?: string;
}

// Base service class
export class BaseAPIService<T> {
  constructor(protected endpoint: string) {}

  /**
   * Get all items with optional query parameters
   */
  async findAll(params?: StrapiQueryParams): Promise<StrapiResponse<StrapiEntity<T>[]>> {
    const response = await apiClient.get<StrapiResponse<StrapiEntity<T>[]>>(
      this.endpoint,
      { params }
    );
    return response.data;
  }

  /**
   * Get a single item by ID
   */
  async findOne(id: number | string, params?: StrapiQueryParams): Promise<StrapiResponse<StrapiEntity<T>>> {
    const response = await apiClient.get<StrapiResponse<StrapiEntity<T>>>(
      `${this.endpoint}/${id}`,
      { params }
    );
    return response.data;
  }

  /**
   * Create a new item
   */
  async create(data: Partial<T>): Promise<StrapiResponse<StrapiEntity<T>>> {
    const response = await apiClient.post<StrapiResponse<StrapiEntity<T>>>(
      this.endpoint,
      { data }
    );
    return response.data;
  }

  /**
   * Update an existing item
   */
  async update(id: number | string, data: Partial<T>): Promise<StrapiResponse<StrapiEntity<T>>> {
    const response = await apiClient.put<StrapiResponse<StrapiEntity<T>>>(
      `${this.endpoint}/${id}`,
      { data }
    );
    return response.data;
  }

  /**
   * Delete an item
   */
  async delete(id: number | string): Promise<StrapiResponse<StrapiEntity<T>>> {
    const response = await apiClient.delete<StrapiResponse<StrapiEntity<T>>>(
      `${this.endpoint}/${id}`
    );
    return response.data;
  }

  /**
   * Upload files to Strapi
   */
  async uploadFile(file: FormData): Promise<any> {
    const response = await apiClient.post('/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

// Helper function to build Strapi query string
export const buildStrapiQuery = (params: StrapiQueryParams): string => {
  const searchParams = new URLSearchParams();

  // Handle filters
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (typeof value === 'object') {
        searchParams.append(`filters[${key}]`, JSON.stringify(value));
      } else {
        searchParams.append(`filters[${key}]`, String(value));
      }
    });
  }

  // Handle sort
  if (params.sort) {
    const sortString = Array.isArray(params.sort) ? params.sort.join(',') : params.sort;
    searchParams.append('sort', sortString);
  }

  // Handle pagination
  if (params.pagination) {
    Object.entries(params.pagination).forEach(([key, value]) => {
      searchParams.append(`pagination[${key}]`, String(value));
    });
  }

  // Handle populate
  if (params.populate) {
    if (Array.isArray(params.populate)) {
      searchParams.append('populate', params.populate.join(','));
    } else if (typeof params.populate === 'string') {
      searchParams.append('populate', params.populate);
    } else {
      searchParams.append('populate', JSON.stringify(params.populate));
    }
  }

  // Handle fields
  if (params.fields) {
    searchParams.append('fields', params.fields.join(','));
  }

  // Handle other params
  if (params.publicationState) {
    searchParams.append('publicationState', params.publicationState);
  }

  if (params.locale) {
    searchParams.append('locale', params.locale);
  }

  return searchParams.toString();
};
