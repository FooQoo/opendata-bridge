const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontChat: {
        body: [
          'Hiragino Kaku Gothic ProN',
          'Helvetica Neue',
          'Arial',
          'Hiragino Sans',
          'Meiryo',
          'sans-serif',
        ],
      },
    },
  },
  // darkMode: 'class',
  plugins: [nextui()],
};
