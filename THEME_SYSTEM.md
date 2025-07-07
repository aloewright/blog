# Dark Theme Design System

This project implements a comprehensive dark theme design system with scientific/technical aesthetics using NativeWind (Tailwind CSS for React Native) and custom UI components.

## Features

### 🎨 Scientific/Technical Color Palette

- **Primary (Electric Blue)**: Interactive elements and CTAs
  - Main: `#0077e6`
  - Range: 50-950 shades
  
- **Secondary (Cyan)**: Supporting elements and highlights
  - Main: `#00e6cc`
  - Range: 50-950 shades
  
- **Accent (Neon Green)**: Success states and special highlights
  - Main: `#66e600`
  - Range: 50-950 shades
  
- **Dark Backgrounds**: Multiple levels for depth
  - `dark-*`: Standard dark backgrounds
  - `void-*`: Ultra-dark backgrounds for maximum contrast

### 🌓 Theme System

- **Three Modes**: Light, Dark, and System (follows device preference)
- **Persistent Storage**: Theme preference saved using AsyncStorage
- **Smooth Transitions**: Automatic UI updates when switching themes
- **System Integration**: Respects device-level dark mode settings

### 🧩 UI Components

All components are built with NativeWind and support dark/light themes:

1. **Button**
   - Variants: default, secondary, accent, outline, ghost, destructive
   - Sizes: sm, md, lg, xl
   - States: loading, disabled
   - Special effects: glow, neon shadows

2. **Card**
   - Sections: Card, CardHeader, CardTitle, CardContent, CardFooter
   - Dark theme optimized with proper contrast

3. **Input**
   - Label support
   - Error states
   - Focus effects with glow
   - Keyboard type support

4. **Switch**
   - Label support
   - Themed track and thumb colors
   - Disabled state

### ✨ Special Effects

- **Glow Shadow**: `shadow-glow` for primary elements
- **Neon Shadow**: `shadow-neon` for accent elements
- **Pulse Animation**: `animate-pulse-glow` for attention-grabbing elements
- **Scan Line Animation**: `animate-scan-line` for tech aesthetic

## Usage

### Setting Up Theme Provider

The app is wrapped with `ThemeProvider` in `app/_layout.tsx`:

```tsx
import { ThemeProvider } from '../contexts/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
```

### Using Theme in Components

```tsx
import { useTheme } from '../contexts/ThemeContext';

function MyComponent() {
  const { theme, actualTheme, setTheme } = useTheme();
  
  return (
    <View className={actualTheme === 'dark' ? 'bg-void-950' : 'bg-white'}>
      {/* Your content */}
    </View>
  );
}
```

### Using UI Components

```tsx
import { Button, Card, Input, Switch } from '../components/ui';

// Button examples
<Button variant="primary">Click Me</Button>
<Button variant="accent" size="lg">Large Accent</Button>
<Button loading>Loading...</Button>

// Card example
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Text>Content goes here</Text>
  </CardContent>
</Card>

// Input example
<Input
  label="Email"
  placeholder="Enter your email"
  error="Invalid email"
/>

// Switch example
<Switch
  label="Enable notifications"
  value={enabled}
  onValueChange={setEnabled}
/>
```

### Applying Theme Classes

Use Tailwind classes with theme-aware colors:

```tsx
// Text colors
<Text className="text-primary-500">Primary text</Text>
<Text className="text-secondary-400">Secondary text</Text>

// Backgrounds
<View className="bg-dark-900">Dark background</View>
<View className="bg-void-950">Ultra dark background</View>

// Borders and effects
<View className="border-2 border-primary-500 shadow-glow">
  Glowing border
</View>
```

## Theme Switching

Users can switch themes in the Settings tab. The `ThemeSelector` component provides a visual interface for choosing between Light, Dark, and System themes.

## Demo

Visit the Theme Demo page from the home screen to see all components and color palettes in action. The demo showcases:

- All button variants
- Input field states
- Switch components
- Complete color palette
- Special effects (glow, neon, animations)

## Web Compatibility

While this system is built for React Native with NativeWind, the same Tailwind configuration can be used for web components. For web-specific components, you can use shadcn/ui with the same color palette defined in `tailwind.config.js`.

## Future Enhancements

- Add more animation effects
- Create additional component variants
- Implement theme-aware icons
- Add haptic feedback for interactions
- Create more specialized scientific UI components (graphs, data displays)
