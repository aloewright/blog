const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Strapi backend...\n');

// Generate secure keys
const generateKey = () => crypto.randomBytes(16).toString('base64');

// Check if .env exists
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  
  // Read example env
  let envContent = fs.readFileSync(envExamplePath, 'utf8');
  
  // Replace placeholder values with secure keys
  envContent = envContent
    .replace('APP_KEYS="toBeModified1,toBeModified2"', `APP_KEYS="${generateKey()},${generateKey()}"`)
    .replace('API_TOKEN_SALT=toBeModified', `API_TOKEN_SALT=${generateKey()}`)
    .replace('ADMIN_JWT_SECRET=toBeModified', `ADMIN_JWT_SECRET=${generateKey()}`)
    .replace('TRANSFER_TOKEN_SALT=toBeModified', `TRANSFER_TOKEN_SALT=${generateKey()}`)
    .replace('JWT_SECRET=toBeModified', `JWT_SECRET=${generateKey()}`);
  
  // Write new .env file
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created with secure keys\n');
} else {
  console.log('⚠️  .env file already exists, skipping...\n');
}

console.log('📋 Next steps:');
console.log('1. Update the database credentials in .env');
console.log('2. Create a PostgreSQL database if not exists');
console.log('3. Run: npm run build');
console.log('4. Run: npm run develop');
console.log('\n🎉 Setup complete!');
