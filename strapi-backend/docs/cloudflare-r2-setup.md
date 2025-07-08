# Cloudflare R2 Setup for Strapi Media Storage

## Step 1: Create R2 Bucket

1. **Login to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com/
   - Sign in to your account

2. **Navigate to R2**
   - In the left sidebar, click on "R2"
   - If you don't see R2, you may need to enable it first

3. **Create a New Bucket**
   - Click "Create bucket"
   - Enter a bucket name (e.g., `strapi-media-production`)
   - Select a location (choose one close to your users)
   - Click "Create bucket"

## Step 2: Generate API Credentials

1. **Go to R2 Settings**
   - In the R2 dashboard, click on "Manage R2 API Tokens"
   - Or go to: Account Settings → R2 → API Tokens

2. **Create API Token**
   - Click "Create API token"
   - Give it a name (e.g., `strapi-production-token`)
   - For permissions:
     - Select "Object Read & Write" (for full media management)
     - Select "Apply to specific buckets only"
     - Choose your bucket (e.g., `strapi-media-production`)
   - Set TTL (optional, leave empty for no expiration)
   - Click "Create API Token"

3. **Save Your Credentials**
   - You'll see:
     - Access Key ID
     - Secret Access Key
     - Endpoint URL (format: `https://<account_id>.r2.cloudflarestorage.com`)
   - **IMPORTANT**: Save these immediately! The Secret Access Key won't be shown again.

## Step 3: Configure Public Access (Optional but Recommended)

1. **Set up Custom Domain for Public Access**
   - In your bucket settings, go to "Settings" tab
   - Under "Public access", click "Connect domain"
   - Enter a subdomain (e.g., `media.yourdomain.com`)
   - Follow DNS configuration instructions

2. **Alternative: Use R2.dev Subdomain**
   - In bucket settings, enable "R2.dev subdomain"
   - You'll get a public URL like: `https://<bucket-name>.<account-id>.r2.dev`

## Step 4: Environment Variables for Strapi Cloud

Add these to your Strapi Cloud environment variables:

```bash
# R2 Endpoint (from your API token creation)
CLOUDFLARE_R2_ENDPOINT=https://<your-account-id>.r2.cloudflarestorage.com

# R2 Access Credentials
CLOUDFLARE_R2_ACCESS_KEY_ID=<your-access-key-id>
CLOUDFLARE_R2_SECRET_ACCESS_KEY=<your-secret-access-key>

# Your bucket name
CLOUDFLARE_R2_BUCKET=strapi-media-production

# Public URL (choose one):
# Option 1: Custom domain
CLOUDFLARE_R2_PUBLIC_URL=https://media.yourdomain.com

# Option 2: R2.dev subdomain
CLOUDFLARE_R2_PUBLIC_URL=https://<bucket-name>.<account-id>.r2.dev
```

## Step 5: Verify Configuration

Your `config/plugins.js` is already configured correctly:

```javascript
module.exports = ({ env }) => ({
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
```

## Troubleshooting

1. **"Access Denied" errors**
   - Verify your API token has "Object Read & Write" permissions
   - Check that the token is applied to the correct bucket

2. **Images not publicly accessible**
   - Ensure you've set up either a custom domain or R2.dev subdomain
   - Verify CLOUDFLARE_R2_PUBLIC_URL is set correctly

3. **Upload failures**
   - Double-check all environment variables are set in Strapi Cloud
   - Verify bucket name matches exactly (case-sensitive)
   - Check R2 endpoint URL format

## Benefits of Using R2

- **Cost-effective**: No egress fees
- **S3-compatible**: Works with existing S3 tools and libraries
- **Global CDN**: Automatic global distribution
- **No vendor lock-in**: Easy to migrate to/from other S3-compatible services
