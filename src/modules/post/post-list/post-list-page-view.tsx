import { PostFilter } from '@/modules/post/post-filter/post-filter';
import { PostHeader } from '@/modules/post/post-header/post-header';
import { PostList } from '@/modules/post/post-list/post-list';
import {
  type Post,
  type PostFilterOptions,
} from '@/modules/post/shared/api/post.service';

// Presentational Component - Pure UI component that only handles rendering
interface PostPageViewProps {
  posts: Post[];
  total: number;
  error: string | null;
  isLoading: boolean;
  filters: PostFilterOptions;
  setFilters: (
    filters:
      | PostFilterOptions
      | ((prev: PostFilterOptions) => PostFilterOptions)
  ) => void;
}

export function PostPageView({
  posts,
  total,
  error,
  isLoading,
  filters,
  setFilters,
}: PostPageViewProps) {
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
