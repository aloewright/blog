import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Button, Card, CardHeader, CardTitle, CardContent, Input, Switch } from '../components/ui';
import { useTheme } from '../contexts/ThemeContext';

export default function DemoPage() {
  const { actualTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <ScrollView className={`flex-1 ${actualTheme === 'dark' ? 'bg-void-950' : 'bg-gray-50'}`}>
      <View className="p-4 space-y-6">
        <Text className={`text-3xl font-bold mb-6 ${actualTheme === 'dark' ? 'text-primary-400' : 'text-gray-900'}`}>
          Scientific Theme Demo
        </Text>

        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="space-y-3">
              <Button variant="default">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="accent">Accent Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="destructive">Destructive Button</Button>
              <Button loading>Loading Button</Button>
              <Button disabled>Disabled Button</Button>
            </View>
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Input Fields</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="space-y-4">
              <Input
                label="Standard Input"
                placeholder="Enter some text..."
                value={inputValue}
                onChangeText={setInputValue}
              />
              <Input
                label="Email Input"
                placeholder="email@example.com"
                keyboardType="email-address"
              />
              <Input
                label="Password Input"
                placeholder="Enter password"
                secureTextEntry
              />
              <Input
                label="Error Input"
                placeholder="This has an error"
                error="This field is required"
              />
            </View>
          </CardContent>
        </Card>

        {/* Switches Section */}
        <Card>
          <CardHeader>
            <CardTitle>Switches & Toggles</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="space-y-4">
              <Switch
                label="Enable Notifications"
                value={switchValue}
                onValueChange={setSwitchValue}
              />
              <Switch
                label="Dark Mode (System)"
                value={actualTheme === 'dark'}
                disabled
              />
            </View>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="space-y-2">
              <View className="flex-row space-x-2">
                <View className="flex-1 h-20 bg-primary-500 rounded-lg items-center justify-center">
                  <Text className="text-white font-bold">Primary</Text>
                </View>
                <View className="flex-1 h-20 bg-secondary-500 rounded-lg items-center justify-center">
                  <Text className="text-white font-bold">Secondary</Text>
                </View>
              </View>
              <View className="flex-row space-x-2">
                <View className="flex-1 h-20 bg-accent-500 rounded-lg items-center justify-center">
                  <Text className="text-white font-bold">Accent</Text>
                </View>
                <View className="flex-1 h-20 bg-warning-500 rounded-lg items-center justify-center">
                  <Text className="text-white font-bold">Warning</Text>
                </View>
              </View>
              <View className="flex-row space-x-2">
                <View className="flex-1 h-20 bg-error-500 rounded-lg items-center justify-center">
                  <Text className="text-white font-bold">Error</Text>
                </View>
                <View className="flex-1 h-20 bg-dark-900 rounded-lg items-center justify-center border border-dark-700">
                  <Text className="text-gray-300 font-bold">Dark</Text>
                </View>
              </View>
            </View>
          </CardContent>
        </Card>

        {/* Special Effects */}
        <Card>
          <CardHeader>
            <CardTitle>Special Effects</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="space-y-4">
              <View className="p-4 bg-primary-500/10 rounded-lg border-2 border-primary-500 shadow-glow">
                <Text className="text-primary-400 text-center">Glow Effect</Text>
              </View>
              <View className="p-4 bg-accent-500/10 rounded-lg border-2 border-accent-500 shadow-neon">
                <Text className="text-accent-400 text-center">Neon Effect</Text>
              </View>
              <Button variant="accent" className="animate-pulse-glow">
                Pulsing Button
              </Button>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
