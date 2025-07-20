import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import { useState } from 'react';

export function AddPost() {
  const { form, isDialogOpen, setIsDialogOpen, onSubmit, resetForm } =
    useAddPostForm();
  const [tags, setTags] = useState<string[]>([]);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={open => {
        if (!open) {
          resetForm();
        }
        setIsDialogOpen(open);
      }}
    >
      <DialogTrigger asChild onClick={() => setIsDialogOpen(true)}>
        <Button className='cursor-pointer'>Add New Post</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg min-w-2xl lg:min-w-3xl max-h-[90vh] overflow-y-auto'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter post title...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='excerpt'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt *</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={2}
                          placeholder='Enter post excerpt...'
                          {...field}
                          className={cn(
                            field.value && field.value.length > 200
                              ? 'border-red-200'
                              : ''
                          )}
                        />
                      </FormControl>
                      <p className='text-xs text-muted-foreground'>
                        {field.value?.length || 0}/200 characters
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='author'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className='w-full max-w-sm font-semibold'>
                              <SelectValue placeholder='Select an option' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LIST_AUTHORS.map(option => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className='w-full max-w-sm font-semibold'>
                              <SelectValue placeholder='Select an option' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LIST_CATEGORIES.map(option => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
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
                  </FormControl>
                  {tags.length > 0 && (
                    <div className='flex flex-wrap gap-2 mt-2'>
                      {tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant='outline'
                          className='space-x-1'
                        >
                          {tag}
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

                <FormField
                  control={form.control}
                  name='image'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='https://example.com/image.jpg'
                          {...field}
                        />
                      </FormControl>
                      {field.value && (
                        <img
                          src={field.value}
                          alt='Post Preview'
                          className='mt-2 w-full h-32 object-cover rounded-md border'
                        />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='estimatedReadingTime'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Reading Time *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter reading time (e.g., 5 min)...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content *</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={20}
                          placeholder='Enter post content...'
                          {...field}
                          className={cn(
                            'min-h-[400px]',
                            field.value && field.value.length > 200
                              ? 'border-red-500'
                              : ''
                          )}
                        />
                      </FormControl>
                      <p className='text-xs text-muted-foreground'>
                        {field.value?.length || 0} characters
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className='pt-4 border-t'>
              <DialogClose asChild onClick={() => setIsDialogOpen(false)}>
                <Button
                  variant='outline'
                  disabled={form.formState.isSubmitting}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type='submit' disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Publishing...' : 'Publish Post'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
