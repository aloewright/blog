import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  OptimizedImage,
  VideoPlayer,
  IsometricGallery,
} from '../components/media';
import { responsive, spacing, fontSize } from '../utils/responsive';

// Sample data for gallery
const galleryItems = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    title: 'Mountain Vista',
    description: 'Breathtaking mountain landscape with morning mist',
    tags: ['nature', 'landscape', 'mountains'],
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1682687221038-404670f09ef1',
    title: 'Ocean Waves',
    description: 'Crystal clear ocean waves hitting the shore',
    tags: ['ocean', 'beach', 'nature'],
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1682687220499-d9c06b872eee',
    title: 'Forest Path',
    description: 'Serene forest path covered in autumn leaves',
    tags: ['forest', 'autumn', 'nature'],
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1682687221080-5cb261c645cb',
    title: 'City Lights',
    description: 'Urban skyline illuminated at twilight',
    tags: ['city', 'urban', 'night'],
  },
];

export default function MediaShowcase() {
  const handleGalleryItemPress = (item: any) => {
    console.log('Gallery item pressed:', item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <Text style={styles.title}>Media Management Showcase</Text>
          <Text style={styles.subtitle}>
            Optimized images, video players, and galleries
          </Text>

          {/* Optimized Image Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Optimized Images</Text>
            <Text style={styles.sectionDescription}>
              Lazy loading with blur placeholders and automatic optimization
            </Text>
            
            <View style={styles.imageGrid}>
              <OptimizedImage
                source="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
                width={responsive({ base: 150, md: 200 })}
                height={responsive({ base: 100, md: 133 })}
                style={styles.gridImage}
              />
              <OptimizedImage
                source="https://images.unsplash.com/photo-1682687221038-404670f09ef1"
                width={responsive({ base: 150, md: 200 })}
                height={responsive({ base: 100, md: 133 })}
                style={styles.gridImage}
              />
            </View>
          </View>

          {/* Video Player Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Video Player</Text>
            <Text style={styles.sectionDescription}>
              Custom controls with fullscreen support
            </Text>
            
            <VideoPlayer
              source="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
              width={responsive({ base: 320, md: 400 })}
              height={responsive({ base: 180, md: 225 })}
              showControls={true}
              autoPlay={false}
            />
          </View>

          {/* Isometric Gallery Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Isometric Gallery</Text>
            <Text style={styles.sectionDescription}>
              3D-style gallery with text reveal animations
            </Text>
          </View>
        </View>
        
        {/* Gallery takes full width */}
        <IsometricGallery
          items={galleryItems}
          onItemPress={handleGalleryItemPress}
          isometricAngle={20}
        />
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All media components are optimized for performance
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: spacing.md,
  },
  title: {
    fontSize: fontSize['3xl'],
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.lg,
    color: '#6b7280',
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: spacing.xs,
  },
  sectionDescription: {
    fontSize: fontSize.base,
    color: '#6b7280',
    marginBottom: spacing.md,
  },
  imageGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  gridImage: {
    borderRadius: 8,
  },
  footer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: fontSize.sm,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
