import { CustomButton } from '@/components/common/custom-button';
import { Plus } from 'lucide-react';
import React from 'react';

const PlusIcon = ({ className }: { className?: string }) => (
  <Plus className={className} />
);

export function CustomButtonDemo() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAsyncAction = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className='p-6 space-y-8 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold text-gray-900'>Custom Button Demo</h1>

      {/* Variants */}
      <div className='space-y-2'>
        <h2 className='text-lg font-semibold'>Variants</h2>
        <div className='flex gap-3'>
          <CustomButton variant='primary'>Primary</CustomButton>
          <CustomButton variant='outline'>Outline</CustomButton>
        </div>
      </div>

      {/* Sizes */}
      <div className='space-y-2'>
        <h2 className='text-lg font-semibold'>Sizes</h2>
        <div className='flex gap-3'>
          <CustomButton size='small'>Small</CustomButton>
          <CustomButton size='large'>Large</CustomButton>
        </div>
      </div>

      {/* Icon with Text */}
      <div className='space-y-2'>
        <h2 className='text-lg font-semibold'>With Icon</h2>
        <div className='flex gap-3'>
          <CustomButton icon={<PlusIcon />} iconPosition='left'>
            Add
          </CustomButton>
          <CustomButton
            icon={<PlusIcon />}
            iconPosition='right'
            variant='outline'
          >
            Create
          </CustomButton>
        </div>
      </div>

      {/* Loading */}
      <div className='space-y-2'>
        <h2 className='text-lg font-semibold'>Loading</h2>
        <div className='flex gap-3'>
          <CustomButton loading loadingText='Saving...'>
            Save
          </CustomButton>
          <CustomButton
            loading={isLoading}
            loadingText='Processing...'
            onClick={handleAsyncAction}
            icon={<PlusIcon />}
          >
            {isLoading ? 'Processing...' : 'Start'}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
