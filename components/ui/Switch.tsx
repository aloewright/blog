import React from 'react';
import { Switch as RNSwitch, SwitchProps as RNSwitchProps, View, Text } from 'react-native';
import { cn } from '../../utils/cn';

export interface SwitchProps extends RNSwitchProps {
  label?: string;
  containerClassName?: string;
}

export const Switch = React.forwardRef<RNSwitch, SwitchProps>(
  ({ label, containerClassName, ...props }, ref) => {
    return (
      <View className={cn('flex-row items-center justify-between', containerClassName)}>
        {label && (
          <Text className="text-base text-gray-300 mr-3">{label}</Text>
        )}
        <RNSwitch
          ref={ref}
          trackColor={{ false: '#374151', true: '#0077e6' }}
          thumbColor={props.value ? '#ffffff' : '#9ca3af'}
          ios_backgroundColor="#374151"
          {...props}
        />
      </View>
    );
  }
);

Switch.displayName = 'Switch';
