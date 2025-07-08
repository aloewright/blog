'use strict';

/**
 * research-note service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::research-note.research-note');