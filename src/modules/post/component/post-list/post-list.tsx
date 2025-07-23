// components/Post.tsx
import {
  DEFAULT_FILTERS,
  type Post,
  type PostFilterOptions,
} from '@/modules/post/shared/api/post.service';
import { useMemo } from 'react';
import { PostCard } from './post-card';
import { PostEmpty } from './post-empty';
interface IPostProps {
  posts: Post[];
  error?: string | null;
  total: number;
  isLoading: boolean;
  setFilters: (filters: PostFilterOptions) => void;
}
export function PostList({
  posts,
  error,
  total,
  isLoading,
  setFilters,
}: IPostProps) {
  const lengthPost = useMemo(() => posts.length, [posts]);

  if (error) {
    return <div className='text-center text-red-500'>Error: {error}</div>;
  }

  if (isLoading) {
    return <LoadingPosts />;
  }

  if (posts.length === 0) {
    return <PostEmpty clearFilters={() => setFilters(DEFAULT_FILTERS)} />;
  }

  return (
    <>
      <p className='p-4 rounded-lg text-sm text-gray-600 text-center'>
        Showing {lengthPost} of {total} posts
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

export const LoadingPosts = () => {
  return (
    <div className='flex justify-center items-center flex-col text-muted-foreground mb-4'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4'></div>
      <h3 className='text-lg font-semibold mb-2'>Loading posts...</h3>
      <p>Please wait while we fetch the latest posts</p>
    </div>
  );
};
