import POST_DATA from '@/data/post.json';
import type { IPostFilter } from '@/types/post';

export const LIST_CATEGORIES = [
  { label: 'Technology', value: 'Technology' },
  { label: 'Development', value: 'Development' },
  { label: 'Design', value: 'Design' },
];
export const CATEGORY_OPTIONS = [
  { label: 'All Categories', value: 'all' },
  ...LIST_CATEGORIES,
];

export const SORT_TYPES = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  AZ: 'az',
  ZA: 'za',
} as const;

export const SORT_OPTIONS = [
  { label: 'Newest', value: SORT_TYPES.NEWEST },
  { label: 'Oldest', value: SORT_TYPES.OLDEST },
  { label: 'Title A-Z', value: SORT_TYPES.AZ },
  { label: 'Title Z-A', value: SORT_TYPES.ZA },
];
export const DEFAULT_FILTERS: IPostFilter = {
  text: '',
  category: 'all',
  author: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  sortOption: SORT_TYPES.NEWEST,
};

export const LIST_AUTHORS = POST_DATA.data.reduce(
  (acc, cur) => {
    if (!acc.find(author => author?.value === cur.author.name)) {
      acc.push({
        label: cur.author.name,
        value: cur.author.name,
      });
    }
    return acc;
  },
  [] as { label: string; value: string }[]
);

export const AUTHOR_OPTIONS = [
  { label: 'All Authors', value: 'all' },
  ...LIST_AUTHORS,
];
