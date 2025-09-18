# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite project for an "awwwards-website" - a modern, animated web application built with GSAP animations, Tailwind CSS styling, and component-based architecture.

## Development Commands

- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
- `npm run serve` - Build and serve production preview
- Do not run `npm run dev` or `npm run preview` commands directly

## Tech Stack & Key Dependencies

- **React 18** with Vite as build tool
- **GSAP** (@gsap/react) for animations and ScrollTrigger
- **Tailwind CSS** for styling with custom design system
- **ESLint** with React, React Hooks, and Tailwind plugins
- **Prettier** for code formatting
- **Additional utilities**: clsx for conditional classes, react-icons for icons, react-use for hooks

## Architecture

### Component Structure
The app follows a single-page layout with main sections as components:
- `App.jsx` - Main layout container with section components
- `NavBar` - Navigation header
- `Hero` - Landing section with video and GSAP animations
- `About`, `Features`, `Story`, `Leaders` - Content sections
- `Contact`, `Footer` - Bottom sections
- `AnimatedTitle` - Reusable animated text component with scroll-triggered animations
- `VideoPreview`, `Button` - UI components

### Styling System
- Custom Tailwind config with red-themed color palette
- Primary colors: `#8B0000` (main brand red), `#A50000` (lighter red), `#660000` (darker red), `#4D0000` (darkest red)
- Secondary colors: `#DC143C` (crimson), `#FF1744` (bright red), `#B71C1C` (dark crimson)
- Background gradient: `linear-gradient(135deg, #8B0000 0%, #660000 50%, #4D0000 100%)`
- Custom fonts: General Sans (main), plus circular-web, zentry, robert variants
- Font assets stored in `/public/fonts/`

### Animation Architecture
- GSAP with ScrollTrigger for scroll-based animations
- Hero component uses complex GSAP animations with video masks and mouse parallax effects
- AnimatedTitle component provides reusable text animations that trigger on scroll (words animate in with opacity and 3D transforms)
- useGSAP hook for React integration and proper cleanup
- Animation patterns: scroll-triggered reveals, parallax mouse tracking, staggered text animations

## Build Configuration

- **Vite** with React plugin
- **Base path**: `./` for relative asset paths (supports file:// protocol)
- **ESLint**: Flat config with React, hooks, and Tailwind rules
- **PostCSS**: Autoprefixer for browser compatibility

## File Structure Notes

- Components in `/src/components/`
- Main styles in `/src/index.css` with Tailwind imports
- Video assets expected in `/public/videos/`
- Font assets in `/public/fonts/`