'use strict';

/**
 * Media Search routes
 */

module.exports = {
  routes: [
    // Unsplash routes
    {
      method: 'GET',
      path: '/media-search/unsplash',
      handler: 'media-search.searchUnsplash',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/media-search/unsplash/download',
      handler: 'media-search.downloadUnsplash',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Lottie routes
    {
      method: 'GET',
      path: '/media-search/lottie',
      handler: 'media-search.searchLottie',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/media-search/lottie/:animationId/download',
      handler: 'media-search.downloadLottie',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Icon routes
    {
      method: 'GET',
      path: '/media-search/icons',
      handler: 'media-search.searchIcons',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Save media reference
    {
      method: 'POST',
      path: '/media-search/save-reference',
      handler: 'media-search.saveMediaReference',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
