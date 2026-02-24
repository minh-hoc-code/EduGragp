import React from 'react';
import { Search, Filter, MoreHorizontal, Play, FolderPlus, FileText, Image, Zap } from 'lucide-react';

const MyProjects = () => {
  const filters = ["Tất cả", "Slide thuyết trình", "Sơ đồ tư duy", "Poster", "Infographic"];
  
  // Mock data mô phỏng dự án thật
  const projects = [
    { id: 1, title: "Lịch sử 12: Kháng chiến chống Mỹ", type: "Slide", date: "2 giờ trước", thumb: "bg-gradient-to-br from-orange-100 to-amber-200" },
    { id: 2, title: "Sinh học: Di truyền học", type: "Mindmap", date: "1 ngày trước", thumb: "bg-gradient-to-br from-emerald-100 to-green-200" },
    { id: 3, title: "Poster tuyển thành viên CLB", type: "Poster", date: "3 ngày trước", thumb: "bg-gradient-to-br from-blue-100 to-indigo-200" },
    { id: 4, title: "Vật lý hạt nhân", type: "Slide", date: "1 tuần trước", thumb: "bg-gradient-to-br from-purple-100 to-fuchsia-200" },
    { id: 5, title: "Sơ đồ tư duy Văn học", type: "Mindmap", date: "2 tuần trước", thumb: "bg-gradient-to-br from-pink-100 to-rose-200" },
  ];

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-slate-800">Dự án của tôi</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Tìm dự án..." className="pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 w-64" />
          </div>
          <button className="flex items-center gap-2 bg-brand-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-200">
            <FolderPlus size={18} /> Tạo mới
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((f, i) => (
          <button key={i} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${i === 0 ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Recent & Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            {/* Thumbnail Area */}
            <div className={`h-48 ${item.thumb} relative flex items-center justify-center`}>
              {/* Icon đại diện (nếu không có ảnh thật) */}
              <div className="opacity-50 text-slate-700 mix-blend-multiply transform group-hover:scale-110 transition-transform duration-500">
                 {item.type === 'Slide' ? <FileText size={64} /> : item.type === 'Mindmap' ? <Zap size={64}/> : <Image size={64}/>}
              </div>
              
              {/* Hover Actions Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                <button className="p-3 bg-brand-primary text-white rounded-full hover:scale-110 transition shadow-lg" title="Mở ngay">
                  <Play size={20} fill="currentColor" />
                </button>
                <button className="p-3 bg-white text-slate-700 rounded-full hover:scale-110 transition shadow-lg" title="Tùy chọn">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* Info Area */}
            <div className="p-4">
              <h3 className="font-bold text-slate-800 truncate mb-1 group-hover:text-brand-primary transition-colors">{item.title}</h3>
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{item.type}</span>
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;