module.exports = ({ env }) => {
  // Use the actual environment variable names from Strapi Cloud
  const cronjobToken = env('STRAPI_CLOUD_CRONJOB_API') || '5d51783ee934e13e42929a6a187addf7439ff2a3d79f71a4afb67a9f8f09d553';
  const cronjobUrl = env('STRAPI_CLOUD_CRONJOB_API_URL') || 'https://api.strapi.cloud';
  const cronjobWindow = env.int('STRAPI_CLOUD_CRONJOB_FIRST_RUN_WINDOW', 300);
  
  return {
    // Cloud cronjob runner configuration for Strapi Cloud
    'cloud-cronjob-runner': {
      enabled: true,
      config: {
        apiToken: cronjobToken,
        apiUrl: cronjobUrl,
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
