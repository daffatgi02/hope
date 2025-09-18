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
          red: "#8B0000",      // Main brand red dari logo
          light: "#A50000",    // Lighter red untuk hover
          dark: "#660000",     // Darker red untuk depth
          darker: "#4D0000",   // Darkest red untuk shadows
        },
        secondary: {
          red: "#DC143C",      // Crimson untuk accents
          light: "#FF1744",    // Bright red untuk highlights
          dark: "#B71C1C",     // Dark crimson
        },
        background: {
          primary: "#8B0000",  // Main red background
          gradient: "linear-gradient(135deg, #8B0000 0%, #660000 50%, #4D0000 100%)",
          card: "#A50000",     // Card backgrounds
          dark: "#330000",     // Darkest sections
          light: "rgba(139, 0, 0, 0.1)",  // Very light red untuk sections
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        },
        text: {
          primary: "#FFFFFF",  // Main white text
          secondary: "#F5F5F5", // Slightly gray white
          muted: "#E0E0E0",    // Muted white untuk descriptions
          accent: "#FFE0E0",   // Light pink untuk special text
        },
        accent: {
          red: "#FF4444",      // Bright red untuk buttons
          hover: "#FF6666",    // Hover state
          active: "#FF2222",   // Active state
        },
        neutral: {
          gray: "#9CA3AF",
          light: "#F5F5F5",
          dark: "#4B5563",
        },
        white: "#FFFFFF",
        black: "#000000",
        // Legacy colors untuk kompatibilitas
        blue: {
          50: "#FFE0E0",
          75: "#FF4444",
          100: "#FFFFFF",
          200: "#8B0000",
          300: "#DC143C",
        },
        violet: {
          300: "#8B0000",
        },
        yellow: {
          100: "#F5F5F5",
          300: "#DC143C",
        },
      },
    },
  },
  plugins: [],
};
