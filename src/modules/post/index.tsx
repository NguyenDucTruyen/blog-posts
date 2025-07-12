import { usePost } from '@/hooks/usePosts';
import PostFilter from './PostFilter';
import { PostHeader } from './PostHeader';
import PostList from './PostList';

export default function Post() {
  const { posts, error, filters, setFilters, total, isLoading } = usePost();
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
