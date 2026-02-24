import React, { useState } from 'react';
import { 
  User, Shield, CreditCard, Globe, Camera, Sparkles, 
  CheckCircle, Facebook, Mail, AlertTriangle, Crown, 
  ChevronRight, Laptop, LogOut 
} from 'lucide-react';
import Button from '../Button'; // Đảm bảo đường dẫn đúng tới component Button chung

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Danh sách menu bên trái
  const menuItems = [
    { id: 'profile', label: 'Hồ sơ của tôi', icon: <User size={20} /> },
    { id: 'security', label: 'Tài khoản & Bảo mật', icon: <Shield size={20} /> },
    { id: 'billing', label: 'Gói cước & Thanh toán', icon: <CreditCard size={20} /> },
    { id: 'language', label: 'Ngôn ngữ', icon: <Globe size={20} /> },
  ];

  // Hàm render nội dung bên phải
  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileSettings />;
      case 'security': return <SecuritySettings />;
      case 'billing': return <BillingSettings />;
      case 'language': return <LanguageSettings />;
      default: return <ProfileSettings />;
    }
  };

  return (
    <div className="p-4 md:p-8 animate-fadeIn h-full bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">Cài đặt</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* --- LEFT SIDEBAR (MENU) --- */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm mb-1 ${
                    activeTab === item.id 
                      ? 'bg-orange-50 text-brand-primary shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT CONTENT --- */}
          <div className="md:col-span-9 space-y-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- 1. TAB HỒ SƠ (Profile) --- */
const ProfileSettings = () => {
  const interests = ["Toán học", "Ngữ Văn", "Tiếng Anh", "Lịch sử", "Thiết kế", "Lập trình", "Vật lý"];

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-primary to-orange-400 p-1">
             <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
             </div>
          </div>
          <button className="absolute bottom-0 right-0 bg-white border border-slate-200 p-2 rounded-full shadow-md hover:text-brand-primary transition-colors">
            <Camera size={16} />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Ảnh đại diện</h3>
          <p className="text-slate-500 text-sm mb-3">Nên dùng ảnh vuông, tối thiểu 400x400px.</p>
          <button className="flex items-center gap-2 text-sm font-semibold text-brand-primary bg-orange-50 px-4 py-2 rounded-lg hover:bg-orange-100 transition">
            <Sparkles size={16} /> Tạo Avatar bằng AI
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Thông tin cơ bản</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tên hiển thị</label>
            <input type="text" defaultValue="Học sinh N." className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Trường / Lớp</label>
             <select className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 bg-white">
               <option>Lớp 10</option>
               <option>Lớp 11</option>
               <option>Lớp 12</option>
               <option>Đại học / Cao đẳng</option>
             </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Bio / Châm ngôn</label>
          <input type="text" defaultValue="Road to IELTS 8.0 🚀" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
        </div>

        <div>
           <label className="block text-sm font-medium text-slate-700 mb-2">Chủ đề yêu thích</label>
           <div className="flex flex-wrap gap-2">
             {interests.map((tag, i) => (
               <label key={i} className="cursor-pointer">
                 <input type="checkbox" className="hidden peer" defaultChecked={i < 3} />
                 <span className="px-3 py-1 rounded-full text-sm border border-slate-200 text-slate-600 peer-checked:bg-brand-primary peer-checked:text-white peer-checked:border-brand-primary transition-all select-none hover:bg-slate-50">
                   {tag}
                 </span>
               </label>
             ))}
           </div>
        </div>

        <div className="pt-4 flex justify-end">
           <Button>Lưu thay đổi</Button>
        </div>
      </div>
    </div>
  );
};

/* --- 2. TAB BẢO MẬT (Security) --- */
const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      {/* Email Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <h3 className="text-lg font-bold text-slate-800 mb-4">Email đăng nhập</h3>
         <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <Mail className="text-slate-400" size={20} />
              <span className="text-slate-600 font-medium">test_user@gmail.com</span>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded">
               <CheckCircle size={14} /> Đã xác thực
            </div>
         </div>
      </div>

      {/* Linked Accounts */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Liên kết tài khoản</h3>
        <div className="space-y-3">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center"><Facebook size={16}/></div>
                 <span className="font-medium text-slate-700">Facebook</span>
              </div>
              <button className="text-sm font-semibold text-slate-500 hover:text-slate-700">Kết nối</button>
           </div>
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">G</div>
                 <span className="font-medium text-slate-700">Google</span>
              </div>
              <span className="text-sm font-semibold text-green-600">Đã kết nối</span>
           </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <h3 className="text-lg font-bold text-slate-800 mb-4">Đổi mật khẩu</h3>
         <div className="grid gap-4 max-w-md">
            <input type="password" placeholder="Mật khẩu hiện tại" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
            <input type="password" placeholder="Mật khẩu mới" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
            <input type="password" placeholder="Nhập lại mật khẩu mới" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/50" />
            <Button variant="outline" className="w-fit">Cập nhật mật khẩu</Button>
         </div>
      </div>

      {/* Danger Zone */}
      <div className="border border-red-200 bg-red-50 rounded-2xl p-6">
         <h3 className="text-lg font-bold text-red-700 mb-2 flex items-center gap-2">
            <AlertTriangle size={20}/> Khu vực nguy hiểm
         </h3>
         <p className="text-red-600/80 text-sm mb-4">Hành động này không thể hoàn tác. Toàn bộ dữ liệu bài học của bạn sẽ bị xóa vĩnh viễn.</p>
         <button className="px-4 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-100 transition shadow-sm">
            Xóa tài khoản
         </button>
      </div>
    </div>
  );
};

