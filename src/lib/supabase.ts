import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fuwfnrbzirryxozkmvmb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1d2ZucmJ6aXJyeXhvemttdm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MjkyODMsImV4cCI6MjA4MDUwNTI4M30.KUc3-QWASptUSnXCQ-tPtIWIq9Aly0TB0VpZaw6Oegc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
