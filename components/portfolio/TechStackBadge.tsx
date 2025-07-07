import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface TechStackBadgeProps {
  name: string;
  category: string;
  version?: string;
  icon?: string;
  color?: string;
}

export const TechStackBadge: React.FC<TechStackBadgeProps> = ({
  name,
  category,
  version,
  icon,
  color,
}) => {
  const { theme } = useTheme();
  
  const getCategoryColor = () => {
    switch (category) {
      case 'frontend':
        return color || '#61DAFB'; // React blue
      case 'backend':
        return color || '#68A063'; // Node green
      case 'database':
        return color || '#E34C26'; // Database orange
      case 'devops':
        return color || '#0080FF'; // DevOps blue
      case 'testing':
        return color || '#E84D3D'; // Testing red
      default:
        return color || theme.primary;
    }
  };

  const badgeColor = getCategoryColor();

  return (
    <View style={[styles.badge, { borderColor: badgeColor }]}>
      {icon && (
        <Text style={[styles.icon, { color: badgeColor }]}>{icon}</Text>
      )}
      <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
      {version && (
        <Text style={[styles.version, { color: theme.textSecondary }]}>
          v{version}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  icon: {
    marginRight: 6,
    fontSize: 14,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
  },
  version: {
    fontSize: 12,
    marginLeft: 4,
  },
});
