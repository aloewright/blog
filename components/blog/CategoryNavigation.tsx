import React from 'react';
import Link from 'next/link';
import { ChevronRight, FolderOpen, Hash } from 'lucide-react';

interface Category {
  id: string;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    color?: string;
    icon?: string;
    postCount?: number;
    children?: {
      data: Category[];
    };
    parent?: {
      data: Category;
    };
  };
}

interface CategoryNavigationProps {
  categories: Category[];
  currentCategorySlug?: string;
  showCounts?: boolean;
  layout?: 'grid' | 'list' | 'tree';
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  categories,
  currentCategorySlug,
  showCounts = true,
  layout = 'grid',
}) => {
  // Build category tree
  const buildCategoryTree = (cats: Category[]): Category[] => {
    const rootCategories = cats.filter(cat => !cat.attributes.parent?.data);
    
    const addChildren = (parent: Category): Category => {
      const children = cats.filter(
        cat => cat.attributes.parent?.data?.id === parent.id
      );
      
      if (children.length > 0) {
        return {
          ...parent,
          attributes: {
            ...parent.attributes,
            children: {
              data: children.map(child => addChildren(child)),
            },
          },
        };
      }
      
      return parent;
    };
    
    return rootCategories.map(cat => addChildren(cat));
  };

  const categoryTree = buildCategoryTree(categories);

  const renderIcon = (category: Category) => {
    if (category.attributes.icon) {
      // If icon is an emoji or custom icon
      return <span className="text-lg">{category.attributes.icon}</span>;
    }
    return <FolderOpen className="w-5 h-5" />;
  };

  const renderCategory = (category: Category, depth: number = 0) => {
    const isActive = category.attributes.slug === currentCategorySlug;
    const hasChildren = category.attributes.children?.data && category.attributes.children.data.length > 0;

    return (
      <div key={category.id} className={depth > 0 ? 'ml-6' : ''}>
        <Link
          href={`/blog/category/${category.attributes.slug}`}
          className={`
            flex items-center justify-between p-3 rounded-lg transition-all
            ${isActive 
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
              : 'hover:bg-gray-50 dark:hover:bg-gray-800'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <div
              className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${isActive ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-800'}
              `}
              style={{
                backgroundColor: !isActive && category.attributes.color 
                  ? `${category.attributes.color}20` 
                  : undefined,
              }}
            >
              {renderIcon(category)}
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {category.attributes.name}
              </h4>
              {category.attributes.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {category.attributes.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {showCounts && category.attributes.postCount !== undefined && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {category.attributes.postCount}
              </span>
            )}
            {hasChildren && (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </Link>
        
        {hasChildren && (
          <div className="mt-2">
            {category.attributes.children!.data.map(child => 
              renderCategory(child, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  if (layout === 'tree' || layout === 'list') {
    return (
      <div className="space-y-2">
        {categoryTree.map(category => renderCategory(category))}
      </div>
    );
  }

  // Grid layout
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map(category => {
        const isActive = category.attributes.slug === currentCategorySlug;
        
        return (
          <Link
            key={category.id}
            href={`/blog/category/${category.attributes.slug}`}
            className={`
              group relative p-6 rounded-xl border-2 transition-all
              ${isActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
          >
            {/* Category Color Bar */}
            {category.attributes.color && (
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
                style={{ backgroundColor: category.attributes.color }}
              />
            )}
            
            <div className="flex items-start gap-4">
              <div
                className={`
                  w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                  ${isActive ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-800'}
                `}
                style={{
                  backgroundColor: !isActive && category.attributes.color 
                    ? `${category.attributes.color}20` 
                    : undefined,
                }}
              >
                {renderIcon(category)}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.attributes.name}
                </h3>
                
                {category.attributes.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                    {category.attributes.description}
                  </p>
                )}
                
                {showCounts && category.attributes.postCount !== undefined && (
                  <div className="mt-3 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Hash className="w-3 h-3" />
                    <span>{category.attributes.postCount} posts</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
