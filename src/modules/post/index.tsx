import { DEFAULT_FILTERS } from '@/constants/post';
import * as PostService from '@/services/post';
import type { IPostFilter, Post } from '@/types/post';
import { useEffect, useState } from 'react';
import PostFilter from './PostFilter';
import { PostHeader } from './PostHeader';
import PostList from './PostList';

export default function Post() {
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [filters, setFilters] = useState<IPostFilter>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPosts = async (filterData: IPostFilter) => {
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
