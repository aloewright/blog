module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('CLOUDFLARE_R2_PUBLIC_URL'), // Your R2 public URL
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
          ACL: null, // R2 doesn't support ACL
        },
        uploadStream: {
          ACL: null,
        },
        delete: {},
      },
    },
  },
  // Image optimization settings
  // 'image-optimizer': {
  //   enabled: true,
  //   config: {
  //     include: ['jpeg', 'jpg', 'png', 'webp'],
  //     sizes: [
  //       {
  //         name: 'thumbnail',
  //         width: 245,
  //         height: 156,
  //         formats: ['jpeg', 'webp'],
  //       },
  //       {
  //         name: 'small',
  //         width: 500,
  //         height: undefined,
  //         formats: ['jpeg', 'webp'],
  //       },
  //       {
  //         name: 'medium',
  //         width: 1000,
  //         height: undefined,
  //         formats: ['jpeg', 'webp'],
  //       },
  //       {
  //         name: 'large',
  //         width: 1920,
  //         height: undefined,
  //         formats: ['jpeg', 'webp'],
  //       },
  //     ],
  //     additionalFormats: ['webp', 'avif'],
  //     quality: 85,
  //   },
  // },
});
