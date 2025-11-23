// Quick script to check if .env file exists and has required variables
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');

console.log('🔍 Checking environment variables...\n');
console.log(`Looking for .env file at: ${envPath}\n`);

if (!fs.existsSync(envPath)) {
  console.error('❌ .env file NOT FOUND!');
  console.log('\n📝 To fix this:');
  console.log('1. Copy env.example to .env:');
  console.log('   cp env.example .env');
  console.log('2. Edit .env and add your Supabase credentials\n');
  process.exit(1);
}

console.log('✅ .env file found!\n');

// Read and parse .env
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

console.log('📋 Required variables:');
const required = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'JWT_SECRET'];
let allPresent = true;

required.forEach((varName) => {
  const value = envVars[varName];
  if (value && value !== `your-${varName.toLowerCase().replace(/_/g, '-')}` && !value.includes('your-')) {
    console.log(`  ✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`  ❌ ${varName}: MISSING or NOT SET`);
    allPresent = false;
  }
});

console.log('\n📋 Optional variables:');
const optional = ['PORT', 'NODE_ENV', 'FRONTEND_URL'];
optional.forEach((varName) => {
  const value = envVars[varName];
  if (value) {
    console.log(`  ✅ ${varName}: ${value}`);
  } else {
    console.log(`  ⚠️  ${varName}: Not set (using default)`);
  }
});

if (!allPresent) {
  console.log('\n❌ Some required variables are missing!');
  console.log('\n📝 To fix:');
  console.log('1. Open .env file');
  console.log('2. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  console.log('3. Get these from Supabase Dashboard → Settings → API\n');
  process.exit(1);
}

console.log('\n✅ All required environment variables are set!');
console.log('🚀 You can now run: npm run dev\n');

