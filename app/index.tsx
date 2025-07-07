import { View, Text, StyleSheet, Platform } from 'react-native';
import { Link } from 'expo-router';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Expo + Next.js!</Text>
      <Text style={styles.subtitle}>
        Running on: {Platform.OS}
      </Text>
      
      <View style={styles.linkContainer}>
        <Link href="/about" style={styles.link}>
          <Text style={styles.linkText}>About Page</Text>
        </Link>
        
        <Link href="/(tabs)" style={styles.link}>
          <Text style={styles.linkText}>Tabs Example</Text>
        </Link>
        
        <Link href="/demo" style={styles.link}>
          <Text style={styles.linkText}>Theme Demo</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  linkContainer: {
    gap: 20,
  },
  link: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    minWidth: 200,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
