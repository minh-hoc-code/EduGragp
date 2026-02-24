import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const CanvasStage = ({ elements = [], setElements }) => {
  // Trạng thái lưu trữ ID của phần tử đang được click chọn
  const [selectedId, setSelectedId] = useState(null);

  // Hàm cập nhật thuộc tính của phần tử (khi kéo thả xong hoặc thay đổi kích thước xong)
  const handleUpdateElement = (id, newProps) => {
    if (!setElements) return; // Nếu chưa truyền setElements thì bỏ qua
    setElements((prevElements) =>
      prevElements.map((el) => (el.id === id ? { ...el, ...newProps } : el))
    );
  };

  // Click ra ngoài khoảng trống -> Bỏ chọn tất cả
  const handleDeselect = () => {
    setSelectedId(null);
  };

  return (
    <div 
      className="w-full h-full bg-white relative overflow-hidden shadow-sm"
      onClick={handleDeselect} // Click vào nền canvas sẽ bỏ chọn
    >
      {elements.length === 0 ? (
        // Hiển thị Placeholder nếu chưa có dữ liệu (giống code cũ của bạn)
        <div className="absolute inset-0 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 bg-slate-50">
          <h3 className="text-slate-500 font-bold text-xl">Khu vực Canvas</h3>
          <p className="text-slate-400 text-sm mt-2">Dữ liệu AI sẽ được vẽ và kéo thả tại đây</p>
        </div>
      ) : (
        // Vòng lặp render các phần tử động
        elements.map((el) => {
          const isSelected = selectedId === el.id;

          return (
            <Rnd
              key={el.id}
              bounds="parent" // Không cho kéo ra khỏi canvas
              size={{ width: el.width, height: el.height }}
              position={{ x: el.x, y: el.y }}
              
              // Cập nhật state khi kéo thả xong
              onDragStop={(e, d) => {
                handleUpdateElement(el.id, { x: d.x, y: d.y });
              }}
              
              // Cập nhật state khi kéo giãn xong
              onResizeStop={(e, direction, ref, delta, position) => {
                handleUpdateElement(el.id, {
                  width: parseInt(ref.style.width, 10),
                  height: parseInt(ref.style.height, 10),
                  ...position, // Cập nhật lại x,y phòng trường hợp kéo giãn từ góc trên/trái
                });
              }}
              
              // Xử lý Click chọn phần tử
              onClick={(e) => {
                e.stopPropagation(); // Chặn sự kiện click truyền ra nền canvas
                setSelectedId(el.id);
              }}
              
              // Viền báo hiệu đang chọn (Giống Canva)
              className={`group transition-none ${isSelected ? 'ring-2 ring-brand-primary ring-offset-1 z-50' : 'hover:ring-1 hover:ring-slate-300 z-10'}`}
              style={{ position: 'absolute' }}
            >
              {/* --- RENDER NỘI DUNG DỰA TRÊN LOẠI PHẦN TỬ (TYPE) --- */}
              <div className="w-full h-full relative cursor-move">
                
                {/* 1. Phần tử chữ (Text) */}
                {el.type === 'text' && (
                  <div
                    style={{ ...el.style, width: '100%', height: '100%', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
                  >
                    {el.content}
                  </div>
                )}

                {/* 2. Phần tử hình khối (Shape) */}
                {el.type === 'shape' && (
                  <div style={{ ...el.style, width: '100%', height: '100%' }}></div>
                )}

                {/* 3. Phần tử ảnh (Image) - Tạm hiển thị ô xám chờ tích hợp Unsplash thực tế vào phần tử */}
                {el.type === 'image' && (
                  <div 
                    style={{ ...el.style, width: '100%', height: '100%' }} 
                    className="bg-slate-200 border-2 border-slate-300 flex items-center justify-center overflow-hidden"
                  >
                    <span className="text-slate-400 font-medium px-4 text-center">
                      [Ảnh: {el.searchKeyword}]
                    </span>
                  </div>
                )}

                {/* Nút Resize giả lập (Chỉ hiện khi được chọn) */}
                {isSelected && (
                  <>
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-white border-2 border-brand-primary rounded-full"></div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-white border-2 border-brand-primary rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white border-2 border-brand-primary rounded-full"></div>
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-brand-primary rounded-full"></div>
                  </>
                )}
              </div>
            </Rnd>
          );
        })
      )}
    </div>
  );
};

export default CanvasStage;