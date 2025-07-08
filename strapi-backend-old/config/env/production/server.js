module.exports = ({ env }) => {
  // Set defaults for cloud cronjob runner if not already set
  if (!process.env.STRAPI_CLOUD_CRONJOB_API_TOKEN) {
    process.env.STRAPI_CLOUD_CRONJOB_API_TOKEN = process.env.CRONJOB_API_TOKEN || 'dummy-token';
  }
  if (!process.env.STRAPI_CLOUD_CRONJOB_API_URL) {
    process.env.STRAPI_CLOUD_CRONJOB_API_URL = process.env.CRONJOB_API_URL || 'https://api.strapi.cloud';
  }
  if (!process.env.STRAPI_CLOUD_CRONJOB_FIRST_RUN_WINDOW) {
    process.env.STRAPI_CLOUD_CRONJOB_FIRST_RUN_WINDOW = '300';
  }
  
  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env.array('APP_KEYS'),
    },
    url: env('PUBLIC_URL', ''),
    webhooks: {
      populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
  };
};
