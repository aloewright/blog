import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import '../global.css';

function RootLayoutNav() {
  const { actualTheme } = useTheme();

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: actualTheme === 'dark' ? '#0a0a0a' : '#ffffff',
          },
          headerTintColor: actualTheme === 'dark' ? '#ffffff' : '#000000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: actualTheme === 'dark' ? '#050505' : '#ffffff',
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="about" options={{ title: 'About' }} />
        <Stack.Screen name="demo" options={{ title: 'Theme Demo' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={actualTheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
