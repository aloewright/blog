'use strict';

/**
 * AI Assistant custom routes
 */

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/ai/generate-outline',
      handler: 'ai-assistant.generateOutline',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/ai/enhance-content',
      handler: 'ai-assistant.enhanceContent',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/ai/discover-stories',
      handler: 'ai-assistant.discoverStories',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/ai/extract-insights',
      handler: 'ai-assistant.extractInsights',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/ai/generate-seo',
      handler: 'ai-assistant.generateSEO',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/ai/analyze-content',
      handler: 'ai-assistant.analyzeContent',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/ai/generate-citations',
      handler: 'ai-assistant.generateCitations',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
