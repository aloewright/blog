# Google Cloud Storage Setup for Strapi Media Storage

## Prerequisites
- Google Cloud Platform account
- A GCP project created
- `gcloud` CLI tool installed (optional but helpful)

## Step 1: Create GCS Bucket

1. **Go to Google Cloud Console**
   - Navigate to https://console.cloud.google.com/
   - Select your project or create a new one

2. **Navigate to Cloud Storage**
   - In the left menu, go to "Storage" → "Browser"
   - Or search for "Cloud Storage" in the search bar

3. **Create a New Bucket**
   - Click "CREATE BUCKET"
   - Choose a globally unique name (e.g., `your-company-strapi-media`)
   - Select location type:
     - Multi-region (recommended for global apps)
     - Dual-region (for specific region pairs)
     - Single region (most cost-effective)
   - Choose storage class:
     - Standard (recommended for frequently accessed media)
   - Access control:
     - Uniform (recommended)
   - Click "CREATE"

## Step 2: Configure Public Access

1. **Make Bucket Public (for media files)**
   - Go to your bucket
   - Click on "PERMISSIONS" tab
   - Click "GRANT ACCESS"
   - Add principal: `allUsers`
   - Role: `Storage Object Viewer`
   - Click "SAVE"

2. **Configure CORS (if needed)**
   ```json
   [
     {
       "origin": ["*"],
       "method": ["GET", "HEAD"],
       "responseHeader": ["Content-Type"],
       "maxAgeSeconds": 3600
     }
   ]
   ```

## Step 3: Create Service Account

1. **Navigate to Service Accounts**
   - Go to "IAM & Admin" → "Service Accounts"
   - Or navigate to: https://console.cloud.google.com/iam-admin/serviceaccounts

2. **Create Service Account**
   - Click "CREATE SERVICE ACCOUNT"
   - Name: `strapi-media-service`
   - Description: "Service account for Strapi media uploads"
   - Click "CREATE AND CONTINUE"

3. **Grant Permissions**
   - Add role: `Storage Admin` (for the specific bucket)
   - Or more restrictive: `Storage Object Admin`
   - Click "CONTINUE"
   - Click "DONE"

4. **Create and Download Key**
   - Click on the service account you just created
   - Go to "KEYS" tab
   - Click "ADD KEY" → "Create new key"
   - Choose "JSON" format
   - Click "CREATE"
   - Save the downloaded JSON file securely

## Step 4: Convert Service Account JSON to Base64

### Option A: Using Command Line (macOS/Linux)
```bash
base64 -i path/to/your-service-account-key.json | tr -d '\n' > service-account-base64.txt
```

### Option B: Using Command Line (Windows)
```powershell
[Convert]::ToBase64String([System.IO.File]::ReadAllBytes("path\to\your-service-account-key.json")) | Out-File service-account-base64.txt -NoNewline
```

### Option C: Using Node.js
```javascript
const fs = require('fs');
const serviceAccount = fs.readFileSync('path/to/your-service-account-key.json');
const base64 = Buffer.from(serviceAccount).toString('base64');
console.log(base64);
```

## Step 5: Update Strapi Configuration

1. **Update config/plugins.js**
```javascript
module.exports = ({ env }) => ({
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
```

2. **Install the GCS provider**
```bash
npm install @strapi-community/strapi-provider-upload-google-cloud-storage
```

## Step 6: Environment Variables for Strapi Cloud

Add these to your Strapi Cloud environment variables:

```bash
# Base64 encoded service account JSON
GCS_SERVICE_ACCOUNT=<your-base64-encoded-service-account-json>

# Your bucket name
GCS_BUCKET_NAME=your-company-strapi-media

# Base URL for public access
GCS_BASE_URL=https://storage.googleapis.com/your-company-strapi-media
```

## Step 7: Alternative Configuration (Using Individual Credentials)

If you prefer not to use base64 encoding, you can use individual credential fields:

```javascript
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
      providerOptions: {
        email: env('GCS_EMAIL'),
        privateKey: env('GCS_PRIVATE_KEY'),
        projectId: env('GCS_PROJECT_ID'),
        bucketName: env('GCS_BUCKET_NAME'),
        baseUrl: env('GCS_BASE_URL'),
      },
    },
  },
});
```

Environment variables:
```bash
GCS_EMAIL=strapi-media-service@your-project.iam.gserviceaccount.com
GCS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GCS_PROJECT_ID=your-gcp-project-id
GCS_BUCKET_NAME=your-company-strapi-media
GCS_BASE_URL=https://storage.googleapis.com/your-company-strapi-media
```

## Troubleshooting

1. **Authentication Errors**
   - Verify service account has correct permissions
   - Check base64 encoding is correct (no line breaks)
   - Ensure service account key is not expired

2. **Upload Failures**
   - Verify bucket name is correct
   - Check service account has `Storage Object Admin` role
   - Ensure bucket exists and is in the correct project

3. **Public Access Issues**
   - Verify bucket has `allUsers` with `Storage Object Viewer` role
   - Check GCS_BASE_URL is correctly formatted
   - Ensure CORS is configured if accessing from browser

## Benefits of Using Google Cloud Storage

- **Highly durable**: 99.999999999% (11 9's) durability
- **Global CDN**: Integrated with Google's global network
- **Fine-grained access control**: IAM and ACL support
- **Multiple storage classes**: Optimize costs based on access patterns
- **Integration**: Works well with other Google Cloud services

## Cost Optimization Tips

1. **Use appropriate storage class**
   - Standard: Frequently accessed files
   - Nearline: Accessed once per month
   - Coldline: Accessed once per quarter
   - Archive: Rarely accessed files

2. **Set lifecycle rules**
   - Automatically transition older files to cheaper storage classes
   - Delete temporary or outdated files

3. **Enable CDN**
   - Use Cloud CDN for better performance and reduced egress costs
