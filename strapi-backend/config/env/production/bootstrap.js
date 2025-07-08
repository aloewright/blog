// Set cloud-cronjob-runner environment variables before Strapi starts
// This is a workaround for Strapi Cloud's cronjob runner requirements

// Check if we're in Strapi Cloud by looking for their specific env vars
const isInStrapiCloud = process.env.STRAPI_CLOUD || process.env.RAILWAY_ENVIRONMENT;

if (isInStrapiCloud || process.env.NODE_ENV === 'production') {
  console.log('[Bootstrap] Setting cloud-cronjob-runner defaults...');
  
  // Set defaults only if not already present
  if (!process.env.STRAPI_CLOUD_CRONJOB_API_TOKEN) {
    process.env.STRAPI_CLOUD_CRONJOB_API_TOKEN = process.env.CRONJOB_API_TOKEN || 'sk-dummy-token-replace-in-dashboard';
    console.log('[Bootstrap] Set STRAPI_CLOUD_CRONJOB_API_TOKEN');
  }
  
  if (!process.env.STRAPI_CLOUD_CRONJOB_API_URL) {
    process.env.STRAPI_CLOUD_CRONJOB_API_URL = process.env.CRONJOB_API_URL || 'https://api.strapi.cloud/cronjobs';
    console.log('[Bootstrap] Set STRAPI_CLOUD_CRONJOB_API_URL');
  }
  
  if (!process.env.STRAPI_CLOUD_CRONJOB_FIRST_RUN_WINDOW) {
    process.env.STRAPI_CLOUD_CRONJOB_FIRST_RUN_WINDOW = '300';
    console.log('[Bootstrap] Set STRAPI_CLOUD_CRONJOB_FIRST_RUN_WINDOW');
  }
}

module.exports = () => {
  // This runs after Strapi has loaded
  console.log('[Bootstrap] Strapi is starting...');
};
