# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Project Overview

This is a modern web application for exploring Douliu Old Town (斗六舊城漫遊), built with **Node.js + Express + React + TypeScript**. The app serves as an interactive guide with audio narration and extended reading features for local food, culture, and shopping locations.

## 📦 Technology Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Content Processing**: gray-matter (YAML frontmatter) + marked (Markdown to HTML)
- **Security**: helmet, cors
- **Development**: tsx (TypeScript execution), concurrently

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS 3
- **Icons**: Font Awesome 6
- **PWA**: Service Worker + Web App Manifest

### Code Quality
- **Linter**: ESLint with TypeScript support
- **Formatter**: Prettier
- **Type Checking**: TypeScript 5.3

## 🛠 Development Commands

### Initial Setup
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Development
```bash
# Start both frontend and backend concurrently
npm run dev

# Start backend only (http://localhost:5000)
npm run dev:server

# Start frontend only (http://localhost:3000)
npm run dev:client
```

### Build & Production
```bash
# Build for production
npm run build

# Start production server
npm start

# Preview production build
npm run preview
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## 🏗 Architecture Overview

This is a full-stack TypeScript application with Express.js backend and React frontend. All location content is stored in Markdown files with YAML frontmatter for easy content management.

### Key Features

- **Audio Player**: Custom player with progress bar and seeking
- **Lazy Loading**: Images load only when visible
- **PWA Support**: Offline functionality and installable
- **Responsive Design**: Mobile-first approach
- **TypeScript**: Full type safety across frontend and backend

## 📝 Quick Start

```bash
npm install
npm run dev
```

Visit http://localhost:3000 for the app, backend API runs on http://localhost:5000

## 🔄 Migration Notes

Modernized from Flask (Python) to Node.js + React for better performance, type safety, and developer experience.
