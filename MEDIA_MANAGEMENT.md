# Media Management System

A comprehensive media management system for React Native/Expo applications with Strapi backend integration, cloud storage support, and optimized components.

## Features

### 1. **Strapi Media Library Configuration**
- Configured for Cloudflare R2 storage (S3-compatible)
- Alternative Google Cloud Storage support
- Automatic image optimization on upload
- Support for multiple image formats (JPEG, PNG, WebP, AVIF)

### 2. **Optimized Image Component**
- Lazy loading with blur hash placeholders
- Automatic format selection (WebP, AVIF)
- Responsive image sizing
- Memory and disk caching
- Progressive loading animations
- Cloudflare image transformation support

### 3. **Video Player Component**
- Custom controls for web and mobile
- Auto-hide controls with timer
- Progress bar with seek functionality
- Volume and mute controls
- Fullscreen support (iOS)
- Poster image support
- Loading states

### 4. **Isometric Gallery Component**
- 3D isometric card layout
- Text reveal animations on tap
- Responsive grid layout
- Tag support
- Smooth animations with Reanimated 2
- Platform-specific shadows

### 5. **Responsive Utilities**
- Breakpoint-based responsive values
- Platform-specific styling
- Media query hooks
- Orientation detection
- Dynamic grid calculations

## Setup

### 1. Install Dependencies

```bash
# Frontend dependencies
npm install expo-image expo-av react-native-reanimated react-native-gesture-handler

# Strapi backend dependencies
cd strapi-backend
npm install @strapi/provider-upload-aws-s3 sharp
```

### 2. Configure Strapi

Add the following environment variables to your `.env` file:

```env
# Cloudflare R2 Configuration
CLOUDFLARE_R2_ENDPOINT=https://<accountid>.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your-r2-access-key-id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
CLOUDFLARE_R2_BUCKET=your-bucket-name
CLOUDFLARE_R2_PUBLIC_URL=https://your-custom-domain.com
```

### 3. Cloudflare R2 Setup

1. Create a Cloudflare account and enable R2
2. Create a new R2 bucket
3. Generate API tokens with R2 read/write permissions
4. Set up a custom domain for public access (optional)

## Usage

### Optimized Image

```tsx
import { OptimizedImage } from './components/media';

<OptimizedImage
  source="https://your-cdn.com/image.jpg"
  width={300}
  height={200}
  contentFit="cover"
  placeholder="LGF5]+Yk^6#M@-5c,1J5@[or[Q6."
  priority="high"
  onLoad={() => console.log('Image loaded')}
/>
```

### Video Player

```tsx
import { VideoPlayer } from './components/media';

<VideoPlayer
  source="https://your-cdn.com/video.mp4"
  poster="https://your-cdn.com/poster.jpg"
  width={400}
  height={225}
  showControls={true}
  autoPlay={false}
  loop={false}
  muted={false}
  onLoad={() => console.log('Video loaded')}
/>
```

### Isometric Gallery

```tsx
import { IsometricGallery } from './components/media';

const galleryItems = [
  {
    id: '1',
    imageUrl: 'https://your-cdn.com/image1.jpg',
    title: 'Gallery Item 1',
    description: 'Description for item 1',
    tags: ['tag1', 'tag2']
  },
  // ... more items
];

<IsometricGallery
  items={galleryItems}
  columns={2}
  gap={16}
  isometricAngle={20}
  onItemPress={(item) => console.log('Item pressed:', item)}
/>
```

### Responsive Utilities

```tsx
import { responsive, useMediaQuery, platformStyles } from './utils/responsive';

// Responsive values
const width = responsive({
  base: 100,
  sm: 150,
  md: 200,
  lg: 300
});

// Media query hook
const isLargeScreen = useMediaQuery('lg');

// Platform-specific styles
const styles = platformStyles({
  common: { padding: 10 },
  web: { cursor: 'pointer' },
  ios: { shadowOpacity: 0.2 },
  android: { elevation: 4 }
});
```

## Performance Optimization

### Image Optimization
- Images are automatically converted to modern formats (WebP, AVIF)
- Multiple sizes are generated for different screen resolutions
- Lazy loading prevents unnecessary network requests
- Blur hash placeholders provide immediate visual feedback

### Video Optimization
- Videos use adaptive streaming when available
- Poster images are shown before playback
- Controls auto-hide to maximize viewing area
- Hardware acceleration is enabled by default

### Gallery Optimization
- Only visible items are rendered
- Images load on-demand as user scrolls
- Animations use the native driver for 60fps performance
- Touch interactions are optimized for responsiveness

## Customization

### Custom Image Transformations

Modify the `buildOptimizedUrl` function in `OptimizedImage.tsx`:

```tsx
const buildOptimizedUrl = (url: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  blur?: number;
  grayscale?: boolean;
}) => {
  // Add custom transformation parameters
};
```

### Custom Video Controls

Extend the `VideoPlayer` component with additional controls:

```tsx
// Add playback speed control
<TouchableOpacity onPress={() => video.current?.setRateAsync(2)}>
  <Text>2x Speed</Text>
</TouchableOpacity>
```

### Gallery Animations

Customize the isometric effect in `IsometricGallery.tsx`:

```tsx
// Modify rotation angles
isometricAngle={30} // More dramatic 3D effect

// Custom animation timing
rotation.value = withSpring(angle, {
  damping: 10, // Less bouncy
  stiffness: 200, // Faster animation
});
```

## Troubleshooting

### Common Issues

1. **Images not loading from Cloudflare R2**
   - Verify your R2 bucket has public access enabled
   - Check CORS configuration on your bucket
   - Ensure environment variables are set correctly

2. **Video playback issues on Android**
   - Some Android devices have codec limitations
   - Consider using HLS or DASH for better compatibility
   - Provide multiple format options (MP4, WebM)

3. **Performance issues with large galleries**
   - Implement virtualization for very long lists
   - Reduce image quality for thumbnails
   - Use pagination or infinite scroll

### Debug Mode

Enable debug logging:

```tsx
// In OptimizedImage.tsx
const DEBUG = true;

if (DEBUG) {
  console.log('Loading image:', optimizedSource);
}
```

## Future Enhancements

- [ ] Add video thumbnail generation
- [ ] Implement image cropping/editing
- [ ] Add 360° image viewer
- [ ] Support for AR media viewing
- [ ] Implement media upload progress indicators
- [ ] Add media search and filtering
- [ ] Support for HDR images and videos
- [ ] Implement media analytics tracking
