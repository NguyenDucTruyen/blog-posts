import { DEFAULT_FILTERS } from '@/constants/post';
import * as PostService from '@/services/post';
import type { Post, PostFilter } from '@/types/post';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const usePost = () => {
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<PostFilter>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPosts = useCallback(async (filterData: PostFilter) => {
    try {
      setIsLoading(true);
      const response = await PostService.getAllPosts(filterData);
      setPosts(response.data);
      setTotal(response.total);
      setError(null);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFetchPost = useMemo(() => debounce(fetchPosts, 500), []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    debounceFetchPost(filters);
  }, [filters]);

  return {
    // state
    error,
    posts,
    total,
    filters,
    setFilters,
    isLoading,
    // actions
    clearError,
    fetchPosts,
  };
};
