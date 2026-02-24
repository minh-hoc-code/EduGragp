import { createClient } from '@supabase/supabase-js';

// Lấy biến môi trường từ file .env.local mà bạn vừa nhập lúc nãy
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Khởi tạo "cây cầu" kết nối
export const supabase = createClient(supabaseUrl, supabaseAnonKey);