import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface CodeSnippetProps {
  title: string;
  description?: string;
  language: string;
  code: string;
  fileName?: string;
  highlightLines?: string;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  title,
  description,
  language,
  code,
  fileName,
  highlightLines,
}) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (Platform.OS === 'web') {
      await navigator.clipboard.writeText(code);
    } else {
      // For React Native, you would use a clipboard library
      // import Clipboard from '@react-native-clipboard/clipboard';
      // Clipboard.setString(code);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLanguageColor = () => {
    const colors: Record<string, string> = {
      javascript: '#F7DF1E',
      typescript: '#3178C6',
      python: '#3776AB',
      java: '#007396',
      cpp: '#00599C',
      csharp: '#239120',
      go: '#00ADD8',
      rust: '#CE4E2A',
      swift: '#FA7343',
      kotlin: '#7F52FF',
      html: '#E34C26',
      css: '#1572B6',
      scss: '#CC6699',
      json: '#000000',
      yaml: '#CB171E',
      markdown: '#000000',
      bash: '#4EAA25',
      sql: '#336791',
      graphql: '#E10098',
    };
    return colors[language] || theme.primary;
  };

  const parseHighlightLines = () => {
    if (!highlightLines) return new Set<number>();
    
    const lines = new Set<number>();
    const parts = highlightLines.split(',');
    
    parts.forEach(part => {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(n => parseInt(n.trim()));
        for (let i = start; i <= end; i++) {
          lines.add(i);
        }
      } else {
        lines.add(parseInt(part.trim()));
      }
    });
    
    return lines;
  };

  const highlightedLines = parseHighlightLines();
  const codeLines = code.split('\n');

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.languageBadge,
              { backgroundColor: getLanguageColor() },
            ]}
          >
            <Text style={styles.languageText}>{language.toUpperCase()}</Text>
          </View>
          {fileName && (
            <Text style={[styles.fileName, { color: theme.textSecondary }]}>
              {fileName}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
          <Text style={[styles.copyText, { color: theme.primary }]}>
            {copied ? '✓ Copied' : 'Copy'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleSection}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        {description && (
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {description}
          </Text>
        )}
      </View>

      <ScrollView
        style={[styles.codeContainer, { backgroundColor: theme.background }]}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View>
          {codeLines.map((line, index) => {
            const lineNumber = index + 1;
            const isHighlighted = highlightedLines.has(lineNumber);
            
            return (
              <View
                key={index}
                style={[
                  styles.codeLine,
                  isHighlighted && {
                    backgroundColor: theme.primary + '20',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.lineNumber,
                    { color: theme.textSecondary },
                  ]}
                >
                  {lineNumber.toString().padStart(3, ' ')}
                </Text>
                <Text
                  style={[
                    styles.codeText,
                    { color: theme.text },
                  ]}
                >
                  {line || ' '}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
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
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  languageText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  fileName: {
    marginLeft: 12,
    fontSize: 14,
  },
  copyButton: {
    padding: 8,
  },
  copyText: {
    fontSize: 14,
    fontWeight: '600',
  },
  titleSection: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  codeContainer: {
    maxHeight: 400,
  },
  codeLine: {
    flexDirection: 'row',
    paddingVertical: 2,
    paddingRight: 16,
  },
  lineNumber: {
    width: 40,
    textAlign: 'right',
    paddingRight: 16,
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  codeText: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    flex: 1,
  },
});
