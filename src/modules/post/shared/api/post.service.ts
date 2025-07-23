import { post } from '../data/post.data';

export const SORT_TYPES = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  AZ: 'az',
  ZA: 'za',
} as const;

export interface Post {
  id: string;
  title: string;
  thumbnailURL: string;
  categories: string[];
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
  readTime: string;
  lastReadAt: string;
}

export interface PostFilterOptions {
  text: string;
  category: string;
  author: string;
  sortBy: 'createdAt' | 'title';
  sortOrder: 'asc' | 'desc';
  sortOption: (typeof SORT_TYPES)[keyof typeof SORT_TYPES];
}

type PostResponse = {
  data: Post[];
  total: number;
};
export const DEFAULT_FILTERS: PostFilterOptions = {
  text: '',
  category: 'all',
  author: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  sortOption: SORT_TYPES.NEWEST,
};

export const getAllPosts = async (
  query: PostFilterOptions
): Promise<PostResponse> => {
  return await new Promise<PostResponse>(resolve => {
    setTimeout(() => {
      let filteredPosts = post.data;
      // Filter and sort posts based on the query parameters
      if (query.text) {
        filteredPosts = filteredPosts.filter(
          post =>
            post.title.toLowerCase().includes(query.text.toLowerCase()) ||
            post.content.toLowerCase().includes(query.text.toLowerCase())
        );
      }
      // Filter by category, author, and sort
      if (query.category) {
        filteredPosts = filteredPosts.filter(post => {
          if (query.category === 'all') {
            return true;
          }
          return post.categories.includes(query.category);
        });
      }
      // Filter by author
      if (query.author) {
        filteredPosts = filteredPosts.filter(post => {
          if (query.author === 'all') {
            return true;
          }
          return post.author.name === query.author;
        });
      }
      // Sort by createdAt or title
      if (query.sortBy) {
        filteredPosts.sort((a, b) => {
          if (query.sortBy === 'createdAt') {
            return query.sortOrder === 'asc'
              ? new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              : new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime();
          }
          if (query.sortBy === 'title') {
            return query.sortOrder === 'asc'
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
          }
          return 0;
        });
      }
      resolve({
        data: filteredPosts,
        total: post.total,
      });
    }, 500);
  });
};
export const SORT_OPTIONS = [
  { label: 'Newest', value: SORT_TYPES.NEWEST },
  { label: 'Oldest', value: SORT_TYPES.OLDEST },
  { label: 'Title A-Z', value: SORT_TYPES.AZ },
  { label: 'Title Z-A', value: SORT_TYPES.ZA },
];

export const LIST_AUTHORS = [
  {
    label: 'Sarah Johnson',
    value: 'Sarah Johnson',
  },
  {
    label: 'Mike Chen',
    value: 'Mike Chen',
  },
  {
    label: 'Emily Rodriguez',
    value: 'Emily Rodriguez',
  },
  {
    label: 'David Kim',
    value: 'David Kim',
  },
  {
    label: 'Lisa Wang',
    value: 'Lisa Wang',
  },
  {
    label: 'Alex Thompson',
    value: 'Alex Thompson',
  },
];
export const LIST_CATEGORIES = [
  { label: 'Technology', value: 'Technology' },
  { label: 'Development', value: 'Development' },
  { label: 'Design', value: 'Design' },
];

export const AUTHOR_OPTIONS = [
  {
    label: 'All Authors',
    value: 'all',
  },
  ...LIST_AUTHORS,
];
export const CATEGORY_OPTIONS = [
  { label: 'All Categories', value: 'all' },
  ...LIST_CATEGORIES,
];

export const getPostById = async (id: string): Promise<Post | null> => {
  return await new Promise<Post | null>(resolve => {
    setTimeout(() => {
      const response = post.data.find(p => p.id === id) || null;
      resolve(response);
    }, 500);
  });
};
