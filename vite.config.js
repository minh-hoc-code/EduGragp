import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // THÊM ĐOẠN KHỐI NÀY VÀO: Ép Vite gộp chung React
  resolve: {
    dedupe: ['react', 'react-dom']
  }
})