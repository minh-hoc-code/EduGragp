import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wand2, 
  Zap, 
  PlayCircle, 
  Check, 
  FileText, 
  ArrowRight, 
  Share2, 
  Brain, 
  PenTool, 
  Network, 
  MonitorPlay, // Dùng cho icon PPTX/Slide
  CheckCircle 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-brand-bg text-slate-800 font-sans">
      {/* Sử dụng Navbar component đã tạo */}
      <Navbar />

      {/* --- HERO SECTION --- */}
      <main className="px-6 md:px-12 py-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-brand-primary border border-orange-100 rounded-full font-semibold text-xs uppercase tracking-wider">
            <Wand2 size={14} /> AI Powered Design
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 tracking-tight">
            Chuyển đổi tài liệu thành <br/>
            <span className="text-brand-primary underline decoration-4 decoration-orange-200 underline-offset-4">
              Slide Thuyết Trình
            </span> <br/>
            Trong tích tắc
          </h1>
          
          <p className="text-base text-slate-600 leading-relaxed max-w-lg">
            Không cần copy-paste thủ công. EduGraph sử dụng AI để đọc hiểu PDF sách giáo khoa, tóm tắt ý chính và tự động thiết kế slide hoặc sơ đồ tư duy chuyên nghiệp.
          </p>
          
          {/* Buttons Group */}
          <div className="flex gap-3 pt-2">
            <Link to="/dashboard">
              <Button variant="primary" className="px-7 py-3.5 text-base shadow-xl hover:-translate-y-1">
                <Zap size={18} /> Tạo Slide Ngay
              </Button>
            </Link>
            
            <Button variant="outline" className="px-7 py-3.5 text-base hover:border-brand-primary hover:text-brand-primary">
              <PlayCircle size={18} /> Xem Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-4 text-xs text-slate-400 font-medium pt-4">
            <span className="flex items-center gap-1">
              <Check size={14} className="text-green-500" /> Miễn phí trọn đời
            </span>
            <span className="flex items-center gap-1">
              <Check size={14} className="text-green-500" /> Không cần thẻ tín dụng
            </span>
          </div>
        </div>
        
        {/* --- HERO IMAGE (Abstract & Modern) --- */}
        <div className="flex-1 relative w-full">
          {/* Background Blobs */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-brand-coral/20 rounded-full blur-3xl"></div>
          
          {/* Glass Panel Card */}
          <div className="bg-white/70 backdrop-blur-md border border-white/30 p-2 rounded-2xl shadow-2xl relative z-10 transform rotate-2 hover:rotate-0 transition-all duration-500">
            <div className="bg-white rounded-xl overflow-hidden border border-slate-100">
              {/* Fake Browser Header */}
              <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-auto text-xs text-slate-400">History_Grade12.pdf</div>
              </div>

              {/* Interaction Simulation */}
              <div className="aspect-[4/3] relative bg-slate-50 flex items-center justify-center group">
                 <FileText size={64} className="text-slate-300 group-hover:scale-90 transition-transform duration-500" />
                 
                 <ArrowRight size={48} className="text-brand-primary absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                 
                 <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-brand-primary font-bold text-xl mb-2">Đang phân tích...</div>
                        <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden mx-auto">
                            <div className="h-full bg-brand-primary w-2/3 animate-pulse"></div>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
          
          {/* Floating Badge */}
          <div 
            className="absolute -left-4 top-1/3 bg-white/70 backdrop-blur-md border border-white/30 px-4 py-2 rounded-lg flex items-center gap-3 shadow-lg animate-bounce" 
            style={{ animationDuration: '4s' }}
          >
            <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center text-blue-600">
              <Share2 size={16} />
            </div>
            <div>
              <div className="text-xs text-slate-500">Chế độ</div>
              <div className="text-sm font-bold text-slate-800">Mind Map</div>
            </div>
          </div>
        </div>
      </main>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="bg-white py-20 px-6 md:px-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Mọi công cụ bạn cần để tỏa sáng</h2>
            <p className="text-slate-600">EduGraph kết hợp sức mạnh của Generative AI với giao diện kéo thả trực quan, giúp việc học tập trở nên thú vị hơn bao giờ hết.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-500 mb-5 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Brain size={24} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-800">AI Hiểu Sâu (RAG)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Không chỉ tóm tắt hời hợt. Hệ thống đọc hiểu ngữ nghĩa của tài liệu dài, trích xuất đúng trọng tâm và giữ nguyên trích dẫn nguồn.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-primary mb-5 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <PenTool size={24} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-800">Kéo Thả Vô Tận</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Giao diện Canvas HTML5 mượt mà. Tự do di chuyển, phóng to, thu nhỏ mọi thành phần đồ họa như trên Canva chuyên nghiệp.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-purple-500 mb-5 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <Network size={24} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-800">Slide sang Mindmap</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Chuyển đổi tức thì giữa chế độ trình chiếu tuyến tính và sơ đồ tư duy phân cấp chỉ với 1 cú click chuột.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-500 mb-5 group-hover:bg-green-500 group-hover:text-white transition-colors">
                <MonitorPlay size={24} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-800">Tương thích PPTX</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nhập và xuất file PowerPoint dễ dàng. Tận dụng hàng ngàn template có sẵn từ Slidesgo hay Canva.
              </p>
            </div>
          </div>

          {/* Additional Feature Row */}
          <div className="mt-16 bg-brand-primary/5 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-brand-primary/10">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Cộng tác thời gian thực</h3>
              <p className="text-slate-600 mb-6">Làm bài tập nhóm chưa bao giờ dễ đến thế. Mời bạn bè cùng chỉnh sửa slide, chat trực tiếp và chia sẻ tài liệu ngay trên nền tảng.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <CheckCircle size={18} className="text-brand-primary" /> Đồng bộ hóa độ trễ thấp
                </li>
                <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <CheckCircle size={18} className="text-brand-primary" /> Chat & Bình luận ngay trên Slide
                </li>
              </ul>
            </div>
            
            {/* UI Simulation for Collaboration */}
            <div className="flex-1 bg-white p-4 rounded-xl shadow-lg border border-slate-100 w-full max-w-md">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-white flex items-center justify-center text-xs font-bold text-red-600">A</div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600">B</div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">+2</div>
                </div>
                <div className="text-xs text-slate-400">Đang chỉnh sửa...</div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-slate-100 rounded w-3/4"></div>
                <div className="h-2 bg-slate-100 rounded w-full"></div>
                <div className="h-2 bg-slate-100 rounded w-5/6"></div>
              </div>
              <div className="mt-4 p-2 bg-blue-50 rounded-lg text-xs text-blue-700 border border-blue-100 flex gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-200 flex-shrink-0"></div>
                "Cậu thêm ảnh minh họa cho phần này nhé!"
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;