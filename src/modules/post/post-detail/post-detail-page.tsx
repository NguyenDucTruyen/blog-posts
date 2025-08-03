import { Button } from '@/components/ui/button';
import { goBack } from '@/router/navigate';

interface DetailPostPageProps {
  params: { [key: string]: string };
}

export const DetailPostPage = ({ params }: DetailPostPageProps) => {
  const postId = params.id;

  // Use postId to fetch or display the specific post
  return (
    <div className='w-full max-w-[1200px] mx-auto py-10'>
      <h1 className='text-3xl font-bold mb-4'>Post Detail</h1>
      <p className='text-lg'>Displaying details for post ID: {postId}</p>
      <Button className='cursor-pointer mt-4' onClick={() => goBack()}>
        Go Back
      </Button>
    </div>
  );
};
