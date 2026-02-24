import React, { useState } from 'react';
import { 
  Layout, Home, FileText, Settings as SettingsIcon, Trash2, Bell, Users, 
  ChevronLeft, ChevronRight, Share2, HardDrive // <--- 1. Nhớ import icon HardDrive
} from 'lucide-react';

// Import các Component con
import HomeOverview from '../components/dashboard/HomeOverview';
import MyProjects from '../components/dashboard/MyProjects';
import TemplateGallery from '../components/dashboard/TemplateGallery';
import Community from '../components/dashboard/Community';
import Trash from '../components/dashboard/Trash';
import Notifications from '../components/dashboard/Notifications';
import Settings from '../components/dashboard/Settings';
import Storage from '../components/dashboard/Storage'; // <--- 2. Import trang Storage
import logoIcon from '../assets/logo EduGraph.png'; // Đảm bảo tên file ảnh đúng

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  // Hàm render nội dung chính
  const renderContent = () => {
    switch (activeTab) {
      case 'home': 
        // 3. QUAN TRỌNG: Truyền hàm setActiveTab xuống để HomeOverview có thể chuyển tab
        return <HomeOverview onSwitchTab={setActiveTab} />;
      case 'projects': return <MyProjects />;
      case 'templates': return <TemplateGallery />;
      case 'storage': return <Storage />; // 4. Thêm case Storage
      case 'community': return <Community />;
      case 'trash': return <Trash />;
      case 'notifications': return <Notifications />;
      case 'settings': return <Settings />;
      default: return <HomeOverview onSwitchTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-600">
      
      {/* ================= SIDEBAR ================= */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 fixed h-full z-20 shadow-sm`}
      >
        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-9 bg-white border border-slate-200 rounded-full p-1 shadow-sm hover:text-brand-primary transition-colors z-30 text-slate-500"
        >
          {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center border-b border-slate-50 overflow-hidden transition-all">
           {isSidebarOpen ? (
             <div className="flex items-center gap-2 cursor-pointer select-none">
                {/* Logo dạng chữ khi mở rộng */}
                <div className="bg-gradient-to-tr from-brand-primary to-orange-400 text-white font-extrabold px-3 py-1 rounded-xl text-xl shadow-sm font-sans">Edu</div>
                <div className="text-brand-coral font-handwriting font-bold text-2xl tracking-wide">GRAPH</div>
             </div>
           ) : (
             /* Logo dạng ảnh khi thu nhỏ */
             <img 
               src={logoIcon} 
               alt="EduGraph" 
               className="w-10 h-10 object-contain hover:scale-110 transition-transform" 
             />
           )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-6 space-y-1 px-3">
          <SidebarItem icon={<Home size={20} />} label="Trang chủ" active={activeTab === 'home'} onClick={() => setActiveTab('home')} isOpen={isSidebarOpen} />
          <SidebarItem icon={<Layout size={20} />} label="Dự án của tôi" active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} isOpen={isSidebarOpen} />
          
          {/* Thêm mục Kho lưu trữ vào Sidebar */}
          <SidebarItem icon={<HardDrive size={20} />} label="Kho lưu trữ" active={activeTab === 'storage'} onClick={() => setActiveTab('storage')} isOpen={isSidebarOpen} />
          
          <SidebarItem icon={<FileText size={20} />} label="Kho Mẫu" active={activeTab === 'templates'} onClick={() => setActiveTab('templates')} isOpen={isSidebarOpen} />
          <SidebarItem icon={<Users size={20} />} label="Cộng đồng" active={activeTab === 'community'} onClick={() => setActiveTab('community')} isOpen={isSidebarOpen} />
          
          <div className="my-4 border-t border-slate-100 mx-2"></div>
          
          <SidebarItem icon={<Bell size={20} />} label="Thông báo" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} isOpen={isSidebarOpen} />
          <SidebarItem icon={<Trash2 size={20} />} label="Thùng rác" active={activeTab === 'trash'} onClick={() => setActiveTab('trash')} isOpen={isSidebarOpen} />
          <SidebarItem icon={<SettingsIcon size={20} />} label="Cài đặt" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} isOpen={isSidebarOpen} />
        </div>

        {/* Bottom CTA */}
        <div className="p-4 border-t border-slate-100">
           {isSidebarOpen ? (
             <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center border border-orange-100">
               <p className="text-xs text-brand-orange font-bold mb-3 uppercase tracking-wider">Gói Free Plan</p>
               <button className="w-full py-2.5 bg-brand-primary text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition shadow-lg shadow-orange-200 flex items-center justify-center gap-2">
                 <Share2 size={16}/> Mời bạn bè
               </button>
             </div>
           ) : (
             <button className="w-full py-3 bg-brand-primary text-white rounded-xl flex items-center justify-center hover:bg-orange-600 transition shadow-lg shadow-orange-200">
               <Share2 size={18}/>
             </button>
           )}
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {renderContent()}
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick, isOpen }) => (
  <div 
    onClick={onClick}
    className={`
      flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 select-none
      ${active ? 'bg-orange-50 text-brand-primary font-bold shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
      ${!isOpen && 'justify-center px-0'}
    `}
  >
    <div className={`${active ? 'text-brand-primary' : 'text-slate-400 group-hover:text-slate-600'}`}>
      {icon}
    </div>
    <span className={`whitespace-nowrap transition-all duration-200 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
      {label}
    </span>
  </div>
);

export default Dashboard;