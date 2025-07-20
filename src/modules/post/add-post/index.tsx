import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { LIST_AUTHORS, LIST_CATEGORIES } from '@/constants/post';
import { useAddPostForm } from '@/hooks/useAddPostForm';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { FormItem } from './FormItem';
export function AddPost() {
  const {
    isDialogOpen,
    setIsDialogOpen,
    isPublishing,
    contentRef,
    inputRef,
    onSubmit,
    errors,
    setErrors,
    authorRef,
    categoryRef,
    estimatedReadingTimeRef,
    excerptRef,
    imageRef,
    tags,
    setTags,
    resetForm,
  } = useAddPostForm();
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={open => {
        setIsDialogOpen(open);
        if (!open) {
          resetForm();
        }
      }}
    >
      <DialogTrigger
        asChild
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        <Button className='cursor-pointer'>Add New Post</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg min-w-2xl lg:min-w-3xl max-h-[90vh] overflow-y-auto'>
        <form onSubmit={onSubmit} className='space-y-4'>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <FormItem
                errors={errors}
                name='title'
                required={true}
                label='Title'
              >
                <Input
                  id='title'
                  name='title'
                  placeholder='Enter post title...'
                  ref={inputRef}
                  onChange={() =>
                    setErrors(prev =>
                      prev.filter(error => error.path !== 'title')
                    )
                  }
                />
              </FormItem>
              <FormItem
                errors={errors}
                name='excerpt'
                required={true}
                label='Excerpt'
              >
                <Textarea
                  id='excerpt'
                  name='excerpt'
                  rows={2}
                  placeholder='Enter post excerpt...'
                  ref={excerptRef}
                  onChange={value => {
                    const length = value.target.value.length;
                    setErrors(prev =>
                      prev.filter(error =>
                        length >= 20 && length < 200
                          ? error.path !== 'excerpt'
                          : true
                      )
                    );
                  }}
                  className={cn(
                    excerptRef.current?.value &&
                      excerptRef.current.value.length > 200
                      ? 'border-red-200'
                      : ''
                  )}
                />
                <p className='text-xs text-muted-foreground'>
                  {excerptRef.current?.value.length || 0}/200 characters
                </p>
              </FormItem>
              <div className='grid grid-cols-2 gap-4'>
                <FormItem
                  errors={errors}
                  name='author'
                  required={true}
                  label='Author'
                >
                  <Select
                    onValueChange={value => {
                      authorRef.current = value;
                      setErrors(prev =>
                        prev.filter(error => error.path !== 'author')
                      );
                    }}
                  >
                    <SelectTrigger
                      name='author'
                      className='w-full max-w-sm font-semibold'
                    >
                      <SelectValue placeholder='Select an option' />
                    </SelectTrigger>
                    <SelectContent>
                      {LIST_AUTHORS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
                <FormItem
                  errors={errors}
                  name='category'
                  required={true}
                  label='Category'
                >
                  <Select
                    onValueChange={value => {
                      categoryRef.current = value;
                      setErrors(prev =>
                        prev.filter(error => error.path !== 'category')
                      );
                    }}
                  >
                    <SelectTrigger
                      name='category'
                      className='w-full max-w-sm font-semibold'
                    >
                      <SelectValue placeholder='Select an option' />
                    </SelectTrigger>
                    <SelectContent>
                      {LIST_CATEGORIES.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              </div>
              <FormItem errors={errors} name='tags' label='Tags'>
                <Input
                  id='tags'
                  name='tags'
                  placeholder='Add tags'
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value !== '') {
                        setTags(prev => [...prev, value]);
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                />
                {tags.length > 0 && (
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant='outline'
                        className='space-x-1'
                      >
                        {tag as string}
                        <span>
                          <X
                            className='cursor-pointer hover:stroke-red-500'
                            size={12}
                            onClick={() => {
                              setTags(prev =>
                                prev.filter((_, i) => i !== index)
                              );
                            }}
                          />
                        </span>
                      </Badge>
                    ))}
                  </div>
                )}
              </FormItem>
              <FormItem
                errors={errors}
                name='image'
                required={true}
                label='Image URL'
              >
                <Input
                  id='image'
                  name='image'
                  placeholder='https://example.com/image.jpg'
                  ref={imageRef}
                  onChange={() =>
                    setErrors(prev =>
                      prev.filter(error => error.path !== 'image')
                    )
                  }
                />
                {imageRef.current?.value && (
                  <img
                    src={imageRef.current.value}
                    alt='Post Preview'
                    className='mt-2 w-full h-32 object-cover rounded-md border'
                  />
                )}
              </FormItem>
              <FormItem
                errors={errors}
                name='estimatedReadingTime'
                required={true}
                label='Estimated Reading Time'
              >
                <Input
                  id='estimatedReadingTime'
                  name='estimatedReadingTime'
                  placeholder='Enter reading time (e.g., 5 min)...'
                  ref={estimatedReadingTimeRef}
                  onChange={() =>
                    setErrors(prev =>
                      prev.filter(
                        error => error.path !== 'estimatedReadingTime'
                      )
                    )
                  }
                />
              </FormItem>
            </div>
            <div className='space-y-4'>
              <FormItem
                errors={errors}
                name='content'
                required={true}
                label='Content'
              >
                <Textarea
                  id='content'
                  name='content'
                  rows={20}
                  placeholder='Enter post content...'
                  ref={contentRef}
                  onChange={() => {
                    if (
                      contentRef.current?.value &&
                      contentRef.current?.value?.length >= 100
                    ) {
                      setErrors(prev =>
                        prev.filter(error => error.path !== 'content')
                      );
                    } else {
                      setErrors(prev => [...prev]);
                    }
                  }}
                  className={cn(
                    'min-h-[400px]',
                    contentRef.current?.value &&
                      contentRef.current.value.length > 200
                      ? 'border-red-500'
                      : ''
                  )}
                />
                <p className='text-xs text-muted-foreground'>
                  {contentRef.current?.value.length || 0} characters
                </p>
              </FormItem>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' disabled={isPublishing}>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' disabled={isPublishing}>
              {isPublishing ? 'Publishing...' : 'Publish Post'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
