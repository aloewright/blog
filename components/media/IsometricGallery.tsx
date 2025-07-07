import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { OptimizedImage } from './OptimizedImage';

interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  tags?: string[];
}

interface IsometricGalleryProps {
  items: GalleryItem[];
  columns?: number;
  gap?: number;
  isometricAngle?: number;
  onItemPress?: (item: GalleryItem) => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const GalleryCard: React.FC<{
  item: GalleryItem;
  index: number;
  onPress?: () => void;
  isometricAngle: number;
}> = ({ item, index, onPress, isometricAngle }) => {
  const [showText, setShowText] = useState(false);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);

  const handlePress = useCallback(() => {
    'worklet';
    // Toggle text reveal
    const newShowText = !showText;
    runOnJS(setShowText)(newShowText);
    
    if (newShowText) {
      rotation.value = withSpring(0);
      scale.value = withSpring(1.05);
      textOpacity.value = withTiming(1, { duration: 300 });
      textTranslateY.value = withSpring(0);
    } else {
      rotation.value = withSpring(isometricAngle);
      scale.value = withSpring(1);
      textOpacity.value = withTiming(0, { duration: 200 });
      textTranslateY.value = withSpring(20);
    }
    
    if (onPress) {
      runOnJS(onPress)();
    }
  }, [showText, rotation, scale, textOpacity, textTranslateY, isometricAngle, onPress]);

  // Initial isometric transform
  React.useEffect(() => {
    rotation.value = withSpring(isometricAngle, {
      damping: 15,
      stiffness: 100,
    });
  }, [rotation, isometricAngle]);

  const animatedCardStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      rotation.value,
      [-45, 0, 45],
      ['-45deg', '0deg', '45deg'],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { perspective: 1000 },
        { rotateY },
        { scale: scale.value },
      ],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  const { width } = Dimensions.get('window');
  const cardWidth = (width - 48) / 2; // 2 columns with padding

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={[styles.card, animatedCardStyle]}
    >
      <View style={[styles.cardContent, { width: cardWidth }]}>
        <OptimizedImage
          source={item.imageUrl}
          width={cardWidth}
          height={cardWidth * 0.75}
          style={styles.cardImage}
          contentFit="cover"
        />
        
        <Animated.View style={[styles.textOverlay, animatedTextStyle]}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.description}
          </Text>
          {item.tags && item.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {item.tags.slice(0, 3).map((tag, tagIndex) => (
                <View key={tagIndex} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </Animated.View>
      </View>
    </AnimatedTouchableOpacity>
  );
};

export const IsometricGallery: React.FC<IsometricGalleryProps> = ({
  items,
  columns = 2,
  gap = 16,
  isometricAngle = 15,
  onItemPress,
}) => {
  const scrollY = useSharedValue(0);

  const handleScroll = useCallback((event: any) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  }, [scrollY]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View style={[styles.grid, { gap }]}>
        {items.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={index}
            isometricAngle={index % 2 === 0 ? isometricAngle : -isometricAngle}
            onPress={() => onItemPress?.(item)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  cardContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardDescription: {
    color: '#e0e0e0',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default IsometricGallery;
