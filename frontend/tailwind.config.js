/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 리액트 파일 경로 지정
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  content: ["./src/**/*.{js,jsx,ts,tsx}", ],
  theme: {
    extend: {},
  },
  plugins: [],
}

