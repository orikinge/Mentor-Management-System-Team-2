/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {},
      colors: {
        primary: "#058B94",
        "primary-active": "#035D63",
        white: "#FFFFFF",
      },
    },
    plugins: [],
  };