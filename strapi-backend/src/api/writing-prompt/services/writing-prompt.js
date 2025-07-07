'use strict';

/**
 * writing-prompt service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::writing-prompt.writing-prompt');