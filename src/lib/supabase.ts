import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://txilzsiohniphavvgdzc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4aWx6c2lvaG5pcGhhdnZnZHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNzAzOTAsImV4cCI6MjA4Njk0NjM5MH0.JR1PYFkiClCXTBPsspdKZYSP_MwdITjU2cu2eluBQdA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  }
});
