import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { TechStackBadge } from '../../components/portfolio/TechStackBadge';
import { CodeSnippet } from '../../components/portfolio/CodeSnippet';
import { DemoEmbed } from '../../components/portfolio/DemoEmbed';

interface PortfolioDetail {
  id: string;
  attributes: {
    title: string;
    description: string;
    shortDescription?: string;
    featuredImage?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
    gallery?: {
      data?: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
    category: string;
    projectType?: string;
    status: string;
    startDate?: string;
    completedDate?: string;
    client?: string;
    role?: string;
    teamSize?: number;
    duration?: string;
    projectUrl?: string;
    githubUrl?: string;
    techStack?: Array<{
      name: string;
      category: string;
      version?: string;
      icon?: string;
      color?: string;
    }>;
    caseStudySections?: Array<{
      heading: string;
      content: string;
      image?: {
        data?: {
          attributes: {
            url: string;
          };
        };
      };
      order: number;
    }>;
    codeSnippets?: Array<{
      title: string;
      description?: string;
      language: string;
      code: string;
      fileName?: string;
      highlightLines?: string;
    }>;
    demoLinks?: Array<{
      title: string;
      url: string;
      type: string;
      embedCode?: string;
      isEmbedded?: boolean;
    }>;
    challenges?: string;
    solutions?: string;
    impact?: string;
    testimonial?: string;
    testimonialAuthor?: string;
    tags?: string[];
  };
}

export default function PortfolioDetailPage() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<PortfolioDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioDetail();
  }, [id]);

  const fetchPortfolioDetail = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/portfolio-items/${id}?populate=deep`
      );
      const data = await response.json();
      setPortfolio(data.data);
    } catch (error) {
      console.error('Error fetching portfolio detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleOpenUrl = (url: string) => {
    Linking.openURL(url);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (!portfolio) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>
          Portfolio item not found
        </Text>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: theme.primary }]}>
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { attributes } = portfolio;
  const featuredImageUrl = attributes.featuredImage?.data?.attributes?.url;

  // Sort case study sections by order
  const sortedSections = attributes.caseStudySections?.sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: theme.primary }]}>
            ← Back to Portfolio
          </Text>
        </TouchableOpacity>
      </View>

      {/* Featured Image */}
      {featuredImageUrl && (
        <Image
          source={{ uri: featuredImageUrl }}
          style={styles.featuredImage}
          resizeMode="cover"
        />
      )}

      {/* Title Section */}
      <View style={styles.titleSection}>
        <View style={styles.titleHeader}>
          <Text style={[styles.category, { color: theme.primary }]}>
            {attributes.category.charAt(0).toUpperCase() + attributes.category.slice(1)}
          </Text>
          {attributes.projectType && (
            <Text style={[styles.projectType, { color: theme.textSecondary }]}>
              • {attributes.projectType.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Text>
          )}
        </View>
        <Text style={[styles.title, { color: theme.text }]}>
          {attributes.title}
        </Text>
        {attributes.shortDescription && (
          <Text style={[styles.shortDescription, { color: theme.textSecondary }]}>
            {attributes.shortDescription}
          </Text>
        )}
      </View>

      {/* Project Info */}
      <View style={[styles.infoSection, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Project Information
        </Text>
        <View style={styles.infoGrid}>
          {attributes.client && (
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Client
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {attributes.client}
              </Text>
            </View>
          )}
          {attributes.role && (
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Role
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {attributes.role}
              </Text>
            </View>
          )}
          {attributes.teamSize && (
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Team Size
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {attributes.teamSize} {attributes.teamSize === 1 ? 'person' : 'people'}
              </Text>
            </View>
          )}
          {attributes.duration && (
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Duration
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {attributes.duration}
              </Text>
            </View>
          )}
          {attributes.startDate && (
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Started
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {formatDate(attributes.startDate)}
              </Text>
            </View>
          )}
          {attributes.completedDate && (
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Completed
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {formatDate(attributes.completedDate)}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Tech Stack */}
      {attributes.techStack && attributes.techStack.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Tech Stack
          </Text>
          <View style={styles.techStackContainer}>
            {attributes.techStack.map((tech, index) => (
              <TechStackBadge key={index} {...tech} />
            ))}
          </View>
        </View>
      )}

      {/* Links */}
      {(attributes.projectUrl || attributes.githubUrl) && (
        <View style={styles.linksSection}>
          {attributes.projectUrl && (
            <TouchableOpacity
              style={[styles.linkButton, { backgroundColor: theme.primary }]}
              onPress={() => handleOpenUrl(attributes.projectUrl!)}
            >
              <Text style={styles.linkButtonText}>View Live Project</Text>
            </TouchableOpacity>
          )}
          {attributes.githubUrl && (
            <TouchableOpacity
              style={[styles.linkButton, { backgroundColor: theme.card }]}
              onPress={() => handleOpenUrl(attributes.githubUrl!)}
            >
              <Text style={[styles.linkButtonText, { color: theme.text }]}>
                View on GitHub
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Description */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Overview
        </Text>
        <Text style={[styles.description, { color: theme.text }]}>
          {attributes.description}
        </Text>
      </View>

      {/* Challenges */}
      {attributes.challenges && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Challenges
          </Text>
          <Text style={[styles.description, { color: theme.text }]}>
            {attributes.challenges}
          </Text>
        </View>
      )}

      {/* Solutions */}
      {attributes.solutions && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Solutions
          </Text>
          <Text style={[styles.description, { color: theme.text }]}>
            {attributes.solutions}
          </Text>
        </View>
      )}

      {/* Impact */}
      {attributes.impact && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Impact
          </Text>
          <Text style={[styles.description, { color: theme.text }]}>
            {attributes.impact}
          </Text>
        </View>
      )}

      {/* Case Study Sections */}
      {sortedSections && sortedSections.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Case Study
          </Text>
          {sortedSections.map((section, index) => (
            <View key={index} style={styles.caseStudySection}>
              <Text style={[styles.caseStudyHeading, { color: theme.text }]}>
                {section.heading}
              </Text>
              <Text style={[styles.caseStudyContent, { color: theme.text }]}>
                {section.content}
              </Text>
              {section.image?.data?.attributes?.url && (
                <Image
                  source={{ uri: section.image.data.attributes.url }}
                  style={styles.caseStudyImage}
                  resizeMode="cover"
                />
              )}
            </View>
          ))}
        </View>
      )}

      {/* Code Snippets */}
      {attributes.codeSnippets && attributes.codeSnippets.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Code Examples
          </Text>
          {attributes.codeSnippets.map((snippet, index) => (
            <CodeSnippet key={index} {...snippet} />
          ))}
        </View>
      )}

      {/* Demo Links */}
      {attributes.demoLinks && attributes.demoLinks.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Demos & Resources
          </Text>
          {attributes.demoLinks.map((demo, index) => (
            <DemoEmbed key={index} {...demo} />
          ))}
        </View>
      )}

      {/* Testimonial */}
      {attributes.testimonial && (
        <View style={[styles.testimonialSection, { backgroundColor: theme.card }]}>
          <Text style={[styles.testimonialText, { color: theme.text }]}>
            "{attributes.testimonial}"
          </Text>
          {attributes.testimonialAuthor && (
            <Text style={[styles.testimonialAuthor, { color: theme.textSecondary }]}>
              — {attributes.testimonialAuthor}
            </Text>
          )}
        </View>
      )}

      {/* Gallery */}
      {attributes.gallery?.data && attributes.gallery.data.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Gallery
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {attributes.gallery.data.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.attributes.url }}
                style={styles.galleryImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
  },
  header: {
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  featuredImage: {
    width: '100%',
    height: 300,
  },
  titleSection: {
    padding: 16,
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  projectType: {
    fontSize: 14,
    marginLeft: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  shortDescription: {
    fontSize: 18,
    lineHeight: 24,
  },
  infoSection: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    width: '50%',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    padding: 16,
  },
  techStackContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  linksSection: {
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },
  linkButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  linkButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  caseStudySection: {
    marginBottom: 24,
  },
  caseStudyHeading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  caseStudyContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  caseStudyImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  testimonialSection: {
    margin: 16,
    padding: 20,
    borderRadius: 8,
  },
  testimonialText: {
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 28,
    marginBottom: 12,
  },
  testimonialAuthor: {
    fontSize: 16,
    textAlign: 'right',
  },
  galleryImage: {
    width: 300,
    height: 200,
    marginRight: 12,
    borderRadius: 8,
  },
  bottomPadding: {
    height: 40,
  },
});