/* --- 3. TAB GÓI CƯỚC (Billing) --- */
const BillingSettings = () => {
  return (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10">
            <Crown size={120} />
         </div>
         <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
               <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold border border-white/20">CURRENT PLAN</span>
            </div>
            <h2 className="text-3xl font-bold mb-1">EduGraph <span className="text-brand-primary">Free</span></h2>
            <p className="text-slate-400 text-sm mb-6">Gói cơ bản cho học sinh trải nghiệm.</p>

            {/* Progress Bars */}
            <div className="space-y-4 max-w-lg mb-6">
               <div>
                  <div className="flex justify-between text-xs mb-1">
                     <span className="text-slate-300">Dung lượng lưu trữ</span>
                     <span className="font-bold">400MB / 1GB</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 w-[40%]" style={{ width: '40%' }}></div>
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-xs mb-1">
                     <span className="text-slate-300">AI Credits (Hôm nay)</span>
                     <span className="font-bold">8 / 10 lần</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                     <div className="h-full bg-brand-primary w-[80%]" style={{ width: '80%' }}></div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Upsell / Upgrade */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-200">
               <Crown size={32} />
            </div>
            <div>
               <h3 className="text-xl font-bold text-slate-800">Nâng cấp lên EduGraph PRO</h3>
               <p className="text-slate-600 text-sm">Mở khóa sức mạnh không giới hạn cho việc học tập.</p>
            </div>
         </div>
         <button className="bg-gradient-to-r from-brand-primary to-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all transform shadow-orange-200 whitespace-nowrap">
            Nâng cấp ngay
         </button>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
         <h3 className="font-bold text-slate-800 mb-4">Quyền lợi gói Pro</h3>
         <ul className="space-y-3">
            {[
               "Tạo Slide & Mindmap không giới hạn",
               "Truy cập kho mẫu Premium độc quyền",
               "Xuất file chất lượng cao 4K không watermark",
               "AI hỗ trợ viết văn & giải bài tập nâng cao",
               "Ưu tiên hỗ trợ 24/7"
            ].map((item, i) => (
               <li key={i} className="flex items-center gap-3 text-slate-600">
                  <div className="bg-green-100 text-green-600 rounded-full p-1"><CheckCircle size={14}/></div>
                  {item}
               </li>
            ))}
         </ul>
      </div>
    </div>
  );
};

/* --- 4. TAB NGÔN NGỮ (Languages) --- */
const LanguageSettings = () => {
   return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
         <h3 className="text-lg font-bold text-slate-800 mb-4">Ngôn ngữ hiển thị</h3>
         <div className="space-y-4 max-w-md">
            <label className="flex items-center justify-between p-4 border border-brand-primary bg-orange-50 rounded-xl cursor-pointer">
               <div className="flex items-center gap-3">
                  <span className="text-2xl">🇻🇳</span>
                  <span className="font-bold text-slate-800">Tiếng Việt</span>
               </div>
               <div className="w-5 h-5 rounded-full border-2 border-brand-primary flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-brand-primary rounded-full"></div>
               </div>
            </label>

            <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
               <div className="flex items-center gap-3">
                  <span className="text-2xl">🇺🇸</span>
                  <span className="font-medium text-slate-600">English (US)</span>
               </div>
               <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
            </label>
         </div>
      </div>
   );
};

export default Settings;