# Strapi CMS Backend

This is the Strapi CMS backend for the Expo/Next.js application.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or 20.x
- PostgreSQL database
- npm or yarn

### Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Copy `.env.example` to `.env` and update with your database credentials:
   ```bash
   cp .env.example .env
   ```

3. **Create PostgreSQL database:**
   ```sql
   CREATE DATABASE strapi;
   CREATE USER strapi WITH PASSWORD 'strapi';
   GRANT ALL PRIVILEGES ON DATABASE strapi TO strapi;
   ```

4. **Run database migrations:**
   ```bash
   npm run build
   ```

5. **Start development server:**
   ```bash
   npm run develop
   ```

   The admin panel will be available at http://localhost:1337/admin

### Using Vercel Postgres

To use Vercel Postgres:

1. Copy `.env.vercel` to `.env`
2. Update `DATABASE_URL` with your Vercel Postgres connection string
3. Set `DATABASE_SSL=true`

## 🤖 AI-Powered Writing Features

### AI Assistant Endpoints

- **Generate Outline**: `POST /api/ai/generate-outline`
- **Enhance Content**: `POST /api/ai/enhance-content`
- **Discover Stories**: `POST /api/ai/discover-stories`
- **Extract Insights**: `POST /api/ai/extract-insights`
- **Generate SEO**: `POST /api/ai/generate-seo`
- **Analyze Content**: `POST /api/ai/analyze-content`
- **Generate Citations**: `POST /api/ai/generate-citations`

### Writing Workflow

1. **Story Discovery**: AI helps find trending topics and story ideas
2. **Research**: Save and organize research notes with AI-powered insights
3. **Drafting**: Create drafts with AI-generated outlines and suggestions
4. **Enhancement**: Improve content with AI recommendations
5. **SEO Optimization**: Generate SEO-friendly metadata
6. **Publishing**: Publish polished, AI-enhanced articles

## 🎨 Media Search Features

### Unsplash Integration

- **Search Images**: `GET /api/media-search/unsplash?query=nature&page=1`
- **Download Tracking**: `POST /api/media-search/unsplash/download`
- **Filters**: orientation, color, orderBy

### Lottie Animations

- **Search Animations**: `GET /api/media-search/lottie?query=loading`
- **Download Animation**: `GET /api/media-search/lottie/:animationId/download`
- **Categories**: Filter by category and tags

### Icon Search

- **Search Icons**: `GET /api/media-search/icons?query=arrow`
- **Icon Collections**: Multiple icon sets via Iconify

### Configuration

Add these keys to your `.env` file:

```env
# Required for Unsplash
UNSPLASH_ACCESS_KEY=your-unsplash-access-key

# Optional for LottieFiles API
LOTTIE_API_KEY=your-lottie-api-key
```

Get your API keys from:
- [Unsplash Developers](https://unsplash.com/developers)
- [LottieFiles](https://lottiefiles.com/developers) (optional)

## 📋 Content Types

### Blog Post
- Title (string, required)
- Slug (uid, auto-generated)
- Content (rich text)
- Excerpt (text)
- Featured Image (media)
- Author (string)
- Published Date (datetime)
- Tags (JSON)
- Category (string)
- SEO (component)

### Portfolio Item
- Title (string, required)
- Slug (uid, auto-generated)
- Description (rich text)
- Short Description (text)
- Featured Image (media)
- Gallery (media, multiple)
- Technologies (JSON)
- Project URL (string)
- GitHub URL (string)
- Category (enum: web, mobile, desktop, design, other)
- Status (enum: completed, in-progress, planned)
- Completed Date (date)
- Featured (boolean)
- Order (integer)
- SEO (component)

## 🔐 API Permissions

By default, all content types are protected. You need to configure permissions in the admin panel:

1. Go to Settings → Roles → Public
2. Enable find and findOne for the content types you want to be publicly accessible
3. Save changes

## 🚀 Deployment

### Railway

1. Connect your GitHub repository to Railway
2. Add PostgreSQL database
3. Set environment variables from `.env.vercel`
4. Deploy

### Render

1. Create a new Web Service
2. Connect your GitHub repository
3. Use the `render.yaml` configuration
4. Add PostgreSQL database
5. Set environment variables

### Docker

Build and run with Docker:
```bash
docker build -t strapi-backend .
docker run -p 1337:1337 --env-file .env strapi-backend
```

## 📝 API Usage

### Authentication
```bash
# Login
POST /api/auth/local
{
  "identifier": "user@example.com",
  "password": "password"
}

# Returns JWT token
```

### Content APIs
```bash
# Get all blog posts
GET /api/blog-posts

# Get single blog post
GET /api/blog-posts/:id

# Get all portfolio items
GET /api/portfolio-items

# Get single portfolio item
GET /api/portfolio-items/:id
```

### Filtering & Pagination
```bash
# Filter by field
GET /api/blog-posts?filters[category][$eq]=technology

# Pagination
GET /api/blog-posts?pagination[page]=1&pagination[pageSize]=10

# Sorting
GET /api/blog-posts?sort[0]=publishedDate:desc
```

## 🛠️ Development

### Generate Types (TypeScript)
```bash
npm run strapi ts:generate-types
```

### Build for Production
```bash
npm run build
npm start
```

## 📚 Documentation

- [Strapi Documentation](https://docs.strapi.io)
- [REST API Documentation](https://docs.strapi.io/dev-docs/api/rest)
- [GraphQL Documentation](https://docs.strapi.io/dev-docs/plugins/graphql)
