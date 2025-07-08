#!/usr/bin/env node

/**
 * Script to switch between Cloudflare R2 and Google Cloud Storage providers
 * Usage: node scripts/switch-storage-provider.js [r2|gcs]
 */

const fs = require('fs');
const path = require('path');

const PLUGINS_CONFIG_PATH = path.join(__dirname, '..', 'config', 'plugins.js');

const R2_CONFIG = `module.exports = ({ env }) => ({
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
});
`;

const GCS_CONFIG = `module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
      providerOptions: {
        serviceAccount: env('GCS_SERVICE_ACCOUNT'),
        bucketName: env('GCS_BUCKET_NAME'),
        baseUrl: env('GCS_BASE_URL'),
        basePath: '', // optional: add a base path for all media files
        publicFiles: true, // make files public by default
      },
    },
  },
});
`;

const provider = process.argv[2];

if (!provider || !['r2', 'gcs'].includes(provider.toLowerCase())) {
  console.log('Usage: node scripts/switch-storage-provider.js [r2|gcs]');
  console.log('  r2  - Switch to Cloudflare R2');
  console.log('  gcs - Switch to Google Cloud Storage');
  process.exit(1);
}

// Backup current config
const backupPath = `${PLUGINS_CONFIG_PATH}.backup`;
if (fs.existsSync(PLUGINS_CONFIG_PATH)) {
  fs.copyFileSync(PLUGINS_CONFIG_PATH, backupPath);
  console.log(`✅ Backed up current config to ${backupPath}`);
}

// Write new config
const newConfig = provider.toLowerCase() === 'r2' ? R2_CONFIG : GCS_CONFIG;
fs.writeFileSync(PLUGINS_CONFIG_PATH, newConfig);

console.log(`✅ Switched to ${provider.toUpperCase()} storage provider`);
console.log(`📝 Config file updated: ${PLUGINS_CONFIG_PATH}`);

if (provider.toLowerCase() === 'r2') {
  console.log('\n📋 Required environment variables for Cloudflare R2:');
  console.log('  - CLOUDFLARE_R2_ENDPOINT');
  console.log('  - CLOUDFLARE_R2_ACCESS_KEY_ID');
  console.log('  - CLOUDFLARE_R2_SECRET_ACCESS_KEY');
  console.log('  - CLOUDFLARE_R2_BUCKET');
  console.log('  - CLOUDFLARE_R2_PUBLIC_URL');
} else {
  console.log('\n📋 Required environment variables for Google Cloud Storage:');
  console.log('  - GCS_SERVICE_ACCOUNT (base64 encoded)');
  console.log('  - GCS_BUCKET_NAME');
  console.log('  - GCS_BASE_URL');
  console.log('\n⚠️  Don\'t forget to install the GCS provider:');
  console.log('  npm install @strapi-community/strapi-provider-upload-google-cloud-storage');
}

console.log('\n✨ Remember to add these environment variables to Strapi Cloud!');
