# Replit.md

## Overview

This is a modern developer portfolio website built with React, TypeScript, and advanced animation libraries. The application features a futuristic design aesthetic with smooth animations, glassmorphic UI elements, and 3D integrations. It showcases a developer's projects, skills, and contact information through an immersive, premium web experience.

The portfolio includes sections for hero/landing, about, projects, and contact, all enhanced with GSAP animations, Locomotive Scroll for smooth parallax effects, and Spline for 3D elements. The design emphasizes a dark theme with neon accents and floating background elements to create a cutting-edge visual experience.

## Recent Changes

**MongoDB Database Integration (January 5, 2025)**
- Successfully connected to MongoDB Atlas with corrected authentication credentials
- Implemented complete MongoDB database integration for production-ready data storage
- Created MongoDB schemas and storage layer with proper indexing and optimization
- Added comprehensive API endpoints for CRUD operations with pagination support
- Built admin database management interface at /database route for monitoring submissions
- Verified database connectivity with mongoose connection testing
- Enhanced contact form system with robust database persistence and Nodemailer email notifications
- Configured Gmail SMTP integration for sending contact form submissions to princekumar5252@gmail.com
- Added database status monitoring and real-time connection health checks
- Populated database with 5 sample contact form submissions for testing

**Contact Form Database Integration & Responsive Design (January 5, 2025)**
- Implemented complete contact form with database storage for visitor submissions
- Added MongoDB-compatible schema for storing contact form data (name, email, subject, message, timestamp)
- Integrated SendGrid email notifications for all form submissions
- Created admin panel at /admin route to view and manage contact submissions
- Enhanced responsive design across all components for mobile, tablet, and desktop
- Added proper form validation using Zod schemas and error handling
- Implemented loading states and success/error feedback for better UX

**Complete GSAP Animation System Implementation (January 5, 2025)**
- Implemented comprehensive GSAP scroll animations throughout entire portfolio
- Added smooth scroll navigation with professional easing transitions
- Created scroll-triggered animations for all sections (Hero, About, Tech Stack, Education, Projects, Contact)
- Enhanced footer with professional branding: "Computer Science Engineering Student | AI & ML Enthusiast"
- Added complete social media integration (GitHub, LinkedIn, Email, Phone) in footer
- Implemented parallax effects for background elements and interactive hover animations
- Added "Built with passion and ❤️" footer message matching reference site design

**Migration to Replit Environment Re-verified (August 6, 2025)**
- Successfully re-verified project migration from Replit Agent to standard Replit environment
- Resolved tsx dependency issue by installing missing tsx package
- Confirmed full-stack application running properly on port 5000 with Express server
- Verified all TypeScript compilation with no LSP diagnostics errors
- All portfolio features confirmed operational: animations, contact form, database integration
- Vite development server connected and running smoothly
- Project ready for continued development and deployment

**Migration to Replit Environment Completed (January 5, 2025)**
- Successfully migrated project from Replit Agent to standard Replit environment
- Installed all required Node.js dependencies including Express, React, TypeScript, and animation libraries
- Resolved all TypeScript compilation errors and LSP diagnostics
- Verified full-stack application is running properly on port 5000
- Configured email functionality with Gmail SMTP and SendGrid integration
- Tested contact form with successful email delivery and database storage
- All portfolio features operational: animations, contact form, database integration
- Updated Online Reservation System project with GitHub download link: https://github.com/prince62058/Online-Reservation-Using-JDBC-IN-JAVA.git

**Resume Database Integration & Download Feature (August 5, 2025)**
- Successfully implemented MongoDB resume storage with Binary data handling
- Created comprehensive API endpoints for resume upload, download, and info retrieval
- Fixed MongoDB Binary object conversion issues for proper PDF file extraction
- Added resume download functionality to Hero section with direct database connection
- **UPDATED**: Uploaded Prince Kumar's latest resume (298,754 bytes) to MongoDB with proper indexing
- Added resume update API endpoint for seamless content management
- Tested and verified PDF download works correctly with proper file format preservation
- Enhanced portfolio with professional resume download capability and update system

**Portfolio Branding & Visual Enhancement (August 5, 2025)**
- Created custom futuristic favicon with "P" logo in brand gradient colors (blue-cyan-purple)
- Added SVG favicon with glassmorphic design aesthetic matching portfolio theme
- Implemented responsive favicon for various device types and sizes
- Enhanced brand consistency across all visual elements of the portfolio

**Render Full-Stack Deployment Configuration (August 5, 2025)**
- Updated render.yaml for proper Node.js full-stack deployment
- Configured Gmail SMTP integration for production email delivery  
- Created comprehensive deployment guides in English and Hindi
- Set up proper environment variables: GMAIL_USER, GMAIL_PASS, MONGODB_URI
- Configured production server with port 10000 for Render compatibility
- Tested email functionality with direct Gmail delivery in development
- Ready for one-click Render deployment with full email and database features

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
- MongoDB with native Node.js driver for document-based storage
- Custom storage abstraction layer with fallback to in-memory storage
- Comprehensive CRUD operations with pagination and indexing
- PostgreSQL support maintained for compatibility (Drizzle ORM)

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