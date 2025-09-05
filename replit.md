# Deeds Without Debt Newsletter Site

## Overview

This is a newsletter website for "Deeds Without Debt," focused on alternative real estate investing strategies including tax deeds, tax liens, HOA foreclosures, and probate deals. The site serves as both a content platform and newsletter subscription service, built as a fast, production-ready web application with modern technologies.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for brand theming
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **State Management**: React Query (TanStack Query) for server state management
- **Typography**: Google Fonts integration with DM Serif Text, Nunito Sans, and Montserrat

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Architecture Pattern**: Monorepo structure with shared types and schemas
- **Development Setup**: Hot module replacement with Vite middleware integration
- **Error Handling**: Centralized error handling with request/response logging
- **Static Serving**: Development mode uses Vite middleware, production serves static files

### Data Management
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Shared schema definitions between client and server
- **Migrations**: Drizzle Kit for database migrations and schema management
- **Content Strategy**: Currently uses static content with markdown-like structure, designed for future CMS integration

### Design System
- **Brand Colors**: Custom palette with forest green primary (#1B4332), cream background (#F5F5F0), and sage accents (#A3B18A)
- **Component Library**: Comprehensive UI component system with consistent theming
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Built with WCAG AA compliance in mind using Radix UI primitives

### Content Architecture
- **Content Type**: Newsletter-style articles with metadata (tags, categories, dates)
- **SEO Optimization**: Comprehensive meta tags, Open Graph, Twitter Cards, and JSON-LD schema
- **Performance**: Optimized images, lazy loading, and minimal JavaScript bundles
- **Newsletter Integration**: Form submission ready for external newsletter services

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management and caching
- **express**: Node.js web framework for API endpoints

### UI and Styling
- **@radix-ui/***: Accessible UI primitive components (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for building variant-based component APIs
- **embla-carousel-react**: Carousel component for content display

### Development Tools
- **vite**: Build tool and development server
- **@vitejs/plugin-react**: React plugin for Vite
- **tsx**: TypeScript execution environment for Node.js
- **esbuild**: JavaScript bundler for production builds

### Newsletter Service Integration
- Ready for integration with services like Beehiiv, ConvertKit, or Mailchimp
- Environment variable configuration for newsletter action URLs
- Form submission handling with error management and user feedback

### SEO and Analytics
- Structured data markup for search engines
- Open Graph and Twitter Card meta tags
- RSS feed preparation for content syndication
- Google Fonts preloading for performance optimization