'use strict';

/**
 * Media Search controller
 * Endpoints for searching Unsplash, Lottie, and icons
 */

module.exports = {
  /**
   * Search Unsplash images
   */
  async searchUnsplash(ctx) {
    try {
      const { query } = ctx.query;
      
      if (!query) {
        return ctx.badRequest('Search query is required');
      }

      const options = {
        page: ctx.query.page ? parseInt(ctx.query.page) : 1,
        perPage: ctx.query.perPage ? parseInt(ctx.query.perPage) : 20,
        orientation: ctx.query.orientation,
        color: ctx.query.color,
        orderBy: ctx.query.orderBy
      };

      const results = await strapi.service('mediaSearch').searchUnsplash(query, options);
      
      return ctx.send({
        data: results
      });
    } catch (error) {
      strapi.log.error('Unsplash search error:', error);
      
      if (error.message.includes('not configured')) {
        return ctx.badRequest('Unsplash API key not configured');
      }
      
      return ctx.internalServerError('Failed to search Unsplash');
    }
  },

  /**
   * Download Unsplash image
   */
  async downloadUnsplash(ctx) {
    try {
      const { downloadLocation } = ctx.request.body;
      
      if (!downloadLocation) {
        return ctx.badRequest('Download location is required');
      }

      const result = await strapi.service('mediaSearch').downloadUnsplash(downloadLocation);
      
      return ctx.send({
        data: result
      });
    } catch (error) {
      return ctx.internalServerError('Failed to track Unsplash download');
    }
  },

  /**
   * Search Lottie animations
   */
  async searchLottie(ctx) {
    try {
      const { query } = ctx.query;
      
      if (!query) {
        return ctx.badRequest('Search query is required');
      }

      const options = {
        page: ctx.query.page ? parseInt(ctx.query.page) : 1,
        perPage: ctx.query.perPage ? parseInt(ctx.query.perPage) : 20,
        category: ctx.query.category,
        tag: ctx.query.tag,
        premium: ctx.query.premium === 'true'
      };

      const results = await strapi.service('mediaSearch').searchLottie(query, options);
      
      return ctx.send({
        data: results
      });
    } catch (error) {
      strapi.log.error('Lottie search error:', error);
      return ctx.internalServerError('Failed to search Lottie animations');
    }
  },

  /**
   * Download Lottie animation
   */
  async downloadLottie(ctx) {
    try {
      const { animationId } = ctx.params;
      
      if (!animationId) {
        return ctx.badRequest('Animation ID is required');
      }

      const animation = await strapi.service('mediaSearch').downloadLottie(animationId);
      
      return ctx.send({
        data: animation
      });
    } catch (error) {
      return ctx.internalServerError('Failed to download Lottie animation');
    }
  },

  /**
   * Search icons
   */
  async searchIcons(ctx) {
    try {
      const { query } = ctx.query;
      
      if (!query) {
        return ctx.badRequest('Search query is required');
      }

      const options = {
        limit: ctx.query.limit ? parseInt(ctx.query.limit) : 50,
        prefix: ctx.query.prefix
      };

      const results = await strapi.service('mediaSearch').searchIcons(query, options);
      
      return ctx.send({
        data: results
      });
    } catch (error) {
      strapi.log.error('Icon search error:', error);
      return ctx.internalServerError('Failed to search icons');
    }
  },

  /**
   * Save media reference to database
   */
  async saveMediaReference(ctx) {
    try {
      const { 
        type, 
        externalId, 
        name, 
        url, 
        metadata 
      } = ctx.request.body;

      if (!type || !externalId || !url) {
        return ctx.badRequest('Type, external ID, and URL are required');
      }

      // Create a media item record
      const mediaItem = await strapi.entityService.create('api::media-item.media-item', {
        data: {
          name: name || `${type} - ${externalId}`,
          alternativeText: metadata?.description,
          category: type === 'unsplash' ? 'image' : type === 'lottie' ? 'other' : 'other',
          source: type,
          metadata: {
            externalId,
            url,
            ...metadata
          },
          tags: metadata?.tags || []
        }
      });

      return ctx.send({
        data: mediaItem
      });
    } catch (error) {
      strapi.log.error('Save media reference error:', error);
      return ctx.internalServerError('Failed to save media reference');
    }
  }
};
