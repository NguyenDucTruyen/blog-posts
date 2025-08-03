import { PostFilter } from '@/modules/post/post-filter/post-filter';
import { PostHeader } from '@/modules/post/post-header/post-header';
import { PostList } from '@/modules/post/post-list/post-list';
import {
  DEFAULT_FILTERS,
  getAllPosts,
  type Post,
  type PostFilterOptions,
} from '@/modules/post/shared/api/post.service';
import { useEffect, useState } from 'react';

export function PostPage() {
  const [error, setError] = useState<string | null>(null);
  const [postResponse, setPostResponse] = useState<{
    data: Post[];
    total: number;
  } | null>(null);
  const [filters, setFilters] = useState<PostFilterOptions>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: posts = [], total = 0 } = postResponse || {};
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPosts(filters);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [filters]);
  return (
    <div className='w-full max-w-[1200px] mx-auto py-10'>
      <PostHeader />
      <PostFilter filters={filters} setFilters={setFilters} />
      <PostList
        posts={posts}
        error={error}
        total={total}
        isLoading={isLoading}
        setFilters={setFilters}
      />
    </div>
  );
}
