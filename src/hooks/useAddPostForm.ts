import { URL_REGEX } from '@/constants/validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const useAddPostForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const formSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    excerpt: z
      .string()
      .min(20, 'Excerpt must be at least 20 characters long')
      .max(200, 'Excerpt must be at most 200 characters long'),
    author: z.string().min(1, 'Author is required'),
    category: z.string().min(1, 'Category is required'),
    image: z.string().regex(URL_REGEX, 'Image URL is invalid'),
    estimatedReadingTime: z
      .string()
      .min(1, 'Estimated reading time is required'),
    content: z
      .string()
      .min(100, 'Content must be at least 100 characters long'),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      author: '',
      category: '',
      estimatedReadingTime: '',
      content: '',
    },
  });

  function resetForm() {
    form.reset();
    setTags([]);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsDialogOpen(false);
    resetForm();
    console.log(values);
  }

  return {
    isDialogOpen,
    tags,
    form,
    setTags,
    setIsDialogOpen,
    onSubmit,
    resetForm,
  };
};
