/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      colors: {
        primary: {
          blue: "#0094FF",
          light: "#4CC9F0",
          dark: "#0070CC",
        },
        dark: {
          navy: "#0A192F",
        },
        accent: {
          blue: "#0094FF", // Menggunakan primary blue sebagai accent
          light: "#4CC9F0", // Light blue untuk hover effects
          bright: "#00AAFF", // Slightly brighter blue untuk highlights
        },
        neutral: {
          gray: "#9CA3AF",
        },
        white: "#FFFFFF",
        // Legacy colors untuk kompatibilitas
        blue: {
          50: "#4CC9F0",
          75: "#0094FF",
          100: "#FFFFFF",
          200: "#0A192F",
          300: "#4CC9F0",
        },
        violet: {
          300: "#0094FF", // Replace violet dengan primary blue
        },
        yellow: {
          100: "#9CA3AF",
          300: "#4CC9F0",
        },
      },
    },
  },
  plugins: [],
};
