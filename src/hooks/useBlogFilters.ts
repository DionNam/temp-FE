"use client";

import { useState, useEffect, useCallback } from 'react';
import { blogApi } from '@/lib/api';
import { BlogListParams } from '@/types/blog';

export function useBlogFilters(initialParams?: BlogListParams) {
  const [filters, setFilters] = useState<BlogListParams>(initialParams || {});

  const updateFilter = useCallback((key: keyof BlogListParams, value: string | boolean | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? Number(value) : 1,
    }));
  }, []);

  const updateFilters = useCallback((newFilters: Partial<BlogListParams>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.page !== undefined ? Number(newFilters.page) : 1,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialParams || {});
  }, [initialParams]);

  const clearFilter = useCallback((key: keyof BlogListParams) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      newFilters.page = Number(1);
      return newFilters;
    });
  }, []);

  return {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    clearFilter,
  };
}

export function useBlogCategories() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogApi.getCategories();
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    data,
    loading,
    error,
    refetch: fetchCategories,
  };
}

export function useBlogTags() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogApi.getTags();
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tags');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return {
    data,
    loading,
    error,
    refetch: fetchTags,
  };
}

export function usePagination(
  currentPage: number = 1,
  totalPages: number = 1,
  onPageChange?: (page: number) => void
) {
  const [page, setPage] = useState(currentPage);

  const goToPage = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      onPageChange?.(newPage);
    }
  }, [totalPages, onPageChange]);

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      goToPage(page + 1);
    }
  }, [page, totalPages, goToPage]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      goToPage(page - 1);
    }
  }, [page, goToPage]);

  const goToFirstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const goToLastPage = useCallback(() => {
    goToPage(totalPages);
  }, [totalPages, goToPage]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return {
    currentPage: page,
    totalPages,
    canGoNext: page < totalPages,
    canGoPrev: page > 1,
    goToPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
  };
}

export function useSearchDebounce(initialValue: string = '', delay: number = 500) {
  const [searchValue, setSearchValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, delay]);

  return {
    searchValue,
    debouncedValue,
    setSearchValue,
  };
}
