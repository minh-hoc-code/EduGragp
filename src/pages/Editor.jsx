import { Rnd } from 'react-rnd';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, LayoutTemplate, Type, Image as ImageIcon, CloudUpload, Trash2, Type as TypeIcon, ImagePlus,
  Shapes, Bot, Play, Download, Share2, Minus, Plus, Send, Sparkles,
  Undo, Redo, ZoomIn, ZoomOut, MousePointer2, MoreHorizontal, ChevronRight, ArrowRight
} from 'lucide-react';
import CanvasStage from '../components/CanvasStage';
import pptxgen from "pptxgenjs";
const Editor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 1. NHẬN DỮ LIỆU TỪ TRANG TRƯỚC
  const { type, width, height, label, aiData } = location.state || { type: 'slide', width: 1920, height: 1080, label: 'Bản nháp' };
  const [activeTool, setActiveTool] = useState('templates');
  const [zoom, setZoom] = useState(type === 'poster' || type === 'infographic' ? 40 : 60);
 
  // --- STATE QUẢN LÝ DỮ LIỆU AI ---
  const [designData, setDesignData] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const isInfiniteCanvas = type === 'mindmap';
  // 2. CHUYỂN ĐỔI DỮ LIỆU AI KHI COMPONENT LOAD
  useEffect(() => {
    if (aiData) {
      try {
        const parsed = typeof aiData === 'string' ? JSON.parse(aiData) : aiData;
        setDesignData(parsed);
      } catch (error) {
        console.error("Lỗi khi đọc dữ liệu AI:", error);
      }
    } else {
      navigate('/create');
    }
  }, [aiData, navigate]);
  // Hàm chuyển slide
  const nextSlide = () => {
    if (designData?.slides && currentSlideIndex < designData.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };
  // Xác định tên file
  const getProjectName = () => {
    if (!designData) return `Dự án ${label} mới`;
    return designData.presentation_title || designData.mindmap_title || designData.main_title || designData.infographic_title || `Dự án ${label} mới`;
  };
 // =====================================================================
  // HÀM XUẤT FILE PPTX TỰ ĐỘNG (BẢN NÂNG CẤP CHUẨN FORMATH & FONT)
  // =====================================================================
  const exportToPPTX = async () => {
    if (!designData || type !== 'slide') {
      alert("Tính năng xuất PPTX hiện tại chỉ hỗ trợ cho định dạng Slide!");
      return;
    }
    console.log("Đang xử lý xuất PPTX...");
    let pres = new pptxgen();
    pres.layout = 'LAYOUT_16x9';
    const bgColor = palette.background_hex.replace('#', '');
    const textColor = palette.main_text_hex.replace('#', '');
    const accentColor = palette.accent_hex.replace('#', '');
   
    // ĐỊNH NGHĨA FONT CHỮ HIỆN ĐẠI DÙNG CHUNG
    const slideFont = "Segoe UI"; // Có thể đổi thành "Arial", "Helvetica", hoặc "Montserrat" nếu máy tính bạn có cài.
    const UNSPLASH_ACCESS_KEY = "bpWw0HINmVWKMmjJUUAodMQN1G4KpJ66Y-VNB0ANItY";
    for (const slideData of designData.slides) {
      let slide = pres.addSlide();
      slide.background = { color: bgColor };
      const safeContent = Array.isArray(slideData.content) ? slideData.content : (slideData.content ? [slideData.content] : []);
      // Cơ chế tải ảnh Base64
      let base64Image = null;
      if (slideData.image_search_keyword) {
        try {
          const unsplashRes = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=1&orientation=landscape&query=${encodeURIComponent(slideData.image_search_keyword)}&client_id=${UNSPLASH_ACCESS_KEY}`);
          const unsplashData = await unsplashRes.json();
          if (unsplashData.results && unsplashData.results.length > 0) {
            const imgRes = await fetch(unsplashData.results[0].urls.regular);
            const blob = await imgRes.blob();
            base64Image = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
          }
        } catch (error) { console.error(error); }
      }
      const renderImage = (x, y, w, h, isFullScreen = false) => {
        if (base64Image) {
          slide.addImage({ data: base64Image, x, y, w, h, rounding: !isFullScreen });
          if (isFullScreen) slide.addShape(pres.ShapeType.rect, { x, y, w, h, fill: { color: "000000", transparency: 50 } });
        } else {
          slide.addShape(pres.ShapeType.rect, { x, y, w, h, fill: { color: "F3F4F6" }, line: { color: accentColor, width: 2, dashType: "dash" } });
        }
      };
      // TÙY CHỈNH KÝ TỰ ICON ĐẶC BIỆT CHO BULLETS TƯƠNG TỰ <Sparkles />
      const bulletConfig = {
        character: "✦", // Ký tự ngôi sao 4 cánh (Unicode)
        color: accentColor,
        indent: 20
      };
      // VẼ BỐ CỤC (CÓ ÉP FONTFACE)
      switch(slideData.layout) {
        case 'title_slide':
        case 'central_statement':
        case 'section_transition':
          slide.addText(slideData.title, { fontFace: slideFont, x: 1, y: 2, w: 8, h: 1.5, fontSize: 54, bold: true, color: textColor, align: "center" });
          if (slideData.subtitle) slide.addText(slideData.subtitle, { fontFace: slideFont, x: 1, y: 3.5, w: 8, h: 1, fontSize: 24, italic: true, color: textColor, align: "center" });
          break;
        case 'split_1_2':
        case 'content_image_aligned':
          slide.addText(slideData.title, { fontFace: slideFont, x: 0.5, y: 0.5, w: 4.5, h: 1.5, fontSize: 40, bold: true, color: textColor, align: "left" });
          if (slideData.subtitle) slide.addText(slideData.subtitle, { fontFace: slideFont, x: 0.5, y: 2.0, w: 4.5, h: 0.5, fontSize: 20, italic: true, color: textColor, align: "left" });
          if (safeContent.length > 0) {
            const bullets = safeContent.map(text => ({ text, options: { bullet: bulletConfig } }));
            slide.addText(bullets, { fontFace: slideFont, x: 0.5, y: 2.5, w: 4.5, h: 4, fontSize: 22, color: textColor, align: "left", valign: "top" });
          }
          if (slideData.image_search_keyword) renderImage(5.5, 0.5, 4, 4.5);
          break;
        case 'grid_4_matrix':
          slide.addText(slideData.title, { fontFace: slideFont, x: 1, y: 0.3, w: 8, h: 1, fontSize: 40, bold: true, color: textColor, align: "center" });
          if (slideData.subtitle) slide.addText(slideData.subtitle, { fontFace: slideFont, x: 1, y: 1.2, w: 8, h: 0.5, fontSize: 20, italic: true, color: textColor, align: "center" });
          const boxCoords = [ {x: 1, y: 2}, {x: 5.5, y: 2}, {x: 1, y: 3.8}, {x: 5.5, y: 3.8} ];
          safeContent.slice(0, 4).forEach((text, idx) => {
            slide.addShape(pres.ShapeType.rect, { x: boxCoords[idx].x, y: boxCoords[idx].y, w: 3.5, h: 1.5, fill: { color: accentColor, transparency: 80 }, line: { color: accentColor, width: 2 } });
            slide.addText(text, { fontFace: slideFont, x: boxCoords[idx].x + 0.2, y: boxCoords[idx].y + 0.2, w: 3.1, h: 1.1, fontSize: 20, color: textColor, align: "center", valign: "middle" });
          });
          break;
        case 'full_screen_impact':
          if (slideData.image_search_keyword) {
            renderImage(0, 0, 10, 5.625, true);
          } else {
            slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: accentColor } });
          }
          slide.addText(slideData.title, { fontFace: slideFont, x: 1, y: 2, w: 8, h: 1.5, fontSize: 54, bold: true, color: "FFFFFF", align: "center" });
          if (slideData.subtitle) slide.addText(slideData.subtitle, { fontFace: slideFont, x: 1, y: 3.5, w: 8, h: 1, fontSize: 24, color: "EEEEEE", align: "center" });
          break;
        default:
          slide.addText(slideData.title, { fontFace: slideFont, x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 40, bold: true, color: textColor, align: "left" });
          if (slideData.subtitle) slide.addText(slideData.subtitle, { fontFace: slideFont, x: 0.5, y: 1.5, w: 9, h: 0.5, fontSize: 20, italic: true, color: textColor, align: "left" });
          if (safeContent.length > 0) {
            const bullets = safeContent.map(text => ({ text, options: { bullet: bulletConfig } }));
            slide.addText(bullets, { fontFace: slideFont, x: 0.5, y: 2.2, w: 9, h: 3, fontSize: 24, color: textColor, align: "left", valign: "top" });
          }
          break;
      }
      if (slideData.speaker_notes) slide.addNotes(slideData.speaker_notes);
    }
    pres.writeFile({ fileName: getProjectName() + ".pptx" });
  };
 
  // 3. TRÍCH XUẤT BẢNG MÀU TỪ AI (Có màu mặc định dự phòng nếu AI quên)
  const palette = designData?.design_tokens?.color_palette || {
    background_hex: '#ffffff',
    main_text_hex: '#1e293b',
    accent_hex: '#f97316'
  };
  return (
    <div className="h-screen flex flex-col bg-[#F3F4F6] overflow-hidden font-sans text-slate-700">
     
      {/* HEADER */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-20 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/create" className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex flex-col">
             <input
               type="text"
               defaultValue={getProjectName()}
               className="font-bold text-sm text-slate-800 focus:outline-none focus:bg-slate-100 px-2 rounded hover:bg-slate-50 transition-colors w-64 truncate"
             />
             <span className="text-[10px] text-slate-400 px-2 flex items-center gap-1">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> {width} x {height} px
             </span>
          </div>
        </div>
       
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={exportToPPTX}
            className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-xs shadow-lg shadow-slate-300"
          >
            <Download size={16} /> Xuất file
          </button>
        </div>
      </header>
      {/* MAIN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden">
       
        {/* SIDEBAR TOOLS */}
        <aside className="w-16 bg-[#1e1e2d] flex flex-col items-center py-4 gap-4 z-10 shrink-0 shadow-xl">
           <ToolButton icon={<LayoutTemplate size={20}/>} label="Mẫu" active={activeTool === 'templates'} onClick={() => setActiveTool('templates')} />
           <ToolButton icon={<Type size={20}/>} label="Văn bản" active={activeTool === 'text'} onClick={() => setActiveTool('text')} />
           <ToolButton icon={<ImageIcon size={20}/>} label="Hình ảnh" active={activeTool === 'image'} onClick={() => setActiveTool('image')} />
           <ToolButton icon={<Shapes size={20}/>} label="Hình khối" active={activeTool === 'shapes'} onClick={() => setActiveTool('shapes')} />
        </aside>
        {/* --- KHU VỰC CANVAS ĐỘNG --- */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-[#e5e7eb]">
         
          {/* THANH ĐIỀU HƯỚNG SLIDE (Chỉ hiện khi là Slide) */}
          {designData && type === 'slide' && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg px-2 py-1 flex items-center gap-4 z-20 border border-slate-200">
               <button onClick={prevSlide} disabled={currentSlideIndex === 0} className="p-2 hover:bg-slate-100 rounded-full disabled:opacity-30 transition">
                 <ChevronLeft size={20} />
               </button>
               <span className="text-sm font-bold text-slate-600 min-w-[80px] text-center">
                 Slide {currentSlideIndex + 1} / {designData.slides.length}
               </span>
               <button onClick={nextSlide} disabled={currentSlideIndex === designData.slides.length - 1} className="p-2 hover:bg-slate-100 rounded-full disabled:opacity-30 transition">
                 <ChevronRight size={20} />
               </button>
            </div>
          )}
          {/* VÙNG CHỨA CANVAS */}
          <div className={`flex-1 overflow-auto p-8 flex ${isInfiniteCanvas ? 'items-start justify-start' : 'items-center justify-center'} relative custom-scrollbar`}>
             
              {isInfiniteCanvas ? (
                 /* 1. KHÔNG GIAN VÔ CỰC CHO SƠ ĐỒ TƯ DUY */
                 <div className="w-[3000px] h-[3000px] bg-white bg-[url('https://grainy-gradients.vercel.app/noise.svg')] relative shadow-inner cursor-grab active:cursor-grabbing">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    {designData && type === 'mindmap' ? (
                       <MindmapPreview data={designData} />
                    ) : (
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400 font-bold text-2xl">Central Idea</div>
                    )}
                 </div>
              ) : (
                 /* 2. KHÔNG GIAN CỐ ĐỊNH KÍCH THƯỚC (Slide, Poster, Infographic) */
                 <div
                    className="shadow-2xl transition-transform duration-200 ease-out origin-center flex-shrink-0 relative overflow-hidden"
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                      transform: `scale(${zoom / 100})`,
                      backgroundColor: type === 'slide' ? palette.background_hex : '#ffffff' // Đổ màu nền tự động cho Slide
                    }}
                 >
                    {designData ? (
                       <>
                         {type === 'slide' && <SlidePreview slide={designData.slides[currentSlideIndex]} palette={palette} />}
                         {type === 'poster' && <PosterPreview data={designData} />}
                         {type === 'infographic' && <InfographicPreview data={designData} />}
                       </>
                    ) : (
                       <CanvasStage type={type} />
                    )}
                 </div>
              )}
          </div>
          {/* Bottom Bar (Zoom) */}
          <div className="h-10 bg-white border-t border-slate-200 flex items-center justify-between px-4 z-10 shrink-0">
             <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span>{label} Mode</span>
             </div>
             
             {!isInfiniteCanvas && (
               <div className="flex items-center gap-2">
                  <button onClick={() => setZoom(Math.max(10, zoom - 10))} className="p-1 hover:bg-slate-100 rounded text-slate-500"><ZoomOut size={14}/></button>
                  <span className="text-xs font-bold w-12 text-center text-slate-600">{zoom}%</span>
                  <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="p-1 hover:bg-slate-100 rounded text-slate-500"><ZoomIn size={14}/></button>
               </div>
             )}
          </div>
        </main>
        {/* Chatbot AI / Kịch bản thuyết trình */}
        <aside className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 shadow-lg z-20">
           <div className="p-4 border-b flex items-center gap-2">
              <Bot className="text-brand-primary" size={20}/>
              <span className="font-bold text-slate-700">Trợ lý AI Ghi chú</span>
           </div>
           <div className="flex-1 bg-slate-50 p-4 overflow-auto">
             {designData && type === 'slide' && designData.slides[currentSlideIndex]?.speaker_notes && (
               <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 shadow-sm mb-4">
                 <h4 className="font-bold text-orange-800 text-sm mb-2 flex items-center gap-2">
                   <Sparkles size={16}/> Kịch bản thuyết trình:
                 </h4>
                 <p className="text-sm text-slate-700 leading-relaxed">
                   {designData.slides[currentSlideIndex].speaker_notes}
                 </p>
               </div>
             )}
             
             {designData && type !== 'slide' && (
               <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm text-sm text-slate-600">
                 Bản thiết kế đã được tạo tự động thành công! Bạn có thể chỉnh sửa các thành phần trực tiếp trên khung vẽ.
               </div>
             )}
           </div>
        </aside>
      </div>
    </div>
  );
};
// --- COMPONENT NÚT BẤM ---
const ToolButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 p-2 w-full transition-all duration-200 group relative ${active ? 'text-white' : 'text-slate-400 hover:text-white'}`}
  >
    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-primary rounded-r-full"></div>}
    <div className={`p-2 rounded-xl transition-all ${active ? 'bg-orange-500' : 'group-hover:bg-white/10'}`}>
       {icon}
    </div>
    <span className={`text-[10px] font-medium transition-opacity ${active ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
  </button>
);
/* ======================================================================
   COMPONENT: TỰ ĐỘNG TẢI ẢNH TỪ UNSPLASH
   ====================================================================== */
const UnsplashImage = ({ keyword, palette, className = "" }) => {
  const [imgUrl, setImgUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!keyword) return;
   
    // THAY MÃ ACCESS KEY CỦA BẠN VÀO ĐÂY
    const UNSPLASH_ACCESS_KEY = "bpWw0HINmVWKMmjJUUAodMQN1G4KpJ66Y-VNB0ANItY";
   
    setIsLoading(true);
    // Gọi API tìm kiếm ảnh của Unsplash
    fetch(`https://api.unsplash.com/search/photos?page=1&per_page=1&orientation=landscape&query=${encodeURIComponent(keyword)}&client_id=${UNSPLASH_ACCESS_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          setImgUrl(data.results[0].urls.regular); // Lấy link ảnh độ phân giải cao
        }
      })
      .catch(err => console.error("Lỗi tải ảnh Unsplash:", err))
      .finally(() => setIsLoading(false));
  }, [keyword]);
  // Nếu đang tải hoặc không tìm thấy ảnh, hiển thị khung báo hiệu
  if (isLoading || !imgUrl) {
    return (
      <div className={`bg-black/5 flex flex-col items-center justify-center border-2 border-dashed relative overflow-hidden group ${className}`} style={{ borderColor: palette.accent_hex }}>
         <ImageIcon size={60} style={{ color: palette.main_text_hex, opacity: 0.3 }} className="mb-4 animate-pulse" />
         <p className="text-2xl font-medium px-8 text-center" style={{ color: palette.main_text_hex, opacity: 0.5 }}>
           Đang tải ảnh: <strong style={{ color: palette.accent_hex }}>{keyword}</strong>
         </p>
      </div>
    );
  }
  // Nếu có ảnh, hiển thị ảnh thật
  return (
    <img
      src={imgUrl}
      alt={keyword}
      className={`object-cover shadow-lg ${className}`}
      crossOrigin="anonymous"
    />
  );
};
/* ======================================================================
   CÁC COMPONENT GIAO DIỆN NÂNG CẤP (RENDERERS)
   ====================================================================== */
