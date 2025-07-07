import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface DemoEmbedProps {
  title: string;
  url: string;
  type: string;
  embedCode?: string;
  isEmbedded?: boolean;
}

export const DemoEmbed: React.FC<DemoEmbedProps> = ({
  title,
  url,
  type,
  embedCode,
  isEmbedded = false,
}) => {
  const { theme } = useTheme();

  const handleOpenExternal = () => {
    Linking.openURL(url);
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'live-demo':
        return '🌐';
      case 'video':
        return '▶️';
      case 'codesandbox':
        return '📦';
      case 'codepen':
        return '✏️';
      case 'stackblitz':
        return '⚡';
      case 'github':
        return '💻';
      case 'figma':
        return '🎨';
      default:
        return '🔗';
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'live-demo':
        return 'Live Demo';
      case 'video':
        return 'Video Demo';
      case 'codesandbox':
        return 'CodeSandbox';
      case 'codepen':
        return 'CodePen';
      case 'stackblitz':
        return 'StackBlitz';
      case 'github':
        return 'GitHub';
      case 'figma':
        return 'Figma';
      default:
        return 'Demo';
    }
  };

  // For web platform, we can render iframe embeds
  if (Platform.OS === 'web' && isEmbedded && embedCode) {
    return (
      <View style={[styles.container, { backgroundColor: theme.card }]}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.icon}>{getTypeIcon()}</Text>
            <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          </View>
          <TouchableOpacity onPress={handleOpenExternal}>
            <Text style={[styles.openButton, { color: theme.primary }]}>
              Open External
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.embedContainer}>
          <div
            dangerouslySetInnerHTML={{ __html: embedCode }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
      </View>
    );
  }

  // For native or when not embedded, show a link card
  return (
    <TouchableOpacity
      style={[styles.linkCard, { backgroundColor: theme.card }]}
      onPress={handleOpenExternal}
      activeOpacity={0.8}
    >
      <View style={styles.linkContent}>
        <View style={styles.iconContainer}>
          <Text style={styles.largeIcon}>{getTypeIcon()}</Text>
        </View>
        <View style={styles.textContent}>
          <Text style={[styles.linkTitle, { color: theme.text }]}>
            {title}
          </Text>
          <Text style={[styles.linkType, { color: theme.textSecondary }]}>
            {getTypeLabel()}
          </Text>
          <Text style={[styles.linkUrl, { color: theme.primary }]}>
            {url}
          </Text>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={[styles.arrow, { color: theme.primary }]}>→</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  openButton: {
    fontSize: 14,
    fontWeight: '600',
  },
  embedContainer: {
    height: 400,
    width: '100%',
  },
  linkCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  largeIcon: {
    fontSize: 28,
  },
  textContent: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  linkType: {
    fontSize: 14,
    marginBottom: 4,
  },
  linkUrl: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  arrowContainer: {
    marginLeft: 16,
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
