import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import { ArrowRight } from 'lucide-react'; // Dùng icon của Lucide cho đồng bộ

const Navbar = () => {
  const navItems = [
    { path: '/', label: 'Trang chủ' },
    { path: '/features', label: 'Tính năng' },
    { path: '/templates', label: 'Kho Mẫu' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 md:px-12 py-4 bg-white/90 backdrop-blur-md z-50 border-b border-slate-100/50 transition-all duration-300">
      
      {/* --- LOGO (Giữ nguyên thiết kế của bạn) --- */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer select-none group decoration-transparent">
        {/* Phần "Edu" - Khối màu vàng cam bo góc */}
        <div className="bg-brand-orange text-white font-extrabold px-3 py-1 rounded-lg transform -skew-x-6 text-xl shadow-md group-hover:scale-105 transition-transform font-sans">
          Edu
        </div>
        {/* Phần "GRAPH" - Font viết tay màu hồng san hô */}
        <div className="text-brand-coral font-handwriting font-bold text-3xl tracking-wide group-hover:rotate-2 transition-transform">
          GRAPH
        </div>
      </Link>

      {/* --- MIDDLE MENU (Menu dạng viên thuốc) --- */}
      <div className="hidden md:flex gap-1 p-1 bg-slate-100/50 rounded-full border border-slate-200/50">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-brand-primary text-white shadow-md shadow-orange-200 transform scale-105'
                  : 'text-slate-600 hover:bg-white hover:text-brand-primary hover:shadow-sm'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="flex items-center gap-3">
        {/* Nút Đăng nhập -> Trỏ về /login */}
        <Link 
          to="/login" 
          className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-brand-primary transition-colors hidden sm:block"
        >
          Đăng nhập
        </Link>
        
        {/* Nút Dùng thử -> Trỏ về /register */}
        <Link to="/register">
            <Button variant="primary" className="px-5 py-2 text-sm flex items-center gap-2">
            Dùng thử <ArrowRight size={16} />
            </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;