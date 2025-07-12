import type { Post, PostFilter, PostResponse } from '@/types/post';
import POST_DATA from '../data/post.json';

export const getAllPosts = async (query: PostFilter): Promise<PostResponse> => {
  return await new Promise<PostResponse>(resolve => {
    setTimeout(() => {
      let filteredPosts = POST_DATA.data;
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
        total: POST_DATA.total,
      });
    }, 0);
  });
};

export const getPostById = async (id: string): Promise<Post | null> => {
  return await new Promise<Post | null>(resolve => {
    setTimeout(() => {
      const post = POST_DATA.data.find(p => p.id === id) || null;
      resolve(post);
    }, 0);
  });
};
