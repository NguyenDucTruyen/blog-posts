import { SORT_TYPES } from '@/constants/post';
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

export interface PostResponse {
  data: Post[];
  total: number;
}

export interface PostFilter {
  text: string;
  category: string;
  author: string;
  sortBy: 'createdAt' | 'title';
  sortOrder: 'asc' | 'desc';
  sortOption: (typeof SORT_TYPES)[keyof typeof SORT_TYPES];
}
