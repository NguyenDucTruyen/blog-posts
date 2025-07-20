import { Label } from '@/components/ui/label';
import type { IMessageError } from '@/types/validate';
import { AlertCircle } from 'lucide-react';

export const FormItem = ({
  errors,
  name,
  children,
  required = false,
  label,
}: {
  errors: IMessageError[];
  name: string;
  children?: React.ReactNode;
  required?: boolean;
  label?: string;
}) => {
  const message = errors.find(error => error.path === name)?.message;
  return (
    <div className='space-y-2'>
      <Label htmlFor={name} className={message ? 'text-red-500' : ''}>
        {label} {required && '*'}
      </Label>
      {children}
      {message && (
        <p className='text-sm text-red-500 flex items-center gap-1'>
          <AlertCircle className='' size={12} />
          {message}
        </p>
      )}
    </div>
  );
};
