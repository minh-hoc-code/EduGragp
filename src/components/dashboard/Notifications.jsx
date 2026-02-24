import React, { useState } from 'react';
import { Bell, MessageCircle, Clock, Check, Info, AlertCircle, Calendar } from 'lucide-react';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('priority'); // 'priority' | 'others'

  // Mock Data: Danh sách thông báo giả lập
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'deadline',
      title: 'Hạn nộp bài tập Lịch Sử sắp đến',
      message: 'Bạn còn 2 tiếng để nộp bài tiểu luận "Kháng chiến chống Mỹ".',
      time: '30 phút trước',
      isRead: false,
      category: 'priority'
    },
    {
      id: 2,
      type: 'comment',
      title: 'Minh Anh đã bình luận vào dự án của bạn',
      message: '"Sơ đồ này đẹp quá, cậu dùng font chữ gì vậy?"',
      time: '2 giờ trước',
      isRead: false,
      category: 'priority'
    },
    {
      id: 3,
      type: 'system',
      title: 'Chào mừng bạn đến với EduGraph',
      message: 'Hãy bắt đầu tạo dự án đầu tiên của bạn ngay hôm nay!',
      time: '1 ngày trước',
      isRead: true,
      category: 'others'
    },
    {
      id: 4,
      type: 'update',
      title: 'Cập nhật tính năng mới: Kho mẫu 20/11',
      message: 'Chúng tôi vừa thêm 50 mẫu thiệp và slide mới nhân ngày Nhà giáo Việt Nam.',
      time: '2 ngày trước',
      isRead: true,
      category: 'others'
    }
  ]);

  // Hàm đánh dấu tất cả là đã đọc
  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    setNotifications(updated);
  };

  // Lọc thông báo theo Tab
  const filteredNotifs = notifications.filter(n => n.category === activeTab);

  // Icon Helper: Chọn icon dựa trên loại thông báo
  const getIcon = (type) => {
    switch (type) {
      case 'deadline': return <Clock size={20} className="text-red-500" />;
      case 'comment': return <MessageCircle size={20} className="text-blue-500" />;
      case 'update': return <Info size={20} className="text-purple-500" />;
      default: return <Bell size={20} className="text-orange-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Thông báo</h2>
          <p className="text-slate-500 mt-1">Cập nhật tin tức mới nhất về học tập và hệ thống.</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="flex items-center gap-2 text-sm font-semibold text-brand-primary hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors"
        >
          <Check size={16} /> Đánh dấu đã đọc tất cả
        </button>
      </div>

      {/* Tabs Switcher */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-6 w-fit">
        <button 
          onClick={() => setActiveTab('priority')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'priority' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Ưu tiên <span className="ml-2 bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-xs">2</span>
        </button>
        <button 
          onClick={() => setActiveTab('others')}
          className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'others' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Khác
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((item) => (
            <div 
              key={item.id} 
              className={`
                flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 cursor-pointer group
                ${item.isRead ? 'bg-white border-slate-100' : 'bg-orange-50/50 border-orange-100 shadow-sm'}
                hover:shadow-md hover:border-brand-primary/20
              `}
            >
              {/* Icon Box */}
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                ${item.isRead ? 'bg-slate-100' : 'bg-white shadow-sm'}
              `}>
                {getIcon(item.type)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className={`text-base mb-1 ${item.isRead ? 'font-semibold text-slate-700' : 'font-bold text-slate-900'}`}>
                    {item.title}
                  </h4>
                  {/* Chấm đỏ đánh dấu chưa đọc */}
                  {!item.isRead && (
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm shadow-red-200"></span>
                  )}
                </div>
                <p className={`text-sm mb-2 ${item.isRead ? 'text-slate-500' : 'text-slate-600'}`}>
                  {item.message}
                </p>
                <span className="text-xs text-slate-400 font-medium">{item.time}</span>
              </div>
            </div>
          ))
        ) : (
          /* Empty State (Khi không có thông báo nào) */
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="text-slate-300" size={32} />
             </div>
             <p className="text-slate-500 font-medium">Bạn đã xem hết tất cả thông báo rồi!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;