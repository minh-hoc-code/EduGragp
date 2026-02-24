/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Trích xuất từ script tailwind.config trong file HTML
        brand: {
          orange: '#F4A261',  /* Màu cam logo Edu */
          coral: '#E76F51',   /* Màu hồng logo Graph */
          primary: '#FD5F00', /* Màu cam chủ đạo nút bấm */
          bg: '#FCFBF9',      /* Màu nền kem */
        },
      },
      fontFamily: {
        // Trích xuất từ Google Fonts & CSS body
        sans: ['Inter', 'sans-serif'], 
        // Trích xuất từ class .font-handwriting (Patrick Hand)
        handwriting: ['"Patrick Hand"', 'cursive'], 
      },
    },
  },
  plugins: [],
}