import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient.js';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State để xử lý hiệu ứng tải và thông báo lỗi
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- HÀM XỬ LÝ ĐĂNG NHẬP BẰNG SUPABASE ---
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError(null);

    // Gọi API của Supabase để kiểm tra tài khoản
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // Nếu sai email hoặc mật khẩu, báo lỗi ra màn hình
      setError('Email hoặc mật khẩu không chính xác!');
      setLoading(false);
    } else {
      // Nếu đúng, chuyển hướng ngay vào Dashboard
      navigate('/dashboard'); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center text-white">
            <Layout size={24} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Chào mừng trở lại</h2>
        <p className="text-center text-slate-500 mb-6">Đăng nhập để tiếp tục sáng tạo</p>

        {/* Khu vực hiển thị thông báo lỗi */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-500 p-3 rounded-xl text-sm mb-6 text-center font-medium">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" 
              placeholder="name@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" 
              placeholder="••••••••" 
            />
          </div>
          
          {/* Nút đăng nhập đã được nâng cấp để có hiệu ứng xoay khi loading */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 bg-brand-primary hover:bg-orange-600 text-white font-bold py-2.5 rounded-lg flex justify-center items-center transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-orange-200"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Đăng nhập'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-500">
          Chưa có tài khoản? <Link to="/register" className="text-brand-primary font-bold hover:underline">Đăng ký ngay</Link>
        </p>
        <div className="mt-4 text-center">
             <Link to="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">← Quay lại trang chủ</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;