import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.migration' });

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

// Load VITE_SUPABASE_ANON_KEY from .env
dotenv.config({ path: '.env' });
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

async function testAuth() {
  const testEmail = 'test-auth-bot@cafetags.com';
  const testPassword = 'TestPassword123!';
  
  console.log('1. Creating test user via Admin API...');
  const { data: user, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email: testEmail,
    password: testPassword,
    email_confirm: true
  });
  
  if (createError) {
    console.error('❌ Failed to create user:', createError.message);
    return;
  }
  
  console.log('2. Attempting to log in as test user via Client API...');
  const { data: session, error: loginError } = await supabaseClient.auth.signInWithPassword({
    email: testEmail,
    password: testPassword
  });
  
  if (loginError) {
    console.error('❌ Login failed:', loginError.message);
  } else {
    console.log('✅ Login successful! Supabase Auth is fully operational.');
  }
  
  console.log('3. Cleaning up test user...');
  await supabaseAdmin.auth.admin.deleteUser(user.user.id);
  console.log('✅ Cleanup complete.');
}

testAuth();
