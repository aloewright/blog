# Strapi Cloud Environment Variables Configuration

This document contains all the environment variables you need to configure in your Strapi Cloud dashboard.

## 1. Core Configuration

```bash
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
```

## 2. Security Keys (REQUIRED - Use these generated secure values)

```bash
# Application Keys (comma-separated list of keys)
APP_KEYS=sQ/zZWWlzsrX/8YfyjUspw==,bJ0/lFPFrNDffC7ebJ8d6A==

# API Token Salt
API_TOKEN_SALT=jENBAMaluz468MtiAwIRnw==

# Admin JWT Secret
ADMIN_JWT_SECRET=yXvZ6pDx/9HpfODstBKQ1PKdS3IvrCunniknQjn9CGA=

# Transfer Token Salt
TRANSFER_TOKEN_SALT=gECz36v8q4nNlUSlyodFuA==

# JWT Secret
JWT_SECRET=snM/O8GKiIX8S/YtSC/ZGTO/nHsq5r0h1SE/eZ7lyU4=
```

⚠️ **IMPORTANT**: These are freshly generated secure values. Do NOT use the example values from .env.example files.

## 3. Database Configuration

Strapi Cloud provides a managed PostgreSQL database. You do NOT need to configure database variables as Strapi Cloud will automatically inject the database connection details.

**Remove or comment out these variables in Strapi Cloud:**
- ❌ DATABASE_CLIENT
- ❌ DATABASE_HOST
- ❌ DATABASE_PORT
- ❌ DATABASE_NAME
- ❌ DATABASE_USERNAME
- ❌ DATABASE_PASSWORD
- ❌ DATABASE_URL
- ❌ DATABASE_FILENAME

## 4. Media Search APIs (OPTIONAL)

Only add these if you're using the Unsplash or Lottie integrations:

```bash
# Unsplash API Access Key (get from https://unsplash.com/developers)
UNSPLASH_ACCESS_KEY=your-unsplash-access-key

# Lottie API Key (optional - get from https://lottiefiles.com/developers)
LOTTIE_API_KEY=your-lottie-api-key
```

## 5. Cloud Storage Configuration (OPTIONAL)

Choose ONE of the following options if you want to use external storage for media files:

### Option A: Cloudflare R2 Storage

```bash
CLOUDFLARE_R2_ENDPOINT=https://<your-account-id>.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your-r2-access-key-id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
CLOUDFLARE_R2_BUCKET=your-bucket-name
CLOUDFLARE_R2_PUBLIC_URL=https://your-custom-domain.com
```

### Option B: Google Cloud Storage

```bash
GCS_SERVICE_ACCOUNT=your-service-account-json-base64-encoded
GCS_BUCKET_NAME=your-gcs-bucket-name
GCS_BASE_URL=https://storage.googleapis.com/your-bucket-name
```

## How to Add Environment Variables in Strapi Cloud

1. Log in to your Strapi Cloud dashboard
2. Navigate to your project
3. Go to **Settings** → **Variables**
4. Click **Add variable**
5. For each variable:
   - Enter the **Key** (e.g., `APP_KEYS`)
   - Enter the **Value** (e.g., `sQ/zZWWlzsrX/8YfyjUspw==,bJ0/lFPFrNDffC7ebJ8d6A==`)
   - Make sure **Production** environment is selected
   - Click **Save**

## Environment Variables Checklist

### Required Variables:
- [ ] NODE_ENV
- [ ] APP_KEYS
- [ ] API_TOKEN_SALT
- [ ] ADMIN_JWT_SECRET
- [ ] TRANSFER_TOKEN_SALT
- [ ] JWT_SECRET

### Optional Variables (based on your integrations):
- [ ] UNSPLASH_ACCESS_KEY (if using Unsplash)
- [ ] LOTTIE_API_KEY (if using Lottie)
- [ ] Cloudflare R2 variables (if using R2 storage)
- [ ] Google Cloud Storage variables (if using GCS)

## Important Notes

1. **Database**: Strapi Cloud automatically provides and configures the PostgreSQL database. Do not add any DATABASE_* variables.

2. **Security**: The security keys provided above are cryptographically secure random values. Never share these keys publicly or commit them to version control.

3. **Storage**: If you're not using external storage, Strapi Cloud will use local storage by default. Consider setting up Cloudflare R2 or Google Cloud Storage for production media handling.

4. **API Keys**: Only add UNSPLASH_ACCESS_KEY and LOTTIE_API_KEY if you're actually using these integrations in your Strapi application.

## Verification

After adding all variables, your Strapi Cloud application should start successfully. Check the deployment logs to ensure there are no environment variable-related errors.
