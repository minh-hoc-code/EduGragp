import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Kiểm tra ngay khi vừa vào web xem có đang đăng nhập không
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Lắng nghe sự thay đổi (VD: người dùng bấm Đăng xuất)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Đang kiểm tra thì xoay xoay chờ một chút
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-brand-primary" size={40} />
      </div>
    );
  }

  // Nếu không có phiên đăng nhập, bắt buộc quay đầu về trang Login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Nếu hợp lệ, cho phép render các trang bên trong (Dashboard, Editor...)
  return children;
};

export default ProtectedRoute;