'use strict';

/**
 * story-idea service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::story-idea.story-idea');