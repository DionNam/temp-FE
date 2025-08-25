import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogApi } from '@/lib/api';
import { 
  BlogListParams, 
  CreateBlogRequest,
  UpdateBlogRequest,
} from '@/types/blog';

export const blogKeys = {
  all: ['blogs'] as const,
  lists: () => [...blogKeys.all, 'list'] as const,
  list: (params: BlogListParams) => [...blogKeys.lists(), params] as const,
  details: () => [...blogKeys.all, 'detail'] as const,
  detail: (id: string) => [...blogKeys.details(), id] as const,
  bySlug: (slug: string) => [...blogKeys.details(), 'slug', slug] as const,
  related: (id: string) => [...blogKeys.details(), id, 'related'] as const,
  categories: ['categories'] as const,
  tags: ['tags'] as const,
};

export const useBlogs = (params?: BlogListParams) => {
  return useQuery({
    queryKey: blogKeys.list(params || {}),
    queryFn: () => blogApi.getBlogs(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useBlog = (id: string | null) => {
  return useQuery({
    queryKey: blogKeys.detail(id!),
    queryFn: () => blogApi.getBlog(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export const useBlogBySlug = (slug: string | null) => {
  return useQuery({
    queryKey: blogKeys.bySlug(slug!),
    queryFn: () => blogApi.getBlogBySlug(slug!),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export const useRelatedBlogs = (id: string) => {
  return useQuery({
    queryKey: blogKeys.related(id!),
    queryFn: () => blogApi.getRelatedBlogs(id!),
    enabled: !!id,
    staleTime: 15 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: blogKeys.categories,
    queryFn: () => blogApi.getCategories(),
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
  });
};

export const useTags = () => {
  return useQuery({
    queryKey: blogKeys.tags,
    queryFn: () => blogApi.getTags(),
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateBlogRequest) => blogApi.createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.categories });
    },
    onError: (error) => {
      console.error('Failed to create blog:', error);
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UpdateBlogRequest> }) =>
      blogApi.updateBlog(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to update blog:', error);
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => blogApi.deleteBlog(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: blogKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
    onError: (error) => {
      console.error('Failed to delete blog:', error);
    },
  });
};
