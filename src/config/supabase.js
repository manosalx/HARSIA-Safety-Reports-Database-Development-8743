import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eqhmnmulwogveppscfor.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxaG1ubXVsd29ndmVwcHNjZm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDgzNzUsImV4cCI6MjA2NzMyNDM3NX0.UOjpgce-YQgGbUoUo9d-YOF5aFyp3cRgyCLJEamvc7E';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false
  }
});

// Test connection
console.log('Supabase: Connected to', supabaseUrl);