// 1. SLIDE (THUYẾT TRÌNH) - Tích hợp Unsplash và Họa tiết nền
const SlidePreview = ({ slide, palette }) => {
  if (!slide) return null;
  const { layout, title, subtitle, content, image_search_keyword } = slide;
 
  // Style động theo bảng màu của AI
  const textStyle = { color: palette.main_text_hex };
  const accentStyle = { color: palette.accent_hex };
  const bgAccentStyle = { backgroundColor: palette.accent_hex };
  const borderAccentStyle = { borderColor: palette.accent_hex };
  // Layout: Trang bìa
  if (layout === 'title_slide') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-24 text-center relative z-10">
        <h1 className="text-[120px] font-black mb-8 leading-tight drop-shadow-lg max-w-5xl" style={textStyle}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-[40px] font-medium max-w-4xl opacity-80" style={textStyle}>{subtitle}</p>
        )}
      </div>
    );
  }
  // Layout: Câu nói trung tâm / Chuyển cảnh
  if (layout === 'central_statement' || layout === 'section_transition') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-32 text-center">
        <h2 className="text-[90px] font-black leading-snug" style={textStyle}>"{title}"</h2>
        {subtitle && <p className="text-[40px] mt-8 opacity-80" style={textStyle}>{subtitle}</p>}
      </div>
    );
  }
  // Layout: Chia không gian 50/50
  if (layout === 'split_1_2' || layout === 'content_image_aligned') {
    return (
      <div className="w-full h-full flex">
        <div className="w-1/2 h-full p-24 flex flex-col justify-center">
          <h2 className="text-[70px] font-bold mb-6 leading-tight" style={textStyle}>{title}</h2>
          {subtitle && <p className="text-[35px] italic mb-12 opacity-70" style={textStyle}>{subtitle}</p>}
          <ul className="space-y-8">
            {content?.map((item, i) => (
              <li key={i} className="text-[40px] flex items-start gap-6 font-medium" style={textStyle}>
                <span className="text-[50px] leading-none mt-1" style={accentStyle}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 h-full p-12">
           <UnsplashImage keyword={image_search_keyword} palette={palette} className="w-full h-full rounded-3xl" />
        </div>
      </div>
    );
  }
  // Layout: Ma trận 4 ô chữ nhật
  if (layout === 'grid_4_matrix') {
    return (
      <div className="w-full h-full p-24 flex flex-col">
        <div className="text-center mb-16">
          <h2 className="text-[75px] font-bold mb-4" style={textStyle}>{title}</h2>
          {subtitle && <p className="text-[35px] opacity-70" style={textStyle}>{subtitle}</p>}
        </div>
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-12">
          {content?.slice(0, 4).map((item, i) => (
            <div key={i} className="p-12 rounded-3xl shadow-xl flex flex-col justify-center border-l-[12px]" style={{ backgroundColor: '#ffffff10', ...borderAccentStyle, backdropFilter: 'blur(10px)' }}>
               <p className="text-[45px] font-semibold leading-snug" style={textStyle}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // Layout: Luồng thời gian (Timeline)
  if (layout === 'timeline_flow') {
    return (
      <div className="w-full h-full p-24 flex flex-col justify-center">
        <h2 className="text-[80px] font-bold mb-20 text-center" style={textStyle}>{title}</h2>
        <div className="flex items-center justify-between gap-4">
          {content?.map((item, i) => (
            <React.Fragment key={i}>
              <div className="flex-1 flex flex-col items-center text-center">
                 <div className="w-32 h-32 rounded-full flex items-center justify-center text-[50px] font-black mb-8 shadow-2xl" style={{ ...bgAccentStyle, color: palette.background_hex }}>
                   {i + 1}
                 </div>
                 <p className="text-[35px] font-bold" style={textStyle}>{item}</p>
              </div>
              {i < content.length - 1 && (
                <div className="w-24 flex justify-center opacity-50"><ArrowRight size={60} style={accentStyle}/></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
  // Layout: Không gian tràn viền 100%
  if (layout === 'full_screen_impact') {
    return (
      <div className="w-full h-full relative">
         <UnsplashImage keyword={image_search_keyword} palette={palette} className="absolute inset-0 w-full h-full" />
         <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-24 text-center">
            <h2 className="text-[120px] font-black text-white drop-shadow-2xl mb-8">{title}</h2>
            {subtitle && <p className="text-[50px] text-gray-200 font-medium drop-shadow-md max-w-4xl">{subtitle}</p>}
         </div>
      </div>
    );
  }
  // Layout: Trang cảm ơn (ending_slide)
  if (layout === 'ending_slide') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-24 text-center">
        <h1 className="text-[140px] font-black mb-10" style={accentStyle}>{title || "Cảm ơn!"}</h1>
        {subtitle && <p className="text-[50px] font-medium opacity-80" style={textStyle}>{subtitle}</p>}
        {content && content.length > 0 && <p className="text-[40px] mt-8" style={textStyle}>{content[0]}</p>}
      </div>
    );
  }
  // MẶC ĐỊNH (Cho các layout toc_slide hoặc tiêu chuẩn)
  return (
    <div
      className="w-full h-full p-24 flex flex-col relative"
      // Phủ họa tiết Dot Pattern (HeroPatterns) dùng chính màu chữ của AI nhưng làm mờ 15% (Hex Code + '15')
      style={{
        backgroundImage: `radial-gradient(${palette.main_text_hex}15 2px, transparent 2px)`,
        backgroundSize: '30px 30px'
      }}
    >
       <h2 className="text-[80px] font-bold mb-6 relative z-10" style={textStyle}>{title}</h2>
       {subtitle && <p className="text-[35px] italic mb-16 opacity-70 relative z-10" style={textStyle}>{subtitle}</p>}
       
       <div className="flex-1 flex gap-16 relative z-10">
         <div className="flex-1 flex flex-col justify-center">
            <ul className="space-y-10 list-none">
              {content?.map((item, idx) => (
                <li key={idx} className="text-[45px] font-medium leading-snug flex items-start gap-6" style={textStyle}>
                  {/* Sử dụng Lucide Icon (Sparkles) thay cho dấu chấm tròn, đổi màu theo AI */}
                  <Sparkles size={50} className="mt-2 shrink-0" style={accentStyle} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
         </div>
         {image_search_keyword && (
           <div className="w-[45%]">
             <UnsplashImage
                keyword={image_search_keyword}
                palette={palette}
                className="w-full h-full rounded-3xl"
             />
           </div>
         )}
       </div>
    </div>
  );
};
// 2. MINDMAP (SƠ ĐỒ TƯ DUY) - Giữ nguyên
const MindmapPreview = ({ data }) => {
  if (!data) return null;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-10">
      <h1 className="absolute top-10 text-4xl font-black text-slate-800 bg-white/80 px-8 py-4 rounded-full shadow-md z-20">
        {data.mindmap_title}
      </h1>
      <div className="flex items-center gap-16 scale-125 origin-center mt-10">
         <div className="bg-brand-primary text-white p-8 rounded-3xl shadow-2xl font-black text-4xl z-10 border-8 border-orange-200 relative">
            {data.central_node}
            <div className="absolute top-1/2 -right-16 w-16 h-2 bg-orange-300 -translate-y-1/2"></div>
         </div>
         <div className="flex flex-col gap-12 relative border-l-8 border-orange-300 pl-16 py-8">
           {data.branches?.map((branch, idx) => (
              <div key={idx} className="flex items-center gap-12 relative">
                 <div className="absolute top-1/2 -left-20 w-8 h-8 bg-orange-500 rounded-full border-4 border-white -translate-y-1/2"></div>
                 <div className="absolute top-1/2 -left-16 w-16 h-2 bg-orange-300 -translate-y-1/2"></div>
                 <div className="bg-white border-4 border-orange-400 px-8 py-5 rounded-2xl shadow-lg font-bold text-2xl text-slate-700 min-w-[250px] flex items-center justify-between gap-4">
                    {branch.branch_title}
                    {branch.icon_search_keyword && <ImageIcon size={24} className="text-orange-400 opacity-50"/>}
                 </div>
                 <div className="flex flex-col gap-3 border-l-4 border-slate-200 pl-8 relative">
                   {branch.sub_branches?.map((sub, sIdx) => (
                      <div key={sIdx} className="bg-slate-50 border border-slate-200 px-6 py-3 rounded-xl text-lg font-medium text-slate-600 relative">
                         <div className="absolute top-1/2 -left-8 w-8 h-1 bg-slate-200 -translate-y-1/2"></div>
                         {sub}
                      </div>
                   ))}
                 </div>
              </div>
           ))}
         </div>
      </div>
    </div>
  );
};
// 3. POSTER (ÁP PHÍCH) - Giữ nguyên
const PosterPreview = ({ data }) => {
  if (!data) return null;
  return (
    <div className="w-full h-full flex flex-col justify-between p-16 text-white text-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden shadow-inner">
       <div className="absolute inset-0 bg-black/20"></div>
       <div className="z-10 mt-16 flex flex-col items-center">
         <div className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold tracking-widest uppercase mb-8 text-2xl shadow-lg">
           {data.poster_type}
         </div>
         <h1 className="text-[110px] font-black leading-tight mb-6 drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200">
           {data.main_title}
         </h1>
         <p className="text-4xl text-indigo-200 font-medium max-w-4xl mx-auto drop-shadow-md">
           {data.subtitle}
         </p>
       </div>
       <div className="z-10 flex flex-col items-center gap-8 my-auto w-full">
          {data.key_points?.map((pt, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md px-10 py-6 rounded-3xl border border-white/20 text-4xl font-semibold w-4/5 max-w-4xl shadow-xl flex items-center justify-center gap-6">
               <Sparkles className="text-orange-400 shrink-0" size={40} />
               <span>{pt}</span>
            </div>
          ))}
       </div>
       <div className="z-10 mb-16 flex flex-col items-center">
          <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-16 py-8 rounded-full text-5xl font-black uppercase tracking-wider shadow-[0_0_60px_rgba(249,115,22,0.6)] mb-10 transform hover:scale-105 transition">
             {data.call_to_action}
          </div>
          <p className="text-2xl text-slate-300 font-medium bg-black/40 px-8 py-3 rounded-full">
             {data.footer_info}
          </p>
       </div>
    </div>
  );
};
// 4. INFOGRAPHIC (ĐỒ HỌA THÔNG TIN) - Giữ nguyên
const InfographicPreview = ({ data }) => {
  if (!data) return null;
  return (
    <div className="w-full min-h-full bg-slate-50 text-slate-800 p-20 flex flex-col items-center relative">
      <div className="text-center max-w-4xl mb-24 relative z-10">
        <h1 className="text-[80px] font-black text-slate-900 mb-8 leading-tight drop-shadow-sm">{data.infographic_title}</h1>
        <p className="text-3xl text-slate-600 border-t-8 border-orange-500 pt-8 inline-block font-medium">{data.introduction}</p>
      </div>
      <div className="w-full max-w-5xl relative flex-1">
        <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-orange-200 -translate-x-1/2 rounded-full"></div>
        {data.sections?.map((sec, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div key={i} className={`flex w-full mb-20 items-center ${isLeft ? 'justify-start' : 'justify-end'} relative`}>
               <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 bg-orange-500 rounded-full border-[10px] border-white z-10 shadow-xl flex items-center justify-center text-white font-bold text-xl">
                 {i + 1}
               </div>
               <div className={`w-5/12 ${isLeft ? 'pr-16 text-right' : 'pl-16 text-left'}`}>
                 <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100 relative group hover:-translate-y-2 transition-transform duration-300">
                   <h3 className="text-[70px] font-black text-brand-primary mb-4 leading-none">{sec.highlight_data}</h3>
                   <h4 className="text-4xl font-bold text-slate-800 mb-6">{sec.heading}</h4>
                   <ul className={`space-y-4 ${isLeft ? 'items-end' : 'items-start'} flex flex-col`}>
                      {sec.content_points?.map((pt, idx) => (
                         <li key={idx} className="text-2xl text-slate-500 font-medium flex gap-2">
                           {isLeft ? '' : <span className="text-orange-400">•</span>}
                           {pt}
                           {isLeft ? <span className="text-orange-400">•</span> : ''}
                         </li>
                      ))}
                   </ul>
                 </div>
               </div>
            </div>
          )
        })}
      </div>
      <div className="mt-20 bg-slate-800 text-white w-full max-w-4xl p-12 rounded-[40px] text-center shadow-2xl z-10">
         <p className="text-4xl font-bold leading-relaxed">{data.conclusion}</p>
      </div>
    </div>
  );
};
export default Editor;
