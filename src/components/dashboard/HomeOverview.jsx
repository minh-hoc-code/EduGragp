import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Presentation, Zap, FileText, Image as ImageIcon, BookOpen, Plus } from 'lucide-react';
import { supabase } from '../../supabaseClient';

// Nhận prop onSwitchTab từ Dashboard để xử lý nút Kho lưu trữ
const HomeOverview = ({ onSwitchTab }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('bạn'); 

  // HÀM LẤY THÔNG TIN NGƯỜI DÙNG TỪ SUPABASE
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Lấy full_name từ metadata (dữ liệu bạn nhập lúc đăng ký)
        // Nếu không có tên, sẽ lấy tạm phần đầu của email
        const name = user.user_metadata?.full_name || user.email.split('@')[0];
        setUserName(name);
      }
    };

    fetchUser();
  }, []);
  // Hàm chuyển hướng sang trang Tạo mới (kèm theo loại muốn tạo)
  const handleNavigateToCreate = (type) => {
    navigate('/create', { state: { initialTab: type } });
  };

  const suggestions = ["Toán học 12", "Lịch sử Việt Nam", "Ngữ Văn", "Tiếng Anh IELTS", "Sinh học", "Vật lý"];

  const recentDesigns = [
    { id: 1, title: "Lịch sử 12: Kháng chiến chống Mỹ", type: "Slide", date: "2 giờ trước", color: "bg-orange-100", icon: <Presentation size={40} className="text-orange-500 opacity-50"/> },
    { id: 2, title: "Sinh học: Di truyền học", type: "Mindmap", date: "1 ngày trước", color: "bg-green-100", icon: <Zap size={40} className="text-green-500 opacity-50"/> },
    { id: 3, title: "Tóm tắt Văn học", type: "Docs", date: "3 ngày trước", color: "bg-blue-100", icon: <FileText size={40} className="text-blue-500 opacity-50"/> },
    { id: 4, title: "Poster CLB", type: "Poster", date: "1 tuần trước", color: "bg-purple-100", icon: <ImageIcon size={40} className="text-purple-500 opacity-50"/> },
  ];

  return (
    <div className="flex-1 animate-fadeIn pb-10">
      {/* --- 1. HERO SECTION (Banner Cam) --- */}
      <div className="relative bg-gradient-to-r from-brand-primary to-orange-400 pt-12 pb-24 px-8 md:px-12 text-center text-white overflow-hidden rounded-bl-[3rem]">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">
          Hôm nay bạn muốn học gì, <span className="text-yellow-200">{userName}</span>? 👋
        </h1>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-slate-400 group-focus-within:text-brand-primary transition-colors" size={20} />
            </div>
            <input 
              type="text" 
              className="w-full pl-12 pr-32 py-4 rounded-full text-slate-700 focus:outline-none focus:ring-4 focus:ring-orange-200 shadow-xl transition-all"
              placeholder="Tìm kiếm bài học, mẫu slide, hoặc chủ đề..."
            />
            <button className="absolute right-2 top-2 bg-brand-primary hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
              Tìm kiếm
            </button>
          </div>
          
          {/* Chips gợi ý */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-sm">
            <span className="text-white/80 mr-2">Gợi ý:</span>
            {suggestions.map((item, index) => (
              <button key={index} className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-sm transition-colors text-white text-xs">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- 2. QUICK ACTIONS (Thao tác nhanh) --- */}
      <div className="px-8 md:px-12 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 grid grid-cols-2 md:grid-cols-5 gap-4">
           
           {/* Nút 1: Tạo Slide -> Chuyển sang trang Create tab Slide */}
           <QuickActionItem 
              icon={<Presentation size={24} />} 
              color="bg-blue-500" 
              label="Tạo Slide" 
              onClick={() => handleNavigateToCreate('slide')}
           />

           {/* Nút 2: Sơ đồ tư duy -> Chuyển sang trang Create tab Mindmap */}
           <QuickActionItem 
              icon={<Zap size={24} />} 
              color="bg-yellow-500" 
              label="Sơ đồ tư duy" 
              onClick={() => handleNavigateToCreate('mindmap')}
           />

           {/* Nút 3: Kho lưu trữ -> Chuyển Tab Dashboard sang Storage */}
           <QuickActionItem 
              icon={<FileText size={24} />} 
              color="bg-green-500" 
              label="Kho lưu trữ" 
              onClick={() => onSwitchTab && onSwitchTab('storage')} 
           />

           {/* Nút 4: Tạo Poster -> Chuyển sang trang Create tab Poster */}
           <QuickActionItem 
              icon={<ImageIcon size={24} />} 
              color="bg-purple-500" 
              label="Tạo Poster" 
              onClick={() => handleNavigateToCreate('poster')}
           />

           {/* Nút 5: Infographic -> Chuyển sang trang Create tab Infographic */}
           <QuickActionItem 
              icon={<BookOpen size={24} />} 
              color="bg-pink-500" 
              label="Infographic" 
              onClick={() => handleNavigateToCreate('infographic')}
           />

        </div>
      </div>

      {/* --- 3. THIẾT KẾ GẦN ĐÂY --- */}
      <div className="px-8 md:px-12 mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Thiết kế gần đây</h2>
          <button className="text-brand-primary font-medium hover:underline text-sm">Xem tất cả</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentDesigns.map((item) => (
            <div key={item.id} className="group cursor-pointer bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all p-4">
              <div className={`h-32 ${item.color} rounded-xl flex items-center justify-center mb-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform`}>
                 {item.icon}
              </div>
              <h3 className="font-bold text-slate-700 truncate">{item.title}</h3>
              <div className="flex justify-between mt-2 text-xs text-slate-400">
                <span>{item.type}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
          
          {/* Nút tạo mới (Card dấu cộng) */}
          <div 
            onClick={() => navigate('/create')} 
            className="border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-brand-primary hover:text-brand-primary hover:bg-orange-50 transition-all cursor-pointer h-full min-h-[200px] sm:min-h-auto"
          >
             <div className="bg-slate-100 p-3 rounded-full mb-2 group-hover:bg-white">
               <Plus size={24} />
             </div>
             <span className="text-sm font-medium">Tạo thiết kế mới</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component con QuickActionItem (Đã thêm prop onClick)
const QuickActionItem = ({ icon, color, label, onClick }) => (
  <div 
    onClick={onClick} 
    className="flex flex-col items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer group transition-colors select-none"
  >
    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
      {icon}
    </div>
    <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 text-center">{label}</span>
  </div>
);

export default HomeOverview;