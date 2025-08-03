import { Link } from '@/router/Link';

export const NotFoundPage = () => {
  return (
    <div className='w-full max-w-[1200px] mx-auto py-10'>
      <h1 className='text-3xl font-bold mb-4'>404 - Page Not Found</h1>
      <p className='text-lg'>
        Sorry, the page you are looking for does not exist. Please check the URL
        or return to the home page.
      </p>
      <div className='mt-6'>
        <Link to='/' className='text-blue-500 hover:underline'>
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};
