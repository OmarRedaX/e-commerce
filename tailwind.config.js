

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}","./index.html","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    screens: {
      'sm': '200px',  // Define the 'sm' breakpoint at 400px
      // You can also define other breakpoints here
      'md': '930px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

