import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../utils/cn';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes: Array<{ value: 'light' | 'dark' | 'system'; label: string; icon: string }> = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '⚙️' },
  ];

  return (
    <View className="bg-dark-900 rounded-lg p-4">
      <Text className="text-lg font-semibold text-gray-200 mb-3">Theme</Text>
      <View className="flex-row justify-between">
        {themes.map((t) => (
          <TouchableOpacity
            key={t.value}
            onPress={() => setTheme(t.value)}
            className={cn(
              'flex-1 mx-1 py-3 px-4 rounded-lg border-2 items-center',
              theme === t.value
                ? 'border-primary-500 bg-primary-500/10'
                : 'border-dark-700 bg-dark-800'
            )}
          >
            <Text className="text-2xl mb-1">{t.icon}</Text>
            <Text
              className={cn(
                'text-sm',
                theme === t.value ? 'text-primary-400' : 'text-gray-400'
              )}
            >
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
