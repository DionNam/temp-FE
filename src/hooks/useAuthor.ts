"use client";

import { useState, useEffect, useCallback } from 'react';
import { authorApi } from '@/lib/api';
import { 
  BlogAuthor,
  CreateAuthorRequest,
  UpdateAuthorRequest,
  BlogListParams,
  AuthorBlogsResponse 
} from '@/types/blog';

export function useAuthors() {
  const [data, setData] = useState<BlogAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authorApi.getAuthors();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch authors');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  return {
    data,
    loading,
    error,
    refetch: fetchAuthors,
  };
}

export function useAuthor(id: string | null) {
  const [data, setData] = useState<BlogAuthor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthor = useCallback(async () => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await authorApi.getAuthor(id);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch author');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAuthor();
  }, [fetchAuthor]);

  return {
    data,
    loading,
    error,
    refetch: fetchAuthor,
  };
}

export function useCreateAuthor() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAuthor = useCallback(async (data: CreateAuthorRequest): Promise<BlogAuthor | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await authorApi.createAuthor(data);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create author';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createAuthor,
    loading,
    error,
  };
}

export function useUpdateAuthor() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateAuthor = useCallback(async (
    id: string, 
    data: Partial<UpdateAuthorRequest>
  ): Promise<BlogAuthor | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await authorApi.updateAuthor(id, data);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update author';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    updateAuthor,
    loading,
    error,
  };
}

export function useDeleteAuthor() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAuthor = useCallback(async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await authorApi.deleteAuthor(id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete author';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    deleteAuthor,
    loading,
    error,
  };
}

export function useAuthorBlogs(id: string | null, params?: BlogListParams) {
  const [data, setData] = useState<AuthorBlogsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAuthorBlogs = useCallback(async () => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await authorApi.getAuthorBlogs(id, params);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch author blogs');
    } finally {
      setLoading(false);
    }
  }, [id, params]);

  useEffect(() => {
    fetchAuthorBlogs();
  }, [fetchAuthorBlogs]);

  return {
    data,
    loading,
    error,
    refetch: fetchAuthorBlogs,
  };
}
