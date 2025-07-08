module.exports = ({ env }) => ({
  // Cloud cronjob runner configuration for Strapi Cloud
  'cloud-cronjob-runner': {
    enabled: true,
    config: {
      apiToken: env('STRAPI_CLOUD_CRONJOB_API_TOKEN'),
      apiUrl: env('STRAPI_CLOUD_CRONJOB_API_URL'),
      firstRunWindow: env.int('STRAPI_CLOUD_CRONJOB_FIRST_RUN_WINDOW', 300),
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
});
