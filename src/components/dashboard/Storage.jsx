import React, { useState } from 'react';
import { 
  Folder, FileText, Image, MoreVertical, Search, 
  Download, Trash2, HardDrive, Plus, ChevronRight 
} from 'lucide-react';

const Storage = () => {
  const [currentPath, setCurrentPath] = useState(['Kho lưu trữ']); // Breadcrumb state

  // Mock Data: Danh sách thư mục
  const folders = [
    { id: 1, name: "Tài liệu Lịch sử 12", count: "12 tệp", color: "text-yellow-500 fill-yellow-500" },
    { id: 2, name: "Hình ảnh Sinh học", count: "8 tệp", color: "text-blue-500 fill-blue-500" },
    { id: 3, name: "Đề cương ôn tập", count: "5 tệp", color: "text-green-500 fill-green-500" },
    { id: 4, name: "Slide mẫu nhóm 1", count: "3 tệp", color: "text-purple-500 fill-purple-500" },
  ];

  // Mock Data: Danh sách tệp tin
  const files = [
    { id: 1, name: "De_cuong_su.pdf", type: "PDF", size: "2.4 MB", date: "Hôm qua", icon: <FileText className="text-red-500"/> },
    { id: 2, name: "Anh_minh_hoa_ADN.png", type: "IMG", size: "4.1 MB", date: "2 ngày trước", icon: <Image className="text-purple-500"/> },
    { id: 3, name: "Bai_thuyet_trinh_nhom.pptx", type: "PPT", size: "15 MB", date: "1 tuần trước", icon: <FileText className="text-orange-500"/> },
    { id: 4, name: "Note_tong_ket.docx", type: "DOC", size: "500 KB", date: "2 tuần trước", icon: <FileText className="text-blue-500"/> },
  ];

  return (
    <div className="p-6 h-full flex flex-col animate-fadeIn bg-slate-50">
      
      {/* 1. HEADER & ACTION BAR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <HardDrive size={24} className="text-brand-primary" /> Kho lưu trữ
          </h2>
          {/* Breadcrumb (Đường dẫn) */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
             {currentPath.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                   <span className="hover:text-brand-primary cursor-pointer">{crumb}</span>
                   {index < currentPath.length - 1 && <ChevronRight size={14}/>}
                </div>
             ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
           {/* Search trong Storage */}
           <div className="relative flex-1 md:w-64">
              <input type="text" placeholder="Tìm tệp..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-primary text-sm bg-white" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
           </div>
           {/* Nút Upload */}
           <button className="flex items-center gap-2 bg-brand-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition shadow-md shadow-orange-200 whitespace-nowrap">
              <Plus size={18}/> <span className="hidden sm:inline">Tải lên</span>
           </button>
        </div>
      </div>

      {/* 2. FOLDERS SECTION */}
      <div className="mb-8">
         <h3 className="text-sm font-bold text-slate-600 mb-4 uppercase tracking-wider">Thư mục</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {folders.map((folder) => (
               <div key={folder.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-brand-primary hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                     <Folder size={40} className={`${folder.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                     <button className="text-slate-300 hover:text-slate-600"><MoreVertical size={16}/></button>
                  </div>
                  <h4 className="font-semibold text-slate-700 truncate">{folder.name}</h4>
                  <p className="text-xs text-slate-400">{folder.count}</p>
               </div>
            ))}
            
            {/* Nút tạo folder mới */}
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary hover:bg-orange-50 cursor-pointer transition-all">
               <Plus size={24} />
               <span className="text-xs font-semibold mt-1">Mới</span>
            </div>
         </div>
      </div>

      {/* 3. FILES SECTION (List View) */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
         <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-700">Tệp gần đây</h3>
            <button className="text-xs font-medium text-brand-primary hover:underline">Xem tất cả</button>
         </div>
         
         <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left text-sm text-slate-600">
               <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                  <tr>
                     <th className="px-6 py-3">Tên tệp</th>
                     <th className="px-6 py-3 hidden sm:table-cell">Kích thước</th>
                     <th className="px-6 py-3 hidden md:table-cell">Ngày sửa</th>
                     <th className="px-6 py-3 text-right">Hành động</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {files.map((file) => (
                     <tr key={file.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                        <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                              {file.icon}
                           </div>
                           {file.name}
                        </td>
                        <td className="px-6 py-4 text-slate-500 hidden sm:table-cell">{file.size}</td>
                        <td className="px-6 py-4 text-slate-500 hidden md:table-cell">{file.date}</td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 hover:bg-slate-200 rounded-full text-slate-600" title="Tải xuống"><Download size={16}/></button>
                              <button className="p-2 hover:bg-red-50 rounded-full text-red-500" title="Xóa"><Trash2 size={16}/></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

    </div>
  );
};

export default Storage;