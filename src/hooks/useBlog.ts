"use client";

import { useState, useEffect, useCallback } from 'react';
import { blogApi } from '@/lib/api';
import { 
  BlogPost, 
  BlogListParams, 
  BlogListResponse,
  CreateBlogRequest,
  UpdateBlogRequest 
} from '@/types/blog';

export function useBlogs(params?: BlogListParams) {
  const [data, setData] = useState<BlogListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogApi.getBlogs(params);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    data,
    loading,
    error,
    refetch: fetchBlogs,
  };
}

export function useBlog(id: string | null) {
  const [data, setData] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlog = useCallback(async () => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await blogApi.getBlog(id);
      setData(response.data || response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return {
    data,
    loading,
    error,
    refetch: fetchBlog,
  };
}

export function useBlogBySlug(slug: string | null) {
  const [data, setData] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlog = useCallback(async () => {
    if (!slug) {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await blogApi.getBlogBySlug(slug);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return {
    data,
    loading,
    error,
    refetch: fetchBlog,
  };
}

export function useCreateBlog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBlog = useCallback(async (data: CreateBlogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogApi.createBlog(data);
      // Invalidate cache via API route
      await fetch('/api/cache/invalidate-all-blogs', { method: 'POST' });
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create blog';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createBlog,
    loading,
    error,
  };
}

export function useUpdateBlog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateBlog = useCallback(async (id: string, data: Partial<UpdateBlogRequest>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogApi.updateBlog(id, data);
      // Invalidate cache via API route
      await fetch('/api/cache/invalidate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId: id }),
      });
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update blog';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    updateBlog,
    loading,
    error,
  };
}

export function useDeleteBlog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBlog = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogApi.deleteBlog(id);
      // Invalidate cache via API route
      await fetch('/api/cache/invalidate-all-blogs', { method: 'POST' });
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete blog';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    deleteBlog,
    loading,
    error,
  };
}

export function useRelatedBlogs(id: string | null, category?: string) {
  const [data, setData] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRelatedBlogs = useCallback(async () => {
    if (!id) {
      setData([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      if (category) {
        const response = await blogApi.getBlogs({ category, published: true });
        setData(response.data?.blogs || []);
      } else {
        const response = await blogApi.getRelatedBlogs(id);
        setData(response);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch related blogs');
    } finally {
      setLoading(false);
    }
  }, [id, category]);

  useEffect(() => {
    fetchRelatedBlogs();
  }, [fetchRelatedBlogs]);

  return {
    data,
    loading,
    error,
    refetch: fetchRelatedBlogs,
  };
}
