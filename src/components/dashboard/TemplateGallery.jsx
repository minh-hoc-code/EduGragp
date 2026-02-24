import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const TemplateGallery = () => {
  const categories = ["Phổ biến", "Thuyết trình", "Sơ đồ tư duy", "Video", "Mạng xã hội", "In ấn"];
  
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-b-[3rem] md:rounded-[3rem] mx-0 md:mx-8 mt-4 overflow-hidden flex items-center px-10 text-white shadow-2xl shadow-indigo-200">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold mb-4 border border-white/30">✨ Mới cập nhật</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Thiết kế bài giảng <br/>chưa bao giờ dễ thế</h1>
          <p className="text-indigo-100 mb-8 text-lg">Khám phá hàng ngàn mẫu slide, poster và sơ đồ tư duy được thiết kế riêng cho giáo dục.</p>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-indigo-50 transition shadow-lg flex items-center gap-2">
            Khám phá ngay <ArrowRight size={18}/>
          </button>
        </div>
        {/* Decorative Circles */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
      </div>

      <div className="px-8">
        {/* Category Tabs */}
        <div className="flex gap-4 border-b border-slate-200 pb-4 mb-8 overflow-x-auto">
          {categories.map((cat, i) => (
            <button key={i} className={`text-sm font-semibold whitespace-nowrap px-2 pb-2 relative transition-colors ${i === 0 ? 'text-brand-primary' : 'text-slate-500 hover:text-slate-800'}`}>
              {cat}
              {i === 0 && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary rounded-t-full"></span>}
            </button>
          ))}
        </div>

        {/* Sections */}
        <Section title="Xu hướng tuần này" />
        <Section title="Dành cho môn Toán & Khoa học" color="bg-emerald-100" />
        <Section title="Phong cách tối giản (Minimalism)" color="bg-slate-100" />
      </div>
    </div>
  );
};

// Component con hiển thị từng hàng template
const Section = ({ title, color = "bg-orange-100" }) => (
  <div className="mb-12">
    <div className="flex justify-between items-end mb-4">
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      <a href="#" className="text-sm font-semibold text-brand-primary hover:underline">Xem tất cả</a>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="group cursor-pointer">
          <div className={`aspect-[3/4] rounded-xl ${color} relative overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-all`}>
             {/* Giả lập Slideshow Preview khi hover */}
             <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold opacity-30 group-hover:opacity-0 transition-opacity">
               Mẫu {i}
             </div>
             <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <span className="text-xs font-bold bg-white px-2 py-1 rounded shadow text-slate-700 animate-bounce">Previewing...</span>
             </div>
          </div>
          <p className="text-sm font-medium text-slate-700 truncate group-hover:text-brand-primary">Tên mẫu thiết kế {i}</p>
        </div>
      ))}
    </div>
  </div>
);

export default TemplateGallery;