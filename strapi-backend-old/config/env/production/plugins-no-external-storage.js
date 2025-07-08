// Use this configuration if you're NOT using external storage (R2 or GCS)
// Rename this file to plugins.js if you want to use Strapi Cloud's local storage

module.exports = ({ env }) => ({
  // Using default local storage provider
  upload: {
    config: {
      sizeLimit: 250 * 1024 * 1024, // 250mb in bytes
    },
  },
});
