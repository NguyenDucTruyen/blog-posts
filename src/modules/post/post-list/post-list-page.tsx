import {
  DEFAULT_FILTERS,
  getAllPosts,
  type Post,
  type PostFilterOptions,
} from '@/modules/post/shared/api/post.service';
import { useEffect, useState } from 'react';
import { PostPageView } from './post-list-page-view';

// Container Component - Handles all data fetching, state management, and business logic
export function PostPage() {
  const [error, setError] = useState<string | null>(null);
  const [postResponse, setPostResponse] = useState<{
    data: Post[];
    total: number;
  } | null>(null);
  const [filters, setFilters] = useState<PostFilterOptions>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Derived state
  const { data: posts = [], total = 0 } = postResponse || {};

  // Business logic for fetching posts
  const fetchPosts = async (filterData: PostFilterOptions) => {
    try {
      setIsLoading(true);
      const response = await getAllPosts(filterData);
      setPostResponse(response);
      setError(null);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect for handling filter changes with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPosts(filters);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [filters]);

  // Render the presentational component with all necessary props
  return (
    <PostPageView
      posts={posts}
      total={total}
      error={error}
      isLoading={isLoading}
      filters={filters}
      setFilters={setFilters}
    />
  );
}
