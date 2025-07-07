import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { TechStackBadge } from './TechStackBadge';
import { useRouter } from 'expo-router';

interface PortfolioCardProps {
  id: string;
  title: string;
  shortDescription?: string;
  featuredImage?: {
    url: string;
  };
  category: string;
  projectType?: string;
  techStack?: Array<{
    name: string;
    category: string;
    version?: string;
    icon?: string;
    color?: string;
  }>;
  completedDate?: string;
  featured?: boolean;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  id,
  title,
  shortDescription,
  featuredImage,
  category,
  projectType,
  techStack,
  completedDate,
  featured,
}) => {
  const { theme } = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push(`/portfolio/${id}`);
  };

  const getCategoryLabel = () => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getProjectTypeLabel = () => {
    if (!projectType) return '';
    return projectType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: featured ? theme.primary : theme.border,
        },
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {featuredImage?.url && (
        <Image
          source={{ uri: featuredImage.url }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.category, { color: theme.primary }]}>
            {getCategoryLabel()}
          </Text>
          {projectType && (
            <>
              <Text style={[styles.separator, { color: theme.textSecondary }]}>
                •
              </Text>
              <Text style={[styles.projectType, { color: theme.textSecondary }]}>
                {getProjectTypeLabel()}
              </Text>
            </>
          )}
        </View>

        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {title}
        </Text>

        {shortDescription && (
          <Text
            style={[styles.description, { color: theme.textSecondary }]}
            numberOfLines={3}
          >
            {shortDescription}
          </Text>
        )}

        {techStack && techStack.length > 0 && (
          <View style={styles.techStackContainer}>
            {techStack.slice(0, 3).map((tech, index) => (
              <TechStackBadge key={index} {...tech} />
            ))}
            {techStack.length > 3 && (
              <View style={[styles.moreBadge, { backgroundColor: theme.background }]}>
                <Text style={[styles.moreText, { color: theme.textSecondary }]}>
                  +{techStack.length - 3}
                </Text>
              </View>
            )}
          </View>
        )}

        {completedDate && (
          <Text style={[styles.date, { color: theme.textSecondary }]}>
            {new Date(completedDate).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </Text>
        )}
      </View>

      {featured && (
        <View style={[styles.featuredBadge, { backgroundColor: theme.primary }]}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  separator: {
    marginHorizontal: 8,
    fontSize: 12,
  },
  projectType: {
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  techStackContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  moreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  moreText: {
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    marginTop: 8,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
