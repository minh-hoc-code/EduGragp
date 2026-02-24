import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Presentation, Zap, Image as ImageIcon, Layout, Link, Upload, Type, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import * as mammoth from 'mammoth'; // IMPORT THƯ VIỆN ĐỌC FILE WORD

const CreateDesign = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const designConfig = {
    slide: {
      label: "Thuyết trình",
      sizes: [
        { id: '16:9', label: 'Mặc định (16:9)', width: 1920, height: 1080, desc: 'Chuẩn màn hình' },
        { id: '4:3', label: 'Cổ điển (4:3)', width: 1024, height: 768, desc: 'Máy chiếu cũ' }
      ]
    },
    mindmap: {
      label: "Sơ đồ tư duy",
      sizes: [
        { id: 'infinite', label: 'Bảng trắng vô cực', width: '100%', height: '100%', desc: 'Tự do mở rộng' }
      ]
    },
    poster: {
      label: "Poster",
      sizes: [
        { id: 'a4', label: 'Khổ A4 (Dọc)', width: 595, height: 842, desc: 'In ấn' },
        { id: 'instagram', label: 'Vuông (Instagram)', width: 1080, height: 1080, desc: 'Mạng xã hội' },
        { id: 'story', label: 'Dọc (Story/Tiktok)', width: 1080, height: 1920, desc: 'Điện thoại' }
      ]
    },
    infographic: {
      label: "Infographic",
      sizes: [
        { id: 'long', label: 'Dọc dài', width: 800, height: 2000, desc: 'Web / Blog' },
        { id: 'standard', label: 'Tiêu chuẩn', width: 800, height: 1200, desc: 'Báo cáo' }
      ]
    }
  };

  const initialType = location.state?.initialTab;
  const validTypes = Object.keys(designConfig);
  const defaultType = validTypes.includes(initialType) ? initialType : 'slide';

  const [selectedType, setSelectedType] = useState(defaultType);
  const [selectedSizeObj, setSelectedSizeObj] = useState(designConfig[defaultType].sizes[0]);
  const [topic, setTopic] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 

  // --- THÊM REF ĐỂ QUẢN LÝ INPUT FILE ẨN ---
  const fileInputRef = useRef(null);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSelectedSizeObj(designConfig[type].sizes[0]);
  };

  // --- HÀM XỬ LÝ KHI NGƯỜI DÙNG CHỌN FILE ---
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Lấy đuôi mở rộng của file (txt, docx)
    const fileExtension = file.name.split('.').pop().toLowerCase();

    try {
      if (fileExtension === 'txt') {
        // Xử lý file .txt bằng công cụ có sẵn của trình duyệt
        const reader = new FileReader();
        reader.onload = (e) => {
          setTopic(e.target.result); // Đẩy nội dung vào ô text
        };
        reader.readAsText(file);
      } 
      else if (fileExtension === 'docx') {
        // Xử lý file .docx bằng thư viện mammoth
        const reader = new FileReader();
        reader.onload = async (e) => {
          const arrayBuffer = e.target.result;
          const result = await mammoth.extractRawText({ arrayBuffer });
          setTopic(result.value); // Đẩy nội dung vào ô text
        };
        reader.readAsArrayBuffer(file);
      } 
      else {
        alert("Hiện tại hệ thống chỉ hỗ trợ tải lên file văn bản (.txt) hoặc Word (.docx)");
      }
    } catch (error) {
      console.error("Lỗi khi đọc file:", error);
      alert("Có lỗi xảy ra khi đọc file của bạn.");
    } finally {
      // Xóa giá trị của input để lần sau có thể chọn lại chính file đó nếu muốn
      event.target.value = null;
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Vui lòng nhập chủ đề hoặc tải file lên!");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { topic: topic, type: selectedType }
      });

      if (error) throw error;
      
      navigate('/editor', { 
        state: { 
          type: selectedType, 
          width: selectedSizeObj.width, 
          height: selectedSizeObj.height,
          label: designConfig[selectedType].label,
          aiData: data 
        } 
      });

    } catch (error) {
      console.error("Lỗi khi gọi AI:", error);
      alert("Đã có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col font-sans animate-fadeIn">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition">
          <ArrowLeft size={20} /> Quay lại
        </button>
        <div className="font-bold text-xl text-slate-700">Tạo thiết kế mới</div>
        <div className="w-20"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        
        {/* 1. Chọn loại thiết kế */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
           <TypeButton icon={<Presentation/>} label="Thuyết trình" active={selectedType === 'slide'} onClick={() => handleTypeChange('slide')} />
           <TypeButton icon={<Zap/>} label="Sơ đồ tư duy" active={selectedType === 'mindmap'} onClick={() => handleTypeChange('mindmap')} />
           <TypeButton icon={<ImageIcon/>} label="Poster" active={selectedType === 'poster'} onClick={() => handleTypeChange('poster')} />
           <TypeButton icon={<Layout/>} label="Infographic" active={selectedType === 'infographic'} onClick={() => handleTypeChange('infographic')} />
        </div>

        {/* 2. Khu vực nhập liệu */}
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-8">
           <div className="p-1 bg-slate-50 border-b border-slate-100 flex gap-2">
              <button className="px-4 py-2 bg-white rounded-t-lg text-sm font-bold text-brand-primary border-t border-x border-slate-100 flex items-center gap-2"><Type size={14}/> Văn bản</button>
              
              {/* --- NÚT TẢI FILE LÊN ĐÃ ĐƯỢC GẮN SỰ KIỆN ONCLICK --- */}
              <button 
                onClick={() => fileInputRef.current.click()} 
                className="px-4 py-2 text-slate-500 text-sm font-medium hover:text-slate-700 hover:bg-slate-200/50 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Upload size={14}/> Tải file lên
              </button>

              {/* --- INPUT ẨN ĐỂ CHỌN FILE --- */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept=".txt,.docx" 
                className="hidden" 
              />

              <button className="px-4 py-2 text-slate-500 text-sm font-medium hover:text-slate-700 hover:bg-slate-200/50 rounded-lg flex items-center gap-1 transition-colors"><Link size={14}/> Dán link</button>
           </div>
           
           <textarea 
             value={topic}
             onChange={(e) => setTopic(e.target.value)}
             className="w-full h-40 p-6 focus:outline-none text-lg text-slate-700 resize-none"
             placeholder={`Mô tả ý tưởng cho ${designConfig[selectedType].label}... \nVí dụ: Tổng hợp kiến thức Lịch sử lớp 12.`}
           ></textarea>

           {/* 3. Tùy chọn kích thước */}
           <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                 <span className="text-sm font-semibold text-slate-500 whitespace-nowrap">Kích thước:</span>
                 <select 
                    className="px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-brand-primary bg-white w-full sm:w-auto"
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const sizeObj = designConfig[selectedType].sizes.find(s => s.id === selectedId);
                      setSelectedSizeObj(sizeObj);
                    }}
                    value={selectedSizeObj.id} 
                 >
                    {designConfig[selectedType].sizes.map((opt) => (
                       <option key={opt.id} value={opt.id}>{opt.label} ({opt.desc})</option>
                    ))}
                 </select>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isLoading}
                className={`w-full sm:w-auto text-white px-8 py-3 rounded-xl font-bold transition shadow-lg flex items-center justify-center gap-2 
                  ${isLoading ? 'bg-orange-400 cursor-not-allowed shadow-none' : 'bg-brand-primary hover:bg-orange-600 shadow-orange-200'}`}
              >
                {isLoading ? (
                  <><Loader2 size={18} className="animate-spin" /> Đang thiết kế...</>
                ) : (
                  <><Zap size={18} fill="currentColor" /> Tạo ngay</>
                )}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const TypeButton = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-xl transition-all duration-200 font-medium ${active ? 'bg-orange-50 text-brand-primary ring-2 ring-brand-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
  >
    {icon} {label}
  </button>
);

export default CreateDesign;