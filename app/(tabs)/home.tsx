import { View, Text, StyleSheet, Platform } from 'react-native';
import { Link } from 'expo-router';

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Tab</Text>
      <Text style={styles.subtitle}>
        This is the home tab running on {Platform.OS}
      </Text>
      
      <Text style={styles.description}>
        This demonstrates tab-based navigation using Expo Router and React Navigation.
        The tabs work seamlessly across web and mobile platforms.
      </Text>
      
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>← Back to Main App</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  link: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
  },
  linkText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
