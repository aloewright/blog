'use strict';

/**
 * article-draft service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::article-draft.article-draft');