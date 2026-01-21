import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://psaacanfxpqfhrgmvjjn.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzYWFjYW5meHBxZmhyZ212ampuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTM2NTksImV4cCI6MjA2NTQ4OTY1OX0.pUEWyQVWXfEDOYT3-EOX73kMuZobsZfQhTVmMc9fKJ8";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
