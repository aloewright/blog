module.exports = ({ env }) => {
  // Try to get the cloud cronjob runner values
  const cronjobToken = env('STRAPI_CLOUD_CRONJOB_API_TOKEN') || env('CRONJOB_API_TOKEN') || env('CLOUD_CRONJOB_API_TOKEN');
  const cronjobUrl = env('STRAPI_CLOUD_CRONJOB_API_URL') || env('CRONJOB_API_URL') || env('CLOUD_CRONJOB_API_URL');
  const cronjobWindow = env.int('STRAPI_CLOUD_CRONJOB_FIRST_RUN_WINDOW', 300);
  
  // Log for debugging
  console.log('Cronjob config:', {
    hasToken: !!cronjobToken,
    hasUrl: !!cronjobUrl,
    window: cronjobWindow
  });
  
  return {
    // Cloud cronjob runner configuration for Strapi Cloud
    'cloud-cronjob-runner': {
      enabled: !!(cronjobToken && cronjobUrl),
      config: {
        apiToken: cronjobToken || 'dummy-token-not-configured',
        apiUrl: cronjobUrl || 'https://api.strapi.cloud/dummy',
        firstRunWindow: cronjobWindow,
      },
    },
  // Upload configuration
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('CLOUDFLARE_R2_PUBLIC_URL'),
        s3Options: {
          credentials: {
            accessKeyId: env('CLOUDFLARE_R2_ACCESS_KEY_ID'),
            secretAccessKey: env('CLOUDFLARE_R2_SECRET_ACCESS_KEY'),
          },
          endpoint: env('CLOUDFLARE_R2_ENDPOINT'),
          region: 'auto',
          params: {
            Bucket: env('CLOUDFLARE_R2_BUCKET'),
          },
        },
      },
      actionOptions: {
        upload: {
          ACL: null,
        },
        uploadStream: {
          ACL: null,
        },
        delete: {},
      },
    },
  },
  };
};
