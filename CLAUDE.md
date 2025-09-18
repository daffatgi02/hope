# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite project for an "awwwards-website" - a modern, animated web application built with GSAP animations, Tailwind CSS styling, and component-based architecture.

## Development Commands

- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
dont run commands npm run dev or preview.

## Tech Stack & Key Dependencies

- **React 18** with Vite as build tool
- **GSAP** (@gsap/react) for animations and ScrollTrigger
- **Tailwind CSS** for styling with custom design system
- **ESLint** with React, React Hooks, and Tailwind plugins

## Architecture

### Component Structure
The app follows a single-page layout with main sections as components:
- `App.jsx` - Main layout container with section components
- `NavBar` - Navigation header
- `Hero` - Landing section with video and GSAP animations
- `About`, `Features`, `Story` - Content sections
- `Contact`, `Footer` - Bottom sections
- `AnimatedTitle` - Reusable animated text component
- `VideoPreview`, `Button` - UI components

### Styling System
- Custom Tailwind config with blue-themed color palette
- Primary colors: `#0094FF` (primary blue), `#4CC9F0` (light), `#0A192F` (dark navy)
- Custom fonts: General Sans (main), plus circular-web, zentry, robert variants
- Font assets stored in `/public/fonts/`

### Animation Architecture
- GSAP with ScrollTrigger for scroll-based animations
- Hero component uses complex GSAP animations with video masks
- AnimatedTitle component provides reusable text animations
- useGSAP hook for React integration

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