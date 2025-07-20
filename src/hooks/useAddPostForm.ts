import { URL_REGEX } from '@/constants/validate';
import type { IFormRefs, IMessageError } from '@/types/validate';
import { useEffect, useRef, useState } from 'react';
import * as z from 'zod';

const FORM_REFS: IFormRefs[] = [
  {
    ref: 'inputRef',
    path: 'title',
  },
  {
    ref: 'excerptRef',
    path: 'excerpt',
  },
  {
    ref: 'authorRef',
    path: 'author',
  },
  {
    ref: 'categoryRef',
    path: 'category',
  },
  {
    ref: 'imageRef',
    path: 'image',
  },
  {
    ref: 'tagsRef',
    path: 'tags',
  },
  {
    ref: 'estimatedReadingTimeRef',
    path: 'estimatedReadingTime',
  },
  {
    ref: 'contentRef',
    path: 'content',
  },
];

export const useAddPostForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const excerptRef = useRef<HTMLTextAreaElement>(null);
  const authorRef = useRef<string | null>(null);
  const categoryRef = useRef<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const estimatedReadingTimeRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const postSchema = z.object({
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

  const [errors, setErrors] = useState<IMessageError[]>([]);
  const refFocused = useRef(false);

  useEffect(() => {
    FORM_REFS.forEach(ref => {
      const element = document.querySelector(`[name="${ref.path}"]`);
      const error = errors.find(error => error.path === ref.path);
      if (element && error) {
        element.classList.add('border-red-500');
        if (
          !refFocused.current &&
          (element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement)
        ) {
          element.focus();
          refFocused.current = true;
        }
      } else if (element) {
        element.classList.remove('border-red-500');
      }
    });
  }, [errors]);
  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    refFocused.current = false;
    if (
      !inputRef.current ||
      !contentRef.current ||
      !excerptRef.current ||
      !imageRef.current ||
      !estimatedReadingTimeRef.current
    )
      return;
    const title = inputRef.current.value;
    const content = contentRef.current.value;
    const excerpt = excerptRef.current.value;
    const author = authorRef.current || '';
    const category = categoryRef.current || '';
    const estimatedReadingTime = estimatedReadingTimeRef.current.value || '';
    const image = imageRef.current?.value || '';
    try {
      const values = postSchema.parse({
        title,
        content,
        excerpt,
        author,
        category,
        estimatedReadingTime,
        image,
      });
      setIsPublishing(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Form submitted successfully:', values);
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issues = error.issues;
        console.log(issues);
        const newErrors: IMessageError[] = issues.map(issue => ({
          path: issue.path[0] as string,
          message: issue.message,
        }));
        setErrors(newErrors);
      }
    } finally {
      setIsPublishing(false);
    }
  };

  function resetForm() {
    setErrors([]);
    setTags([]);
    if (inputRef.current) inputRef.current.value = '';
    if (contentRef.current) contentRef.current.value = '';
    if (excerptRef.current) excerptRef.current.value = '';
    if (imageRef.current) imageRef.current.value = '';
    if (estimatedReadingTimeRef.current)
      estimatedReadingTimeRef.current.value = '';
    if (authorRef.current) authorRef.current = '';
    if (categoryRef.current) categoryRef.current = '';
  }
  return {
    // State
    tags,
    isPublishing,
    isDialogOpen,

    // Refs
    inputRef,
    contentRef,
    postSchema,
    onSubmit,
    errors,
    setErrors,
    excerptRef,
    authorRef,
    categoryRef,
    imageRef,
    estimatedReadingTimeRef,

    // Methods
    setTags,
    resetForm,
    setIsPublishing,
    setIsDialogOpen,
  };
};
