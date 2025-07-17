import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AUTHOR_OPTIONS,
  CATEGORY_OPTIONS,
  SORT_OPTIONS,
  SORT_TYPES,
} from '@/constants/post';
import type { IPostFilter } from '@/types/post';
import { Search, X } from 'lucide-react';
interface IPostFilterProps {
  filters: IPostFilter;
  setFilters: (
    filters: IPostFilter | ((prev: IPostFilter) => IPostFilter)
  ) => void;
}

export default function PostFilter({ filters, setFilters }: IPostFilterProps) {
  const handleFilterOrderChange = (
    value: (typeof SORT_TYPES)[keyof typeof SORT_TYPES]
  ) => {
    setFilters((prev: IPostFilter) => {
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
        <PostFilterSelect
          value={filters.category}
          options={CATEGORY_OPTIONS}
          onChange={value => setFilters({ ...filters, category: value })}
        />
        <PostFilterSelect
          value={filters.author}
          options={AUTHOR_OPTIONS}
          onChange={value => setFilters({ ...filters, author: value })}
        />
        <PostFilterSelect
          value={filters.sortOption}
          options={SORT_OPTIONS}
          onChange={handleFilterOrderChange}
        />
      </div>
    </div>
  );
}

interface IPostFilterInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PostFilterInput = ({ onChange, value }: IPostFilterInputProps) => {
  return (
    <div className='relative w-full max-w-sm items-center'>
      <Input
        type='text'
        placeholder='Search posts...'
        value={value}
        onChange={e => onChange(e.target.value)}
        className='w-full max-w-sm px-10'
      />
      <span className='absolute start-0 inset-y-0 flex items-center justify-center px-2'>
        <Search className='size-4 text-muted-foreground' />
      </span>
      {value && (
        <button
          className='absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer group'
          onClick={() => onChange('')}
        >
          <X className='size-4 text-muted-foreground group-hover:fill-slate-900' />
        </button>
      )}
    </div>
  );
};

export const PostFilterSelect = <T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className='w-full max-w-sm font-semibold'>
        <SelectValue placeholder='Select an option' />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
