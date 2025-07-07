# AI Blog Architecture Documentation

## Overview

This document describes the comprehensive AI-powered blog architecture built for the Expo/Next.js application with Strapi as the headless CMS.

## Features Implemented

### 1. **Strapi Content Models**

#### Blog Post (`blog-post`)
- Enhanced with rich text and markdown support
- AI metadata integration
- Related posts and categories
- Publishing scheduling
- MCP integrations support
- View/like/share tracking
- Code blocks with syntax highlighting metadata

#### Category (`category`)
- Hierarchical category support
- Custom colors and icons
- Post count tracking
- SEO optimization

#### Citation (`citation`)
- Support for Semantic Scholar, news, and social media sources
- Verification status tracking
- Statistics and fact-checking
- AI analysis integration

#### Trending Topic (`trending-topic`)
- AI-discovered trends tracking
- Trend scoring and direction
- Content idea generation
- Competitor analysis

### 2. **React Components**

#### MarkdownRenderer
- Syntax highlighting with Prism.js
- Math rendering with KaTeX
- GitHub Flavored Markdown support
- Custom styling for tables, blockquotes, and links

#### BlogList
- Advanced filtering by category and tags
- Search functionality
- Sort by date, popularity, or reading time
- Featured posts highlighting
- AI-enhanced posts indicators

#### AIWritingAssistant
- Multi-provider support (Claude, ChatGPT, Gemini, Ollama)
- Writing modes: Create, Improve, Expand, Summarize
- Brand voice integration
- Prompt templates
- System prompts for custom instructions

#### RelatedPosts
- Smart related content display
- View count and reading time indicators
- Responsive grid layout

#### CategoryNavigation
- Tree, list, and grid layouts
- Category hierarchy visualization
- Post count display
- Custom colors and icons

#### MCPIntegrations
- Add/remove integrations
- Enable/disable controls
- Status monitoring
- Capability display

## Required Dependencies

Add these to your package.json:

```json
{
  "dependencies": {
    "react-markdown": "^9.0.1",
    "remark-gfm": "^4.0.0",
    "remark-math": "^6.0.0",
    "rehype-katex": "^7.0.0",
    "rehype-slug": "^6.0.0",
    "rehype-autolink-headings": "^7.1.0",
    "react-syntax-highlighter": "^15.5.0",
    "@types/react-syntax-highlighter": "^15.5.11",
    "katex": "^0.16.9",
    "date-fns": "^3.3.1",
    "lucide-react": "^0.321.0"
  }
}
```

## Installation Steps

1. **Install dependencies:**
   ```bash
   npm install react-markdown remark-gfm remark-math rehype-katex rehype-slug rehype-autolink-headings react-syntax-highlighter @types/react-syntax-highlighter katex date-fns lucide-react
   ```

2. **Update Strapi models:**
   - The content types are already created in `/strapi-backend/src/api/`
   - Run `npm run develop` in the strapi-backend directory to apply changes

3. **Create blog pages in your Next.js app:**
   ```tsx
   // app/blog/page.tsx
   import { BlogList } from '@/components/blog/BlogList';
   
   // app/blog/[slug]/page.tsx
   import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
   ```

## API Integration Examples

### Fetching Blog Posts
```typescript
const fetchBlogPosts = async () => {
  const response = await fetch('http://localhost:1337/api/blog-posts?populate=*');
  const data = await response.json();
  return data.data;
};
```

### Creating a New Post with AI
```typescript
const createAIPost = async (prompt: string, provider: string) => {
  // 1. Generate content using AI provider
  // 2. Create draft in Strapi
  // 3. Save citations and references
  // 4. Schedule publishing if needed
};
```

## Mobile App Considerations

The components are built with React Native compatibility in mind:
- Use `react-native-render-html` instead of `react-markdown` for native
- Replace Lucide icons with react-native-vector-icons
- Adapt styles for React Native StyleSheet

## MCP Integration Setup

1. **Configure MCP servers** for:
   - Semantic Scholar API
   - News aggregation
   - Social media monitoring
   - Fact-checking services

2. **Example MCP server:**
   ```javascript
   // mcp-server/semantic-scholar.js
   export const searchPapers = async (query) => {
     // Implementation
   };
   ```

## Auto-Publishing Setup

Configure cron jobs in Strapi for:
- Scheduled post publishing
- Social media cross-posting
- Newsletter generation
- Content syndication

## Future Enhancements

1. **AI Features:**
   - Voice-to-text article creation
   - AI-powered SEO optimization
   - Automated fact-checking
   - Content performance prediction

2. **Integration:**
   - WordPress migration tools
   - Medium cross-posting
   - Dev.to integration
   - RSS feed generation

3. **Analytics:**
   - Real-time content analytics
   - A/B testing for headlines
   - Reader engagement tracking
   - Content recommendation engine
