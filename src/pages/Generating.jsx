import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Thêm useLocation
import { Loader2, Sparkles } from 'lucide-react';

const Generating = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lấy dữ liệu được truyền từ CreateDesign
  const designData = location.state || { type: 'slide', width: 1920, height: 1080 }; // Fallback mặc định

  useEffect(() => {
    const timer = setTimeout(() => {
      // Chuyển sang Editor kèm theo dữ liệu kích thước
      navigate('/editor', { state: designData });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, designData]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* ... (Phần giao diện Loading giữ nguyên như cũ) ... */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-orange-100">
           <Sparkles size={48} className="text-brand-primary animate-spin-slow" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Đang tạo {designData.label || 'thiết kế'}...</h2>
      <p className="text-slate-500 mb-8 max-w-md text-center">AI đang cấu trúc nội dung và thiết lập bố cục phù hợp.</p>

      <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-brand-primary animate-progress"></div>
      </div>
    </div>
  );
};

export default Generating;