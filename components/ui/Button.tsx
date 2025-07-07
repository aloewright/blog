import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-lg transition-all active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 shadow-glow',
        secondary: 'bg-secondary-500 shadow-sm',
        outline: 'border-2 border-primary-500 bg-transparent',
        ghost: 'bg-transparent',
        destructive: 'bg-error-500',
        accent: 'bg-accent-500 shadow-neon',
      },
      size: {
        sm: 'px-3 py-2',
        md: 'px-4 py-2.5',
        lg: 'px-6 py-3',
        xl: 'px-8 py-4',
      },
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      disabled: false,
    },
  }
);

const buttonTextVariants = cva(
  'text-center font-sans',
  {
    variants: {
      variant: {
        default: 'text-white',
        secondary: 'text-white',
        outline: 'text-primary-500',
        ghost: 'text-primary-500',
        destructive: 'text-white',
        accent: 'text-white',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  ({ className, variant, size, disabled, loading, children, ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <TouchableOpacity
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, disabled: isDisabled }),
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'outline' || variant === 'ghost' ? '#0077e6' : '#ffffff'}
          />
        ) : (
          <Text className={cn(buttonTextVariants({ variant, size }))}>
            {children}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
