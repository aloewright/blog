import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Search, Filter, Calendar, Clock, Tag, User } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface BlogPost {
  id: string;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    publishedDate: string;
    readingTime: number;
    author: string;
    category?: {
      data?: {
        attributes: {
          name: string;
          slug: string;
          color?: string;
        };
      };
    };
    categories?: {
      data: Array<{
        attributes: {
          name: string;
          slug: string;
          color?: string;
        };
      }>;
    };
    tags?: string[];
    featuredImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    viewCount?: number;
    likeCount?: number;
    featured?: boolean;
    aiEnhanced?: boolean;
  };
}

interface BlogListProps {
  posts: BlogPost[];
  showFilters?: boolean;
  showSearch?: boolean;
  featuredFirst?: boolean;
}

export const BlogList: React.FC<BlogListProps> = ({
  posts,
  showFilters = true,
  showSearch = true,
  featuredFirst = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'popular' | 'readingTime'>('date');

  // Extract all unique categories and tags
  const { categories, tags } = useMemo(() => {
    const catSet = new Set<string>();
    const tagSet = new Set<string>();

    posts.forEach(post => {
      if (post.attributes.category?.data) {
        catSet.add(post.attributes.category.data.attributes.slug);
      }
      post.attributes.categories?.data.forEach(cat => {
        catSet.add(cat.attributes.slug);
      });
      post.attributes.tags?.forEach(tag => tagSet.add(tag));
    });

    return {
      categories: Array.from(catSet),
      tags: Array.from(tagSet),
    };
  }, [posts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          post.attributes.title.toLowerCase().includes(query) ||
          post.attributes.excerpt?.toLowerCase().includes(query) ||
          post.attributes.tags?.some(tag => tag.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory) {
        const hasCategory = 
          post.attributes.category?.data?.attributes.slug === selectedCategory ||
          post.attributes.categories?.data.some(cat => 
            cat.attributes.slug === selectedCategory
          );
        
        if (!hasCategory) return false;
      }

      // Tag filter
      if (selectedTags.length > 0) {
        const hasTags = selectedTags.every(tag => 
          post.attributes.tags?.includes(tag)
        );
        
        if (!hasTags) return false;
      }

      return true;
    });

    // Sort posts
    filtered.sort((a, b) => {
      if (featuredFirst) {
        if (a.attributes.featured && !b.attributes.featured) return -1;
        if (!a.attributes.featured && b.attributes.featured) return 1;
      }

      switch (sortBy) {
        case 'popular':
          return (b.attributes.viewCount || 0) - (a.attributes.viewCount || 0);
        case 'readingTime':
          return (a.attributes.readingTime || 0) - (b.attributes.readingTime || 0);
        case 'date':
        default:
          return new Date(b.attributes.publishedDate).getTime() - 
                 new Date(a.attributes.publishedDate).getTime();
      }
    });

    return filtered;
  }, [posts, searchQuery, selectedCategory, selectedTags, sortBy, featuredFirst]);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {showFilters && (
            <>
              {/* Sort Options */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={sortBy === 'date' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('date')}
                >
                  Latest
                </Button>
                <Button
                  variant={sortBy === 'popular' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('popular')}
                >
                  Popular
                </Button>
                <Button
                  variant={sortBy === 'readingTime' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('readingTime')}
                >
                  Quick Reads
                </Button>
              </div>

              {/* Category Filter */}
              {categories.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={!selectedCategory ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                    >
                      All
                    </Button>
                    {categories.map(cat => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tag Filter */}
              {tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedTags(prev =>
                            prev.includes(tag)
                              ? prev.filter(t => t !== tag)
                              : [...prev, tag]
                          );
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredPosts.length} of {posts.length} posts
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.attributes.slug}`}
            className="group"
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              {/* Featured Image */}
              {post.attributes.featuredImage?.data && (
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={post.attributes.featuredImage.data.attributes.url}
                    alt={post.attributes.featuredImage.data.attributes.alternativeText || post.attributes.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Featured & AI Badge */}
                <div className="flex gap-2 mb-3">
                  {post.attributes.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                  {post.attributes.aiEnhanced && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      AI Enhanced
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.attributes.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                  {post.attributes.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.attributes.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(post.attributes.publishedDate), 'MMM d, yyyy')}</span>
                  </div>
                  {post.attributes.readingTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.attributes.readingTime} min read</span>
                    </div>
                  )}
                </div>

                {/* Category */}
                {post.attributes.category?.data && (
                  <div className="mt-4">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: post.attributes.category.data.attributes.color || '#e5e7eb',
                        color: post.attributes.category.data.attributes.color ? '#fff' : '#374151'
                      }}
                    >
                      {post.attributes.category.data.attributes.name}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No posts found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};
