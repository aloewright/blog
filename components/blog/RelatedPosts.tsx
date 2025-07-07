import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight, Clock, Eye } from 'lucide-react';
import { Card } from '../ui/Card';

interface RelatedPost {
  id: string;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    publishedDate: string;
    readingTime?: number;
    viewCount?: number;
    featuredImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
  };
}

interface RelatedPostsProps {
  posts: RelatedPost[];
  currentPostId?: string;
  title?: string;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({
  posts,
  currentPostId,
  title = 'Related Articles',
}) => {
  // Filter out current post if provided
  const filteredPosts = posts.filter(post => post.id !== currentPostId);

  if (filteredPosts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.slice(0, 6).map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.attributes.slug}`}
            className="group"
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
              {post.attributes.featuredImage?.data && (
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img
                    src={post.attributes.featuredImage.data.attributes.url}
                    alt={post.attributes.featuredImage.data.attributes.alternativeText || post.attributes.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.attributes.title}
                </h4>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                  {post.attributes.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-3">
                    {post.attributes.readingTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.attributes.readingTime} min</span>
                      </div>
                    )}
                    {post.attributes.viewCount !== undefined && (
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.attributes.viewCount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
