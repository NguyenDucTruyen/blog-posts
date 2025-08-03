import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

const sizeStyles = {
  small: {
    padding: 'px-3 py-1.5',
    fontSize: 'text-sm',
    height: 'h-8',
    iconSize: 14,
    gap: 'gap-1.5',
  },
  medium: {
    padding: 'px-4 py-2',
    fontSize: 'text-base',
    height: 'h-10',
    iconSize: 16,
    gap: 'gap-2',
  },
  large: {
    padding: 'px-6 py-3',
    fontSize: 'text-lg',
    height: 'h-12',
    iconSize: 18,
    gap: 'gap-2.5',
  },
};

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300',
  secondary:
    'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400',
  outline:
    'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:text-gray-400',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 disabled:text-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300',
};

const LoadingSpinner = ({ size }: { size: number }) => (
  <Loader2 className='animate-spin' width={size} height={size} />
);

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'medium',
      variant = 'primary',
      icon,
      iconPosition = 'left',
      loading = false,
      loadingText,
      fullWidth = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const styles = sizeStyles[size];
    const isDisabled = disabled || loading;

    const renderIcon = () => {
      if (loading) return <LoadingSpinner size={styles.iconSize} />;
      if (!icon) return null;

      return (
        <span
          className='flex items-center justify-center shrink-0'
          style={{ width: styles.iconSize, height: styles.iconSize }}
        >
          {icon}
        </span>
      );
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          'inline-flex items-center justify-center border rounded-md font-medium transition-all focus:outline-none disabled:cursor-not-allowed',
          styles.padding,
          styles.fontSize,
          styles.height,
          styles.gap,
          variantStyles[variant],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {iconPosition === 'left' && renderIcon()}
        {loading ? (
          loadingText || 'Loading...'
        ) : (
          <span className='truncate'>{children}</span>
        )}
        {iconPosition === 'right' && !loading && renderIcon()}
      </button>
    );
  }
);

CustomButton.displayName = 'CustomButton';
