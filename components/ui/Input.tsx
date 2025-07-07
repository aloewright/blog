import React from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import { cn } from '../../utils/cn';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, label, error, containerClassName, ...props }, ref) => {
    return (
      <View className={cn('w-full', containerClassName)}>
        {label && (
          <Text className="text-sm font-medium text-gray-300 mb-1">
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-700',
            'text-white placeholder:text-gray-500',
            'focus:border-primary-500 focus:shadow-glow',
            error && 'border-error-500',
            className
          )}
          placeholderTextColor="#6b7280"
          {...props}
        />
        {error && (
          <Text className="text-sm text-error-500 mt-1">{error}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';
