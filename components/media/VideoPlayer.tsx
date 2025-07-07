import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

interface VideoPlayerProps {
  source: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showControls?: boolean;
  width?: number;
  height?: number;
  style?: any;
  onLoad?: () => void;
  onError?: (error: any) => void;
  onPlaybackStatusUpdate?: (status: AVPlaybackStatus) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  source,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  showControls = true,
  width,
  height,
  style,
  onLoad,
  onError,
  onPlaybackStatusUpdate,
}) => {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showControlsOverlay, setShowControlsOverlay] = useState(true);
  const controlsOpacity = useSharedValue(1);

  // Auto-hide controls after 3 seconds
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null);

  const resetControlsTimer = useCallback(() => {
    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current);
    }
    
    setShowControlsOverlay(true);
    controlsOpacity.value = withTiming(1, { duration: 200 });

    hideControlsTimer.current = setTimeout(() => {
      if (status?.isPlaying) {
        controlsOpacity.value = withTiming(0, { duration: 200 });
        setTimeout(() => setShowControlsOverlay(false), 200);
      }
    }, 3000);
  }, [status?.isPlaying, controlsOpacity]);

  const handlePlayPause = useCallback(async () => {
    if (!video.current || !status) return;

    if (status.isPlaying) {
      await video.current.pauseAsync();
    } else {
      await video.current.playAsync();
    }
    resetControlsTimer();
  }, [status, resetControlsTimer]);

  const handleStatusUpdate = useCallback((newStatus: AVPlaybackStatus) => {
    setStatus(newStatus);
    
    if (newStatus.isLoaded) {
      setIsLoading(false);
      onLoad?.();
      
      if (!newStatus.isPlaying) {
        setShowControlsOverlay(true);
        controlsOpacity.value = withTiming(1, { duration: 200 });
      }
    }
    
    onPlaybackStatusUpdate?.(newStatus);
  }, [onLoad, onPlaybackStatusUpdate, controlsOpacity]);

  const handleError = useCallback((error: any) => {
    setIsLoading(false);
    console.error('Video playback error:', error);
    onError?.(error);
  }, [onError]);

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const animatedControlsStyle = useAnimatedStyle(() => ({
    opacity: controlsOpacity.value,
  }));

  const dimensions = {
    width: width || Dimensions.get('window').width,
    height: height || (width || Dimensions.get('window').width) * 9 / 16,
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.container, dimensions, style]}
      onPress={resetControlsTimer}
    >
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: source }}
        posterSource={poster ? { uri: poster } : undefined}
        posterStyle={styles.poster}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        isLooping={loop}
        shouldPlay={autoPlay}
        isMuted={muted}
        onPlaybackStatusUpdate={handleStatusUpdate}
        onError={handleError}
      />

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {showControls && showControlsOverlay && status?.isLoaded && (
        <Animated.View style={[styles.controlsOverlay, animatedControlsStyle]}>
          {/* Play/Pause Button */}
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={handlePlayPause}
          >
            <Ionicons
              name={status.isPlaying ? 'pause' : 'play'}
              size={48}
              color="#fff"
            />
          </TouchableOpacity>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <Text style={styles.timeText}>
              {formatTime(status.positionMillis || 0)} / {formatTime(status.durationMillis || 0)}
            </Text>

            <View style={styles.controlButtons}>
              <TouchableOpacity
                onPress={async () => {
                  if (video.current) {
                    await video.current.setIsMutedAsync(!status.isMuted);
                  }
                }}
              >
                <Ionicons
                  name={status.isMuted ? 'volume-mute' : 'volume-high'}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>

              {Platform.OS === 'ios' && (
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={async () => {
                    if (video.current) {
                      await video.current.presentFullscreenPlayer();
                    }
                  }}
                >
                  <Ionicons name="expand" size={24} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${
                      ((status.positionMillis || 0) / (status.durationMillis || 1)) * 100
                    }%`,
                  },
                ]}
              />
            </View>
          </View>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  poster: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  controlButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  controlButton: {
    marginLeft: 20,
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default VideoPlayer;
