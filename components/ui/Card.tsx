import React from 'react';
import { View, ViewProps, Text } from 'react-native';
import { cn } from '../../utils/cn';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export const Card = React.forwardRef<View, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          'rounded-lg bg-dark-900 border border-dark-800 p-4 shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </View>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<View, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn('pb-4', className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<Text, { children: React.ReactNode; className?: string }>(
  ({ className, children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        className={cn(
          'text-2xl font-bold text-primary-400',
          className
        )}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

CardTitle.displayName = 'CardTitle';

export const CardContent = React.forwardRef<View, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn('', className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<View, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn('pt-4 flex-row items-center', className)}
        {...props}
      >
        {children}
      </View>
    );
  }
);

CardFooter.displayName = 'CardFooter';
