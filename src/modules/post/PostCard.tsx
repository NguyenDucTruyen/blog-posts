// components/PostCard.tsx
import LazyImage from '@/components/common/LazyImage';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import type { Post } from '@/types/post';
import { Calendar, User } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className='shadow-sm overflow-hidden hover:shadow-lg transition-shadow'>
      <div className='h-40 relative overflow-hidden'>
        <LazyImage
          src={post.thumbnailURL}
          className='object-cover h-40 w-full hover:scale-105 transition-transform duration-300'
        />
      </div>

      <CardHeader>
        <div className='flex items-center justify-between mb-2 flex-wrap gap-2'>
          {post.categories.map(category => (
            <Badge key={category} className='text-xs'>
              {category}
            </Badge>
          ))}
          <span className='text-xs text-muted-foreground'>6 min read</span>
        </div>
        <h3 className='font-semibold text-lg leading-tight hover:text-primary transition-colors text-center'>
          {post.title}
        </h3>
      </CardHeader>

      <CardContent className='text-sm text-gray-500 text-center'>
        {post.content}
      </CardContent>

      <CardFooter>
        <div className='flex items-center w-full justify-between text-xs text-muted-foreground'>
          <div className='flex items-center'>
            <User className='inline mr-1 w-3 h-3' />
            {post.author.name}
          </div>
          <div className='flex items-center'>
            <Calendar className='inline mr-1 w-3 h-3' />
            {post.createdAt}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
