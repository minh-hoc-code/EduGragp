import React from 'react';
import { AlertTriangle, Trash2, RotateCcw, X } from 'lucide-react';
import Button from '../Button'; // Đảm bảo đường dẫn đúng

const Trash = () => {
  const deletedItems = []; // Thử đổi thành [1, 2] để xem giao diện có dữ liệu

  return (
    <div className="p-8 animate-fadeIn h-full flex flex-col">
      {/* Warning Banner */}
      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start gap-3 mb-8">
        <AlertTriangle className="text-yellow-500 mt-0.5" size={20} />
        <div>
           <h4 className="font-bold text-yellow-700 text-sm">Lưu ý quan trọng</h4>
           <p className="text-yellow-600 text-sm mt-1">Các mục trong thùng rác sẽ bị xóa vĩnh viễn sau 30 ngày. Hãy khôi phục nếu bạn xóa nhầm.</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Thùng rác</h2>
        {deletedItems.length > 0 && (
           <Button className="bg-red-50 text-red-600 hover:bg-red-100 border-none shadow-none">Dọn sạch thùng rác</Button>
        )}
      </div>

      {/* Content */}
      {deletedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {/* Item đã xóa */}
           <div className="grayscale opacity-75 hover:opacity-100 transition-all bg-white rounded-xl border border-slate-200 p-4 relative group">
              <div className="h-32 bg-slate-100 rounded-lg mb-3"></div>
              <h3 className="font-semibold text-slate-700">Dự án cũ</h3>
              <p className="text-xs text-slate-400">Xóa 2 ngày trước</p>
              
              {/* Action overlay */}
              <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity rounded-xl">
                 <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100" title="Khôi phục"><RotateCcw size={18}/></button>
                 <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100" title="Xóa vĩnh viễn"><X size={18}/></button>
              </div>
           </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="w-40 h-40 bg-slate-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <Trash2 size={64} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">Chưa có gì ở đây cả, thật gọn gàng!</h3>
            <p className="text-slate-400 max-w-md">Thùng rác trống trơn. Bạn có thể yên tâm quay lại làm việc rồi.</p>
        </div>
      )}
    </div>
  );
};

export default Trash;