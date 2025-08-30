# Restaurant Menu Application

## Overview

This is a full-stack restaurant menu application built with a modern tech stack. The application displays an Italian restaurant's menu with cocktails, wines, beers, and snacks. It features a beautiful dark-themed UI with search functionality, category filtering, and responsive design. The frontend is built with React and shadcn/ui components, while the backend uses Express.js with in-memory storage for menu items.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom dark theme and Italian restaurant branding
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds

The frontend follows a component-based architecture with a clean separation of concerns:
- Components are organized into UI primitives and feature-specific components
- Custom hooks handle business logic and data fetching
- The application uses a single-page layout with smooth scrolling navigation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with endpoints for menu operations
- **Data Layer**: In-memory storage implementation with interface abstraction
- **Development**: Hot module replacement and error handling middleware

The backend uses a layered architecture:
- Routes layer handles HTTP requests and responses
- Storage layer abstracts data operations with a clean interface
- The storage interface allows for easy migration to database storage later

### Database Schema
The application defines a PostgreSQL-compatible schema using Drizzle ORM:
- **Menu Items**: Comprehensive schema with categories, pricing, dietary information, and metadata
- **Users**: Basic user authentication schema (prepared but not actively used)
- The schema supports complex menu data including allergens, dietary restrictions, preparation times, and alcohol content

### Styling and Design System
- **Theme**: Dark elegant theme with gold accents suitable for upscale restaurant branding
- **Typography**: Custom font stack with Playfair Display for headings and Inter for body text
- **Color Palette**: Neutral dark backgrounds with warm accent colors
- **Components**: Consistent design system with proper accessibility features

### Development and Build Process
- **Development**: Vite dev server with HMR and error overlay
- **Production**: Optimized builds with code splitting and asset optimization
- **TypeScript**: Strict type checking across the entire codebase
- **Path Aliases**: Clean import paths with @ aliases for better code organization

## External Dependencies

### Database and ORM
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **@neondatabase/serverless**: PostgreSQL database connector (configured but using in-memory storage)

### UI and Styling
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: Type-safe component variant management

### State Management and Data Fetching
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form handling with validation support

### Development Tools
- **Vite**: Build tool with plugins for React and development enhancements
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds

### Routing and Navigation
- **Wouter**: Lightweight client-side routing library

The application is designed with scalability in mind, using interfaces and abstractions that allow for easy migration from in-memory storage to a full database solution when needed.