import { DEFAULT_FILTERS } from '@/constants/post';
import * as PostService from '@/services/post';
import type { Post, PostFilter } from '@/types/post';
import { useCallback, useEffect, useState } from 'react';

export const usePost = () => {
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<PostFilter>(DEFAULT_FILTERS);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await PostService.getAllPosts(filters);
      console.log('Fetched posts:', response);
      setPosts(response.data);
      setTotal(response.total);
      setError(null);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    }
  }, [filters]);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    // state
    error,
    posts,
    total,
    filters,
    setFilters,

    // actions
    clearError,
    fetchPosts,
  };
};
