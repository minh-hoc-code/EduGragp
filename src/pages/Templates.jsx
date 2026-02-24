import React from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { Eye, Copy, Star } from 'lucide-react';

// --- 1. ĐÂY LÀ MOCK DATA (Dữ liệu giả lập) ---
// Sau này có Backend, ta sẽ xóa đoạn này đi và lấy từ API về
const SAMPLE_TEMPLATES = [
  {
    id: 1,
    title: "Lịch sử Việt Nam: Thời kỳ Đổi Mới",
    category: "Lịch sử",
    color: "bg-red-100", // Giả lập màu nền ảnh bìa
    author: "Nguyễn Văn A",
    views: 1205
  },
  {
    id: 2,
    title: "Sinh học 12: Di truyền học",
    category: "Sinh học",
    color: "bg-green-100",
    author: "Trần Thị B",
    views: 850
  },
  {
    id: 3,
    title: "Vật lý hạt nhân cơ bản",
    category: "Vật lý",
    color: "bg-blue-100",
    author: "Lê Văn C",
    views: 2100
  },
  {
    id: 4,
    title: "Văn học hiện thực phê phán",
    category: "Văn học",
    color: "bg-yellow-100",
    author: "Phạm D",
    views: 500
  },
  {
    id: 5,
    title: "Tiếng Anh: IELTS Speaking Part 2",
    category: "Ngoại ngữ",
    color: "bg-purple-100",
    author: "Ms. Hoa",
    views: 3200
  },
  {
    id: 6,
    title: "Tin học: Lập trình Python cơ bản",
    category: "Công nghệ",
    color: "bg-slate-200",
    author: "CodeDao",
    views: 1500
  },
];

const Templates = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-20">
      <Navbar />
      
      <div className="container mx-auto px-6">
        {/* Header của trang */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Kho Mẫu Slide & Sơ Đồ</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Khám phá hàng trăm mẫu thiết kế chuyên nghiệp được tạo bởi cộng đồng và đội ngũ chuyên gia.
            Giúp bạn bắt đầu bài học nhanh chóng hơn.
          </p>
        </div>

        {/* --- 2. KHU VỰC HIỂN THỊ DANH SÁCH (GRID) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_TEMPLATES.map((template) => (
            // Thẻ Card cho từng mẫu
            <div key={template.id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
              
              {/* Phần ảnh bìa (Giả lập bằng màu) */}
              <div className={`h-48 ${template.color} relative flex items-center justify-center`}>
                 <span className="text-4xl opacity-20 font-bold text-slate-600">PREVIEW</span>
                 
                 {/* Lớp phủ khi di chuột vào (Hover Overlay) */}
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="p-2 bg-white rounded-full text-slate-700 hover:text-brand-primary hover:scale-110 transition">
                      <Eye size={20} />
                    </button>
                    <button className="p-2 bg-brand-primary text-white rounded-full hover:bg-orange-600 hover:scale-110 transition">
                      <Copy size={20} />
                    </button>
                 </div>
              </div>

              {/* Phần thông tin chi tiết */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-500 rounded-md">
                    {template.category}
                  </span>
                  <div className="flex items-center text-xs text-slate-400 gap-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400"/> 4.8
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-brand-primary transition-colors">
                  {template.title}
                </h3>
                
                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-sm text-slate-500">
                  <span>Bởi: {template.author}</span>
                  <span>{template.views} lượt xem</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút xem thêm */}
        <div className="mt-12 text-center">
          <Button variant="outline">Xem thêm mẫu khác</Button>
        </div>
      </div>
    </div>
  );
};

export default Templates;