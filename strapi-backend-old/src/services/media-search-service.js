'use strict';

/**
 * Media Search Service
 * Handles searching for Unsplash images and Lottie animations
 */

module.exports = ({ strapi }) => ({
  /**
   * Search Unsplash images
   */
  async searchUnsplash(query, options = {}) {
    try {
      const {
        page = 1,
        perPage = 20,
        orientation,
        color,
        orderBy = 'relevant'
      } = options;

      // Unsplash API configuration
      const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
      
      if (!UNSPLASH_ACCESS_KEY) {
        throw new Error('Unsplash access key not configured');
      }

      const params = new URLSearchParams({
        query,
        page,
        per_page: perPage,
        order_by: orderBy,
        ...(orientation && { orientation }),
        ...(color && { color })
      });

      const response = await fetch(
        `https://api.unsplash.com/search/photos?${params}`,
        {
          headers: {
            'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            'Accept-Version': 'v1'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Transform Unsplash data to our format
      return {
        total: data.total,
        totalPages: data.total_pages,
        results: data.results.map(photo => ({
          id: photo.id,
          description: photo.description || photo.alt_description,
          urls: {
            raw: photo.urls.raw,
            full: photo.urls.full,
            regular: photo.urls.regular,
            small: photo.urls.small,
            thumb: photo.urls.thumb
          },
          links: {
            html: photo.links.html,
            download: photo.links.download,
            downloadLocation: photo.links.download_location
          },
          likes: photo.likes,
          user: {
            name: photo.user.name,
            username: photo.user.username,
            profileUrl: photo.user.links.html
          },
          width: photo.width,
          height: photo.height,
          color: photo.color,
          tags: photo.tags?.map(tag => tag.title) || []
        }))
      };
    } catch (error) {
      strapi.log.error('Unsplash search failed:', error);
      throw error;
    }
  },

  /**
   * Download Unsplash image (triggers download count)
   */
  async downloadUnsplash(downloadLocation) {
    try {
      const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
      
      if (!UNSPLASH_ACCESS_KEY) {
        throw new Error('Unsplash access key not configured');
      }

      // Trigger download tracking
      await fetch(downloadLocation, {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      });

      return { success: true };
    } catch (error) {
      strapi.log.error('Unsplash download tracking failed:', error);
      throw error;
    }
  },

  /**
   * Search Lottie animations
   */
  async searchLottie(query, options = {}) {
    try {
      const {
        page = 1,
        perPage = 20,
        category,
        tag,
        premium = false
      } = options;

      // LottieFiles API configuration
      const LOTTIE_API_KEY = process.env.LOTTIE_API_KEY;

      // Option 1: Using LottieFiles API (if you have access)
      if (LOTTIE_API_KEY) {
        const params = new URLSearchParams({
          query,
          page,
          per_page: perPage,
          ...(category && { category }),
          ...(tag && { tag }),
          ...(premium && { premium })
        });

        const response = await fetch(
          `https://api.lottiefiles.com/v2/search?${params}`,
          {
            headers: {
              'Authorization': `Bearer ${LOTTIE_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`LottieFiles API error: ${response.statusText}`);
        }

        const data = await response.json();
        return this.transformLottieData(data);
      }

      // Option 2: Using public LottieFiles search (web scraping alternative)
      // This is a fallback that searches the public website
      return await this.searchLottiePublic(query, options);
    } catch (error) {
      strapi.log.error('Lottie search failed:', error);
      throw error;
    }
  },

  /**
   * Search Lottie animations from public website
   */
  async searchLottiePublic(query, options = {}) {
    try {
      const { page = 1, perPage = 20 } = options;
      
      // Using the public search endpoint
      const response = await fetch(
        `https://lottiefiles.com/api/public/animations/search?query=${encodeURIComponent(query)}&page=${page}&limit=${perPage}`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Strapi-CMS-Backend'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`LottieFiles public search error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        total: data.total || 0,
        results: (data.results || []).map(animation => ({
          id: animation.id,
          name: animation.name,
          description: animation.description,
          gifUrl: animation.gifUrl,
          lottieUrl: animation.lottieUrl,
          jsonUrl: `https://lottiefiles.com/api/public/animations/${animation.id}/download`,
          width: animation.width,
          height: animation.height,
          frameRate: animation.frameRate,
          duration: animation.duration,
          fileSize: animation.fileSize,
          author: {
            name: animation.createdBy?.name || 'Unknown',
            avatarUrl: animation.createdBy?.avatarUrl
          },
          likes: animation.likesCount || 0,
          downloads: animation.downloadsCount || 0,
          tags: animation.tags || [],
          colors: animation.colors || [],
          createdAt: animation.createdAt
        }))
      };
    } catch (error) {
      strapi.log.error('Lottie public search failed:', error);
      
      // Return empty results on error
      return {
        total: 0,
        results: []
      };
    }
  },

  /**
   * Transform LottieFiles API data
   */
  transformLottieData(data) {
    return {
      total: data.total || data.totalCount || 0,
      results: (data.data || data.results || []).map(animation => ({
        id: animation.id,
        name: animation.name || animation.title,
        description: animation.description,
        gifUrl: animation.gif_url || animation.gifUrl,
        lottieUrl: animation.lottie_url || animation.lottieUrl,
        jsonUrl: animation.json_url || animation.jsonUrl,
        width: animation.width,
        height: animation.height,
        frameRate: animation.frame_rate || animation.frameRate,
        duration: animation.duration,
        fileSize: animation.file_size || animation.fileSize,
        author: {
          name: animation.author?.name || animation.created_by?.name || 'Unknown',
          avatarUrl: animation.author?.avatar_url || animation.created_by?.avatar_url
        },
        likes: animation.likes_count || animation.likes || 0,
        downloads: animation.downloads_count || animation.downloads || 0,
        tags: animation.tags || [],
        colors: animation.colors || [],
        createdAt: animation.created_at || animation.createdAt
      }))
    };
  },

  /**
   * Download Lottie animation JSON
   */
  async downloadLottie(animationId) {
    try {
      const response = await fetch(
        `https://lottiefiles.com/api/public/animations/${animationId}/download`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Strapi-CMS-Backend'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to download Lottie animation: ${response.statusText}`);
      }

      const animationData = await response.json();
      
      return {
        id: animationId,
        data: animationData,
        size: JSON.stringify(animationData).length
      };
    } catch (error) {
      strapi.log.error('Lottie download failed:', error);
      throw error;
    }
  },

  /**
   * Search for free icons (using Iconify)
   */
  async searchIcons(query, options = {}) {
    try {
      const { limit = 50, prefix } = options;
      
      // Search using Iconify API
      const params = new URLSearchParams({
        query,
        limit,
        ...(prefix && { prefix })
      });

      const response = await fetch(
        `https://api.iconify.design/search?${params}`,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Iconify search error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        total: data.total || 0,
        icons: (data.icons || []).map(icon => ({
          name: icon,
          svg: `https://api.iconify.design/${icon}.svg`,
          collection: icon.split(':')[0],
          iconName: icon.split(':')[1]
        }))
      };
    } catch (error) {
      strapi.log.error('Icon search failed:', error);
      throw error;
    }
  }
});
