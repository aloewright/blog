'use strict';

const aiService = require('./services/ai-service');
const mediaSearchService = require('./services/media-search-service');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    // Register AI service
    strapi.service('ai') = aiService({ strapi });
    
    // Register Media Search service
    strapi.service('mediaSearch') = mediaSearchService({ strapi });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // Initialize AI service connections if needed
    strapi.log.info('AI Writing Assistant service initialized');
  },
};
