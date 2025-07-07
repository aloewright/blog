import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { PortfolioCard } from '../components/portfolio/PortfolioCard';
import { PortfolioFilter } from '../components/portfolio/PortfolioFilter';

interface PortfolioItem {
  id: string;
  attributes: {
    title: string;
    shortDescription?: string;
    featuredImage?: {
      data?: {
        attributes: {
          url: string;
        };
      };
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
    status: string;
  };
}

export default function PortfolioPage() {
  const { theme } = useTheme();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    projectType: '',
    technology: '',
    dateRange: '',
  });

  const fetchPortfolioItems = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/portfolio-items?populate=*`
      );
      const data = await response.json();
      setPortfolioItems(data.data || []);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPortfolioItems();
  };

  // Extract unique values for filters
  const filterOptions = useMemo(() => {
    const categories = Array.from(
      new Set(portfolioItems.map(item => item.attributes.category))
    ).map(cat => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) }));

    const projectTypes = Array.from(
      new Set(portfolioItems.map(item => item.attributes.projectType).filter(Boolean))
    ).map(type => ({
      value: type!,
      label: type!.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }));

    const technologies = Array.from(
      new Set(
        portfolioItems.flatMap(item =>
          item.attributes.techStack?.map(tech => tech.name) || []
        )
      )
    );

    return { categories, projectTypes, technologies };
  }, [portfolioItems]);

  // Filter items based on active filters
  const filteredItems = useMemo(() => {
    return portfolioItems.filter(item => {
      // Only show completed projects
      if (item.attributes.status !== 'completed') return false;

      // Category filter
      if (filters.category && item.attributes.category !== filters.category) {
        return false;
      }

      // Project type filter
      if (filters.projectType && item.attributes.projectType !== filters.projectType) {
        return false;
      }

      // Technology filter
      if (filters.technology) {
        const hasTech = item.attributes.techStack?.some(
          tech => tech.name === filters.technology
        );
        if (!hasTech) return false;
      }

      // Date range filter
      if (filters.dateRange && filters.dateRange !== 'all' && item.attributes.completedDate) {
        const completedDate = new Date(item.attributes.completedDate);
        const now = new Date();
        const daysDiff = (now.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24);

        switch (filters.dateRange) {
          case '3months':
            if (daysDiff > 90) return false;
            break;
          case '6months':
            if (daysDiff > 180) return false;
            break;
          case 'year':
            if (daysDiff > 365) return false;
            break;
        }
      }

      return true;
    });
  }, [portfolioItems, filters]);

  // Sort items - featured first, then by date
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      // Featured items first
      if (a.attributes.featured && !b.attributes.featured) return -1;
      if (!a.attributes.featured && b.attributes.featured) return 1;

      // Then by completed date
      const dateA = a.attributes.completedDate ? new Date(a.attributes.completedDate).getTime() : 0;
      const dateB = b.attributes.completedDate ? new Date(b.attributes.completedDate).getTime() : 0;
      return dateB - dateA;
    });
  }, [filteredItems]);

  const renderPortfolioItem = ({ item }: { item: PortfolioItem }) => {
    const imageUrl = item.attributes.featuredImage?.data?.attributes?.url;
    
    return (
      <PortfolioCard
        id={item.id}
        title={item.attributes.title}
        shortDescription={item.attributes.shortDescription}
        featuredImage={imageUrl ? { url: imageUrl } : undefined}
        category={item.attributes.category}
        projectType={item.attributes.projectType}
        techStack={item.attributes.techStack}
        completedDate={item.attributes.completedDate}
        featured={item.attributes.featured}
      />
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={sortedItems}
        renderItem={renderPortfolioItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={[styles.title, { color: theme.text }]}>
                Portfolio
              </Text>
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                Explore my projects and case studies
              </Text>
            </View>
            <PortfolioFilter
              categories={filterOptions.categories}
              projectTypes={filterOptions.projectTypes}
              technologies={filterOptions.technologies}
              onFilterChange={setFilters}
            />
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No projects found matching your filters
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
      />
    </View>
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
  listContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
