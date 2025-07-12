// components/Post.tsx
import { Button } from '@/components/ui/button';
import { DEFAULT_FILTERS } from '@/constants/post';
import type { Post, PostFilter } from '@/types/post';
import { Search } from 'lucide-react';
import { useMemo } from 'react';
import { PostCard } from './PostCard';

interface IPostProps {
  posts: Post[];
  error?: string | null;
  total: number;
  setFilters: (filters: PostFilter) => void;
}

export default function Post({ posts, error, total, setFilters }: IPostProps) {
  const lengthPost = useMemo(() => posts.length, [posts]);
  if (error) {
    return <div className='text-center text-red-500'>Error: {error}</div>;
  }
  if (posts.length === 0) {
    return <EmptyPost clearFilters={() => setFilters(DEFAULT_FILTERS)} />;
  }
  return (
    <>
      <PostMeta length={lengthPost} total={total} />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

interface PostMetaProps {
  length: number;
  total: number;
}

export const PostMeta = ({ length, total }: PostMetaProps) => {
  return (
    <p className='p-4 rounded-lg text-sm text-gray-600 text-center'>
      Showing {length} of {total} posts
    </p>
  );
};

export const EmptyPost = ({ clearFilters }: { clearFilters: () => void }) => {
  return (
    <div className='flex justify-center items-center flex-col text-muted-foreground mb-4'>
      <Search className='inline size-12 mb-4' />
      <h3 className='text-lg font-semibold mb-2'>No posts found</h3>
      <p>Try adjusting your search or filter criteria</p>
      <Button className='mt-4 cursor-pointer' onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};
