import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function AboutPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.description}>
        This is a demo app built with Expo Router and Next.js routing support.
        It demonstrates file-based routing that works across web and mobile platforms.
      </Text>
      
      <View style={styles.features}>
        <Text style={styles.featureTitle}>Features:</Text>
        <Text style={styles.feature}>• File-based routing with Expo Router</Text>
        <Text style={styles.feature}>• TypeScript support</Text>
        <Text style={styles.feature}>• Cross-platform compatibility</Text>
        <Text style={styles.feature}>• React Navigation integration</Text>
        <Text style={styles.feature}>• Next.js-style routing</Text>
      </View>
      
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>← Back to Home</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  features: {
    marginBottom: 40,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  feature: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    color: '#555',
  },
  link: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignSelf: 'center',
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
