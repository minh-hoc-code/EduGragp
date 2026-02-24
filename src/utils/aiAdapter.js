// File: src/utils/aiAdapter.js

/**
 * Hàm tạo ID ngẫu nhiên cho mỗi phần tử để React quản lý (tránh lỗi key)
 */
const generateId = (prefix) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

/**
 * Hàm chuyển đổi dữ liệu Slide của AI thành mảng các phần tử (Elements) có tọa độ
 * @param {Object} slideData - Dữ liệu 1 slide từ AI (chứa layout, title, content...)
 * @param {Object} palette - Bảng màu từ AI
 * @param {Number} canvasWidth - Chiều rộng khung vẽ (Mặc định 1920)
 * @param {Number} canvasHeight - Chiều cao khung vẽ (Mặc định 1080)
 * @returns {Array} - Mảng các đối tượng Element (text, image, shape) có tọa độ x, y
 */
export const parseAIDataToElements = (slideData, palette, canvasWidth = 1920, canvasHeight = 1080) => {
  if (!slideData) return [];

  const elements = [];
  const { layout, title, subtitle, content, image_search_keyword } = slideData;

  // --- CÁC HÀM TIỆN ÍCH TẠO ELEMENT CHUẨN ---

  const createText = (text, x, y, w, h, styles = {}) => ({
    id: generateId('text'),
    type: 'text',
    content: text,
    x, y, width: w, height: h,
    style: {
      fontFamily: 'Segoe UI, sans-serif',
      color: palette.main_text_hex || '#1e293b',
      fontSize: 40, // Default font size
      fontWeight: 'normal',
      textAlign: 'left',
      ...styles
    }
  });

  const createImage = (keyword, x, y, w, h, isBackground = false) => ({
    id: generateId('img'),
    type: 'image',
    searchKeyword: keyword, // Lưu lại keyword để gọi Unsplash ở component
    x, y, width: w, height: h,
    isBackground,
    style: { borderRadius: isBackground ? 0 : 24 }
  });

  const createShape = (shapeType, x, y, w, h, styles = {}) => ({
    id: generateId('shape'),
    type: 'shape',
    shapeType, // 'rect', 'circle', etc.
    x, y, width: w, height: h,
    style: {
      backgroundColor: palette.accent_hex || '#f97316',
      ...styles
    }
  });

  // Chuyển mảng content thành 1 string có dấu chấm tròn (bullet points) để dễ edit
  const safeContent = Array.isArray(content) ? content : (content ? [content] : []);
  const bulletText = safeContent.length > 0 ? safeContent.map(item => `✦ ${item}`).join('\n\n') : '';

  // --- TÍNH TOÁN TỌA ĐỘ THEO TỪNG LAYOUT (Dựa trên khung 1920x1080) ---

  switch (layout) {
    case 'title_slide':
    case 'central_statement':
    case 'section_transition':
      // Tiêu đề căn giữa màn hình
      if (title) {
        elements.push(createText(title, 260, 350, 1400, 200, { fontSize: 110, fontWeight: 'bold', textAlign: 'center' }));
      }
      if (subtitle) {
        elements.push(createText(subtitle, 460, 600, 1000, 100, { fontSize: 45, opacity: 0.8, textAlign: 'center' }));
      }
      break;

    case 'split_1_2':
    case 'content_image_aligned':
      // Nửa trái là chữ, Nửa phải là ảnh
      if (title) {
        elements.push(createText(title, 100, 200, 800, 150, { fontSize: 80, fontWeight: 'bold' }));
      }
      if (subtitle) {
        elements.push(createText(subtitle, 100, 350, 800, 80, { fontSize: 35, fontStyle: 'italic', opacity: 0.7 }));
      }
      if (bulletText) {
        elements.push(createText(bulletText, 100, 480, 800, 500, { fontSize: 38, lineHeight: 1.5 }));
      }
      if (image_search_keyword) {
        elements.push(createImage(image_search_keyword, 1000, 150, 800, 780));
      } else {
        // Nếu AI không có ảnh, tạo một khối Shape thay thế
        elements.push(createShape('rect', 1000, 150, 800, 780, { backgroundColor: '#e2e8f0', borderRadius: 24 }));
      }
      break;

    case 'grid_4_matrix':
      // Tiêu đề trên cùng, 4 khối ở dưới
      if (title) {
        elements.push(createText(title, 160, 100, 1600, 120, { fontSize: 75, fontWeight: 'bold', textAlign: 'center' }));
      }
      if (subtitle) {
        elements.push(createText(subtitle, 460, 230, 1000, 80, { fontSize: 35, opacity: 0.7, textAlign: 'center' }));
      }
      // Tọa độ cho 4 ô (2x2)
      const boxCoords = [
        { x: 260, y: 350 }, { x: 1010, y: 350 },
        { x: 260, y: 680 }, { x: 1010, y: 680 }
      ];
      safeContent.slice(0, 4).forEach((text, index) => {
        // Shape làm nền
        elements.push(createShape('rect', boxCoords[index].x, boxCoords[index].y, 650, 280, { backgroundColor: `${palette.accent_hex}20`, borderLeft: `12px solid ${palette.accent_hex}`, borderRadius: 24 }));
        // Text bên trong
        elements.push(createText(text, boxCoords[index].x + 40, boxCoords[index].y + 40, 570, 200, { fontSize: 40, fontWeight: '600' }));
      });
      break;

    case 'full_screen_impact':
      // Ảnh làm nền toàn màn hình phủ mờ
      if (image_search_keyword) {
        elements.push(createImage(image_search_keyword, 0, 0, canvasWidth, canvasHeight, true));
      } else {
        elements.push(createShape('rect', 0, 0, canvasWidth, canvasHeight, { backgroundColor: palette.accent_hex }));
      }
      // Khối màu đen phủ mờ (Overlay) để nổi chữ
      elements.push(createShape('rect', 0, 0, canvasWidth, canvasHeight, { backgroundColor: 'rgba(0,0,0,0.4)' }));
      
      if (title) {
        elements.push(createText(title, 260, 400, 1400, 200, { fontSize: 120, fontWeight: 'bold', textAlign: 'center', color: '#ffffff' }));
      }
      if (subtitle) {
        elements.push(createText(subtitle, 460, 650, 1000, 100, { fontSize: 50, textAlign: 'center', color: '#eeeeee' }));
      }
      break;

    default:
      // Layout mặc định tiêu chuẩn (Title trên, nội dung dưới)
      if (title) {
        elements.push(createText(title, 100, 100, 1720, 120, { fontSize: 80, fontWeight: 'bold' }));
      }
      if (subtitle) {
        elements.push(createText(subtitle, 100, 240, 1720, 80, { fontSize: 35, fontStyle: 'italic', opacity: 0.7 }));
      }
      if (bulletText) {
        elements.push(createText(bulletText, 100, 360, 1720, 600, { fontSize: 45, lineHeight: 1.6 }));
      }
      break;
  }

  return elements;
};