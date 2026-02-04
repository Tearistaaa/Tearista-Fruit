import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nmgxcwccfdslbfhmcfqe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tZ3hjd2NjZmRzbGJmaG1jZnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMDg4MTEsImV4cCI6MjA4NTY4NDgxMX0.YMDuwl9OSjQYBN5BmHiUDsydbrdNL6dA2mpHM4nuOxc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);