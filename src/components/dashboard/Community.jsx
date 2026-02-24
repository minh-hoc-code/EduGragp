import React from 'react';
import { Heart, Download, Share2, Search } from 'lucide-react';

const Community = () => {
  return (
    <div className="p-8 animate-fadeIn">
      {/* Search Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Cộng đồng học tập EduGraph</h2>
        <div className="relative">
          <input type="text" placeholder="Tìm kiếm bài giảng, sơ đồ tư duy..." className="w-full py-3 pl-12 pr-4 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-brand-primary/50 focus:outline-none" />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>
      </div>

      {/* Masonry Grid (Dùng CSS Columns để tạo hiệu ứng so le) */}
      <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="break-inside-avoid bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
            {/* Image (Chiều cao ngẫu nhiên) */}
            <div className={`w-full bg-slate-200 relative ${i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-video'}`}>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white/90 p-2 rounded-full shadow-sm hover:text-brand-primary"><Download size={16}/></button>
                </div>
            </div>
            
            {/* Info */}
            <div className="p-4">
              <h3 className="font-bold text-slate-800 mb-1 line-clamp-2">Tổng hợp kiến thức Lịch Sử 12 bằng sơ đồ tư duy</h3>
              
              {/* Author */}
              <div className="flex items-center gap-2 mt-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-primary to-yellow-400"></div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-700">Minh Anh</p>
                  <p className="text-slate-400">THPT Chu Văn An</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                 <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 transition-colors">
                    <Heart size={14} /> 1.2k
                 </button>
                 <button className="text-xs font-bold text-brand-primary hover:underline">
                    Sử dụng mẫu này
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;