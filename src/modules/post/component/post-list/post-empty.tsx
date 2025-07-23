import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export const PostEmpty = ({ clearFilters }: { clearFilters: () => void }) => {
  return (
    <div className='flex justify-center items-center flex-col text-muted-foreground mb-4'>
      <Search className='inline size-12 mb-4' />
      <h3 className='text-lg font-semibold mb-2'>No posts found</h3>
      <p>Try adjusting your search or filter criteria</p>
      <Button className='mt-4 cursor-pointer' onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};
