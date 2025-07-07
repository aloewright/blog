import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface FilterOption {
  value: string;
  label: string;
}

interface PortfolioFilterProps {
  categories: FilterOption[];
  projectTypes: FilterOption[];
  technologies: string[];
  onFilterChange: (filters: {
    category?: string;
    projectType?: string;
    technology?: string;
    dateRange?: string;
  }) => void;
}

export const PortfolioFilter: React.FC<PortfolioFilterProps> = ({
  categories,
  projectTypes,
  technologies,
  onFilterChange,
}) => {
  const { theme } = useTheme();
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    projectType: '',
    technology: '',
    dateRange: '',
  });

  const dateRanges: FilterOption[] = [
    { value: 'all', label: 'All Time' },
    { value: 'year', label: 'Past Year' },
    { value: '6months', label: 'Past 6 Months' },
    { value: '3months', label: 'Past 3 Months' },
  ];

  const handleFilterSelect = (
    filterType: keyof typeof activeFilters,
    value: string
  ) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: activeFilters[filterType] === value ? '' : value,
    };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      projectType: '',
      technology: '',
      dateRange: '',
    };
    setActiveFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(activeFilters).some(filter => filter !== '');

  const renderFilterSection = (
    title: string,
    filterType: keyof typeof activeFilters,
    options: FilterOption[] | string[]
  ) => (
    <View style={styles.filterSection}>
      <Text style={[styles.filterTitle, { color: theme.text }]}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterOptions}>
          {options.map((option) => {
            const value = typeof option === 'string' ? option : option.value;
            const label = typeof option === 'string' ? option : option.label;
            const isActive = activeFilters[filterType] === value;

            return (
              <TouchableOpacity
                key={value}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: isActive ? theme.primary : theme.card,
                    borderColor: isActive ? theme.primary : theme.border,
                  },
                ]}
                onPress={() => handleFilterSelect(filterType, value)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    {
                      color: isActive ? 'white' : theme.text,
                    },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Filters</Text>
        {hasActiveFilters && (
          <TouchableOpacity onPress={clearFilters}>
            <Text style={[styles.clearButton, { color: theme.primary }]}>
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {renderFilterSection('Category', 'category', categories)}
      {renderFilterSection('Project Type', 'projectType', projectTypes)}
      {renderFilterSection('Technology', 'technology', technologies)}
      {renderFilterSection('Date Range', 'dateRange', dateRanges)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  clearButton: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  filterOptions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
