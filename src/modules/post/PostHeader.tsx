import { Button } from '@/components/ui/button';

export const PostHeader = () => {
  return (
    <header className='flex items-center justify-between p-4'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-4xl font-bold'>Blog Posts</h1>
        <p className='text-sm text-gray-500'>
          Discover insights, tutorials, and updates from our team
        </p>
      </div>
      <div className='flex items-center space-x-4'>
        <Button>Add new post</Button>
      </div>
    </header>
  );
};
export default PostHeader;
