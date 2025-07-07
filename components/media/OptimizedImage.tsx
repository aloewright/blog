import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { Image, ImageContentFit } from 'expo-image';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  FadeIn,
} from 'react-native-reanimated';

interface OptimizedImageProps {
  source: string;
  alt?: string;
  width?: number;
  height?: number;
  style?: ViewStyle;
  contentFit?: ImageContentFit;
  placeholder?: string;
  transition?: number;
  priority?: 'low' | 'normal' | 'high';
  onLoad?: () => void;
  onError?: (error: any) => void;
}

// Cloudflare image transformation URL builder
const buildOptimizedUrl = (url: string, options: { width?: number; height?: number; quality?: number }) => {
  if (!url || !url.includes('cloudflare')) return url;
  
  const { width, height, quality = 85 } = options;
  const params = new URLSearchParams();
  
  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());
  params.append('quality', quality.toString());
  params.append('format', 'auto'); // Auto format selection (webp, avif, etc.)
  
  return `${url}?${params.toString()}`;
};

// Generate blur placeholder
const generateBlurHash = (url: string): string => {
  // This is a placeholder blur hash - in production, generate these server-side
  return 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.';
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  source,
  alt,
  width,
  height,
  style,
  contentFit = 'cover',
  placeholder,
  transition = 300,
  priority = 'normal',
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const opacity = useSharedValue(0);

  // Build optimized URL
  const optimizedSource = buildOptimizedUrl(source, { width, height });
  
  // Use blur hash or provided placeholder
  const blurHash = placeholder || generateBlurHash(source);

  const handleLoad = () => {
    setIsLoading(false);
    opacity.value = withTiming(1, { duration: transition });
    onLoad?.();
  };

  const handleError = (error: any) => {
    setIsLoading(false);
    console.error('Image load error:', error);
    onError?.(error);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.container, { width, height }, style]}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#999" />
        </View>
      )}
      
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image
          source={{ uri: optimizedSource }}
          style={styles.image}
          contentFit={contentFit}
          placeholder={blurHash}
          placeholderContentFit="cover"
          transition={transition}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError}
          cachePolicy="memory-disk"
          recyclingKey={optimizedSource}
          alt={alt}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default OptimizedImage;
