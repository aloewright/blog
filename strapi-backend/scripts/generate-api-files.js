const fs = require('fs');
const path = require('path');

const contentTypes = [
  'article-draft',
  'research-note',
  'reference',
  'writing-prompt',
  'story-idea',
  'visual-asset'
];

const createController = (name) => {
  return `'use strict';

/**
 * ${name} controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::${name}.${name}');`;
};

const createService = (name) => {
  return `'use strict';

/**
 * ${name} service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::${name}.${name}');`;
};

const createRoute = (name) => {
  return `'use strict';

/**
 * ${name} router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::${name}.${name}');`;
};

// Generate files for each content type
contentTypes.forEach(contentType => {
  const apiPath = path.join(__dirname, '..', 'src', 'api', contentType);
  
  // Create directories
  ['controllers', 'services', 'routes'].forEach(dir => {
    const dirPath = path.join(apiPath, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
  
  // Create controller
  fs.writeFileSync(
    path.join(apiPath, 'controllers', `${contentType}.js`),
    createController(contentType)
  );
  
  // Create service
  fs.writeFileSync(
    path.join(apiPath, 'services', `${contentType}.js`),
    createService(contentType)
  );
  
  // Create route
  fs.writeFileSync(
    path.join(apiPath, 'routes', `${contentType}.js`),
    createRoute(contentType)
  );
  
  console.log(`✅ Generated API files for ${contentType}`);
});

console.log('\n🎉 All API files generated successfully!');
