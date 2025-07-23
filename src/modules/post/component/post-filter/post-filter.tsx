import {
  AUTHOR_OPTIONS,
  CATEGORY_OPTIONS,
  type PostFilterOptions,
  SORT_OPTIONS,
  SORT_TYPES,
} from '@/modules/post/shared/api/post.service';
import { FilterSelect } from './filter-select';
import { PostFilterInput } from './search-input';

type PostFilterProps = {
  filters: PostFilterOptions;
  setFilters: (
    filters:
      | PostFilterOptions
      | ((prev: PostFilterOptions) => PostFilterOptions)
  ) => void;
};

export function PostFilter({ filters, setFilters }: PostFilterProps) {
  const handleFilterOrderChange = (
    value: (typeof SORT_TYPES)[keyof typeof SORT_TYPES]
  ) => {
    setFilters((prev: PostFilterOptions) => {
      const baseUpdate = {
        ...prev,
        sortOption: value,
      };

      switch (value) {
        case SORT_TYPES.NEWEST:
          return { ...baseUpdate, sortBy: 'createdAt', sortOrder: 'desc' };
        case SORT_TYPES.OLDEST:
          return { ...baseUpdate, sortBy: 'createdAt', sortOrder: 'asc' };
        case SORT_TYPES.AZ:
          return { ...baseUpdate, sortBy: 'title', sortOrder: 'asc' };
        case SORT_TYPES.ZA:
          return { ...baseUpdate, sortBy: 'title', sortOrder: 'desc' };
        default:
          return prev;
      }
    });
  };

  return (
    <div className='flex justify-between lg:flex-row gap-4 mb-8 p-4 bg-muted/50 rounded-lg'>
      <PostFilterInput
        value={filters.text}
        onChange={value => setFilters({ ...filters, text: value })}
      />
      <div className='flex gap-4'>
        <FilterSelect
          value={filters.category}
          options={CATEGORY_OPTIONS}
          onChange={value => setFilters({ ...filters, category: value })}
        />
        <FilterSelect
          value={filters.author}
          options={AUTHOR_OPTIONS}
          onChange={value => setFilters({ ...filters, author: value })}
        />
        <FilterSelect
          value={filters.sortOption}
          options={SORT_OPTIONS}
          onChange={handleFilterOrderChange}
        />
      </div>
    </div>
  );
}
