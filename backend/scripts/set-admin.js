// Script to set user as admin
// Usage: node scripts/set-admin.js <email>

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const email = process.argv[2];

if (!email) {
  console.error('❌ Please provide an email address');
  console.log('\nUsage: node scripts/set-admin.js <email>');
  console.log('Example: node scripts/set-admin.js admin@example.com\n');
  process.exit(1);
}

async function setAdmin() {
  console.log(`\n🔍 Looking for user with email: ${email}\n`);

  // Find user
  const { data: user, error: findError } = await supabase
    .from('users')
    .select('id, name, email, role')
    .eq('email', email)
    .single();

  if (findError || !user) {
    console.error('❌ User not found!');
    console.error('Please make sure the user exists. Register first using the API.\n');
    process.exit(1);
  }

  console.log('✅ User found:');
  console.log(`   ID: ${user.id}`);
  console.log(`   Name: ${user.name}`);
  console.log(`   Email: ${user.email}`);
  console.log(`   Current Role: ${user.role || 'user'}\n`);

  if (user.role === 'admin') {
    console.log('ℹ️  User is already an admin!\n');
    process.exit(0);
  }

  // Update role to admin
  const { data: updatedUser, error: updateError } = await supabase
    .from('users')
    .update({ role: 'admin' })
    .eq('id', user.id)
    .select('id, name, email, role')
    .single();

  if (updateError) {
    console.error('❌ Failed to update user role:');
    console.error(updateError);
    process.exit(1);
  }

  console.log('✅ User role updated successfully!');
  console.log(`   New Role: ${updatedUser.role}\n`);
  console.log('🎉 User can now access admin endpoints!\n');
}

setAdmin().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});

