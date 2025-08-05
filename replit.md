# Replit.md

## Overview

This is a modern developer portfolio website built with React, TypeScript, and advanced animation libraries. The application features a futuristic design aesthetic with smooth animations, glassmorphic UI elements, and 3D integrations. It showcases a developer's projects, skills, and contact information through an immersive, premium web experience.

The portfolio includes sections for hero/landing, about, projects, and contact, all enhanced with GSAP animations, Locomotive Scroll for smooth parallax effects, and Spline for 3D elements. The design emphasizes a dark theme with neon accents and floating background elements to create a cutting-edge visual experience.

## Recent Changes

**Migration to Replit Environment Completed (January 5, 2025)**
- Successfully migrated project from Replit Agent to standard Replit environment
- Installed all required Node.js dependencies including Express, React, TypeScript, and animation libraries
- Resolved all TypeScript compilation errors and LSP diagnostics
- Verified full-stack application is running properly on port 5000
- Updated Online Reservation System project with GitHub download link: https://github.com/prince62058/Online-Reservation-Using-JDBC-IN-JAVA.git

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

**Frontend Architecture**
- **React with TypeScript**: Component-based architecture using functional components and hooks
- **Vite Build System**: Fast development server and optimized production builds
- **ShadCN UI Components**: Pre-built, accessible UI components with Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens for futuristic theming
- **Wouter Router**: Lightweight client-side routing solution

**Animation & Interaction Layer**
- **GSAP (GreenSock)**: Professional-grade animation library for complex timeline animations
- **Locomotive Scroll**: Smooth scrolling and parallax effects for enhanced user experience
- **Spline 3D Integration**: Embedded 3D elements in hero section via iframe
- **Custom Animation System**: Centralized animation management with scroll triggers and loading sequences

**State Management**
- **React Query (TanStack Query)**: Server state management and caching
- **React Hook Form**: Form state management with Zod validation
- **Local Component State**: useState and useRef for component-level state

**Styling & Design System**
- **CSS Custom Properties**: Dynamic theming with CSS variables for colors and spacing
- **Glassmorphic Design**: Semi-transparent backgrounds with backdrop blur effects
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Dark Theme**: Primary dark theme with neon accent colors (blue, cyan, purple)

**Backend Architecture**
- **Express.js Server**: RESTful API server with middleware support
- **Drizzle ORM**: Type-safe database queries with PostgreSQL
- **Memory Storage**: In-memory data storage for development (IStorage interface for extensibility)
- **Session Management**: Session handling with connect-pg-simple

**Development Workflow**
- **TypeScript Configuration**: Strict type checking with path aliases for clean imports
- **ESM Modules**: Modern JavaScript module system throughout the stack
- **Development Server**: Hot module replacement with Vite integration
- **Build Process**: Production optimization with code splitting and asset bundling

## External Dependencies

**Animation Libraries**
- GSAP with ScrollTrigger plugin for advanced animations
- Locomotive Scroll for smooth scrolling and parallax effects
- Spline (via iframe) for 3D graphics integration

**UI Framework & Components**
- Radix UI primitives for accessible component foundations
- Phosphor Icons for consistent iconography
- Inter font family for modern typography

**Database & Storage**
- PostgreSQL with Neon Database serverless integration
- Drizzle ORM for type-safe database operations
- Connect-pg-simple for PostgreSQL session storage

**Development Tools**
- Vite with React plugin for fast development builds
- Replit-specific plugins for cartographer and runtime error handling
- ESBuild for production server bundling

**Styling Dependencies**
- Tailwind CSS with PostCSS for utility-first styling
- Class Variance Authority for component variant management
- clsx and tailwind-merge for conditional class handling

**Form & Validation**
- React Hook Form with Hookform resolvers
- Zod schema validation
- Drizzle-Zod integration for database schema validation