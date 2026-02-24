import React from 'react';
import Navbar from '../components/Navbar';

const Features = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <Navbar />
      <div className="container mx-auto px-6 py-10 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Tính năng nổi bật</h1>
        <p className="text-slate-500">Danh sách các tính năng AI đang được phát triển...</p>
        {/* Sau này chúng ta sẽ thêm danh sách tính năng vào đây */}
      </div>
    </div>
  );
};

export default Features;