import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Layout, User, Mail, Lock, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient.js'; // Import kết nối Supabase

const Register = () => {
  const navigate = useNavigate();
  
  // 1. Tạo các state để lưu trữ dữ liệu người dùng nhập
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. Tạo state để hiển thị trạng thái đang tải và lỗi
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3. Hàm xử lý khi người dùng bấm nút Đăng ký
  const handleRegister = async (e) => {
    e.preventDefault(); // Ngăn trình duyệt tự động reload trang
    setLoading(true);
    setError(null);

    // Gửi dữ liệu lên Supabase
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName, // Lưu thêm Họ và Tên vào database
        }
      }
    });

    if (error) {
      setError(error.message); // Hiển thị lỗi (vd: email đã tồn tại, pass quá ngắn)
      setLoading(false);
    } else {
      alert('Đăng ký thành công! Đang chuyển hướng đến đăng nhập...');
      navigate('/login'); // Chuyển sang trang Login
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
        
        {/* Logo & Header */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-tr from-brand-primary to-orange-400 rounded-xl flex items-center justify-center text-white">
            <Layout size={24} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Tạo tài khoản mới</h2>
        <p className="text-center text-slate-500 mb-6">Tham gia cộng đồng EduGraph ngay hôm nay</p>

        {/* Hiển thị thông báo lỗi nếu có */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-500 p-3 rounded-xl text-sm mb-6 text-center font-medium">
            {error}
          </div>
        )}

        {/* Form Đăng ký - Đã gắn sự kiện onSubmit */}
        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Ô nhập Họ và Tên */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Họ và Tên</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </div>
              <input 
                type="text" 
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" 
                placeholder="Nguyễn Văn A" 
              />
            </div>
          </div>

          {/* Ô nhập Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" 
                placeholder="name@example.com" 
              />
            </div>
          </div>

          {/* Ô nhập Mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary" 
                placeholder="•••••••• (Ít nhất 6 ký tự)" 
              />
            </div>
          </div>

          {/* Nút đăng ký */}
          {/* Dùng thẻ button chuẩn thay cho Component Button nếu component của bạn không nhận prop `type` hoặc `disabled` */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-brand-primary to-orange-500 hover:to-orange-600 text-white font-bold py-2.5 rounded-lg flex justify-center items-center transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-orange-200"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Đăng ký miễn phí'}
          </button>
        </form>

        {/* Chuyển qua trang Login */}
        <p className="text-center mt-6 text-sm text-slate-500">
          Đã có tài khoản? <Link to="/login" className="text-brand-primary font-bold hover:underline">Đăng nhập ngay</Link>
        </p>
        
        <div className="mt-4 text-center">
             <Link to="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">← Quay lại trang chủ</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;