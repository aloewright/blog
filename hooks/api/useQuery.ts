/**
 * Custom React Query Hooks
 * Reusable hooks for data fetching with built-in error and loading states
 */

import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  UseQueryOptions,
  UseMutationOptions,
  UseInfiniteQueryOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { 
  StrapiResponse, 
  StrapiEntity, 
  StrapiQueryParams,
  articleService,
  categoryService,
  tagService,
  authService,
  Article,
  Category,
  Tag,
  User,
  apiClient
} from '../../services/api';

// Query keys factory
export const queryKeys = {
  all: ['api'] as const,
  articles: () => [...queryKeys.all, 'articles'] as const,
  article: (id: string | number) => [...queryKeys.articles(), id] as const,
  categories: () => [...queryKeys.all, 'categories'] as const,
  category: (id: string | number) => [...queryKeys.categories(), id] as const,
  tags: () => [...queryKeys.all, 'tags'] as const,
  tag: (id: string | number) => [...queryKeys.tags(), id] as const,
  auth: () => [...queryKeys.all, 'auth'] as const,
  me: () => [...queryKeys.auth(), 'me'] as const,
};

// Article hooks
export const useArticles = (
  params?: StrapiQueryParams,
  options?: UseQueryOptions<StrapiResponse<StrapiEntity<Article>[]>>
) => {
  return useQuery({
    queryKey: [...queryKeys.articles(), params],
    queryFn: () => articleService.findAll(params),
    ...options,
  });
};

export const useArticle = (
  id: string | number,
  params?: StrapiQueryParams,
  options?: UseQueryOptions<StrapiResponse<StrapiEntity<Article>>>
) => {
  return useQuery({
    queryKey: queryKeys.article(id),
    queryFn: () => articleService.findOne(id, params),
    enabled: !!id,
    ...options,
  });
};

export const useCreateArticle = (
  options?: UseMutationOptions<
    StrapiResponse<StrapiEntity<Article>>,
    Error,
    Partial<Article>
  >
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Article>) => articleService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles() });
    },
    ...options,
  });
};

export const useUpdateArticle = (
  options?: UseMutationOptions<
    StrapiResponse<StrapiEntity<Article>>,
    Error,
    { id: string | number; data: Partial<Article> }
  >
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => articleService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.article(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.articles() });
    },
    ...options,
  });
};

export const useDeleteArticle = (
  options?: UseMutationOptions<
    StrapiResponse<StrapiEntity<Article>>,
    Error,
    string | number
  >
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string | number) => articleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.articles() });
    },
    ...options,
  });
};

// Infinite scroll hook for articles
export const useInfiniteArticles = (
  params?: Omit<StrapiQueryParams, 'pagination'>,
  options?: UseInfiniteQueryOptions<StrapiResponse<StrapiEntity<Article>[]>>
) => {
  return useInfiniteQuery({
    queryKey: [...queryKeys.articles(), 'infinite', params],
    queryFn: ({ pageParam = 1 }) =>
      articleService.findAll({
        ...params,
        pagination: {
          page: pageParam,
          pageSize: 10,
        },
      }),
    getNextPageParam: (lastPage) => {
      const { page = 1, pageCount = 1 } = lastPage.meta?.pagination || {};
      return page < pageCount ? page + 1 : undefined;
    },
    ...options,
  });
};

// Category hooks
export const useCategories = (
  params?: StrapiQueryParams,
  options?: UseQueryOptions<StrapiResponse<StrapiEntity<Category>[]>>
) => {
  return useQuery({
    queryKey: [...queryKeys.categories(), params],
    queryFn: () => categoryService.findAll(params),
    ...options,
  });
};

export const useCategory = (
  id: string | number,
  params?: StrapiQueryParams,
  options?: UseQueryOptions<StrapiResponse<StrapiEntity<Category>>>
) => {
  return useQuery({
    queryKey: queryKeys.category(id),
    queryFn: () => categoryService.findOne(id, params),
    enabled: !!id,
    ...options,
  });
};

// Tag hooks
export const useTags = (
  params?: StrapiQueryParams,
  options?: UseQueryOptions<StrapiResponse<StrapiEntity<Tag>[]>>
) => {
  return useQuery({
    queryKey: [...queryKeys.tags(), params],
    queryFn: () => tagService.findAll(params),
    ...options,
  });
};

// Auth hooks
export const useLogin = (
  options?: UseMutationOptions<any, Error, { identifier: string; password: string }>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ identifier, password }) => authService.login(identifier, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.me() });
    },
    ...options,
  });
};

export const useRegister = (
  options?: UseMutationOptions<
    any,
    Error,
    { username: string; email: string; password: string }
  >
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ username, email, password }) =>
      authService.register(username, email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.me() });
    },
    ...options,
  });
};

export const useLogout = (options?: UseMutationOptions<void, Error, void>) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
    ...options,
  });
};

export const useMe = (options?: UseQueryOptions<any>) => {
  return useQuery({
    queryKey: queryKeys.me(),
    queryFn: () => authService.getMe(),
    ...options,
  });
};

// Generic hook for any endpoint
export const useApiQuery = <T = any>(
  key: string | string[],
  endpoint: string,
  params?: StrapiQueryParams,
  options?: UseQueryOptions<T>
) => {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const response = await apiClient.get(endpoint, { params });
      return response.data;
    },
    ...options,
  });
};

// Export a hook for handling API states
export const useApiState = <T>(query: ReturnType<typeof useQuery<T>>) => {
  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isSuccess: query.isSuccess,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
};
