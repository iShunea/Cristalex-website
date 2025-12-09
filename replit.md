# Cristalexdent - Dental Clinic Website

## Overview

Cristalexdent is a modern dental clinic website built as a full-stack web application. The project provides a complete online presence for a dental practice, featuring service information, team profiles, blog posts, testimonials, and online booking integration. It's designed to be deployed on serverless platforms like Vercel while maintaining flexibility for traditional hosting.

The application serves as a marketing and information platform for potential patients, allowing them to learn about services, read educational content, view team credentials, and book appointments through an integrated third-party booking system.

## Recent Changes

**November 26, 2024 - Fresh Medical Design Overhaul:**
- **Color Scheme Pivot:** Transitioned from saturated red brandbook (#b60202, #df0101) to fresh, light medical aesthetic with turquoise/soft blue palette (Primary #48C9B0, Secondary #36B39A, Accent #6EC1E4)
- **Hero Section:** Updated to bright, welcoming design with white/light gradients, increased image opacity (50%), and turquoise accent colors
- **Footer Redesign:** Changed from dark gray-900 to light gradient background (from-primary/5 via-white to-accent/5) with modern social icons
- **Layout Reorganization:** Moved Before/After section below Services for better flow; added inline booking form after Before/After for higher conversion
- **Typography Adjustments:** Reduced title font sizes (text-4xl → text-3xl) for better proportions
- **Background Gradients:** Applied soft turquoise/blue gradients to key sections (Features, Inline Booking) for cohesive fresh aesthetic
- **Button Uniformity:** All buttons now use turquoise primary color with modern rounded corners and shadows
- **Stats Banner:** Updated to turquoise gradient (from-primary via-secondary to-accent) replacing dark slate background

## User Preferences

Preferred communication style: Simple, everyday language.
Design preference: Fresh, light, medical aesthetic with turquoise/soft blue color palette (avoiding saturated reds)

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- **Vite** serves as the build tool and development server, configured for React with TypeScript
- **React 18** powers the UI with functional components and hooks
- **Wouter** provides lightweight client-side routing (alternative to React Router)
- **TanStack Query (React Query)** handles server state management, data fetching, and caching

**UI Component System:**
- **Shadcn/ui** component library with Radix UI primitives for accessibility
- **Tailwind CSS v4** for styling with custom design tokens
- **Class Variance Authority (CVA)** for type-safe component variant management
- Custom design system with "New York" style preset

**Internationalization:**
- **i18next** provides multi-language support (Romanian/Russian)
- Translation keys organized by feature area (nav, hero, contact, services, etc.)

**State Management:**
- Server state: TanStack Query with custom query functions
- Local state: React hooks (useState, useEffect)
- Form state: React Hook Form with Zod validation

### Backend Architecture

**Development vs Production:**
The application uses two distinct server entry points:
- **Development (`index-dev.ts`)**: Integrates Vite middleware for HMR and SSR-like template rendering
- **Production (`index-prod.ts`)**: Serves static files from the build directory

**API Layer:**
- **Express.js** REST API with route handlers in `server/routes.ts`
- CRUD endpoints for blog posts, team members, testimonials, and services
- Custom middleware for request logging and JSON body parsing with raw body preservation
- Raw body capture for webhook verification scenarios

**Storage Abstraction:**
The `IStorage` interface defines all data access methods, allowing for multiple implementations:
- In-memory storage (fallback)
- MongoDB storage (primary, with graceful degradation)
- PostgreSQL with Drizzle ORM (schema defined but not fully implemented)

**Database Schema (Drizzle/PostgreSQL):**
```
- users (authentication)
- blog_posts (content management)
- team_members (staff profiles)
- testimonials (customer reviews with active/inactive flag)
- services (service catalog)
```

Each table uses serial IDs, timestamps, and appropriate data types. Drizzle-Zod generates TypeScript types and validation schemas.

### Data Storage Solutions

**Primary Database Options:**

1. **MongoDB (Currently Active):**
   - Mongoose ODM with schema definitions in `server/db/models.ts`
   - Connection pooling for serverless environments
   - Graceful degradation when MongoDB URI is not configured
   - Cached connection pattern to reuse database connections across serverless function invocations

2. **PostgreSQL (Configured but Optional):**
   - Drizzle ORM with schema in `shared/schema.ts`
   - Neon Database serverless driver
   - Migration system via `drizzle-kit`
   - Session store via `connect-pg-simple`

**Design Decision:**
The dual-database approach allows deployment flexibility. MongoDB is currently active (as seen in `api/index.js` for Vercel), while PostgreSQL schema exists for future migration or local development. The storage interface pattern makes switching between implementations straightforward.

### Authentication & Authorization

**Current State:**
- User schema exists with username/password fields
- Session management infrastructure present (connect-pg-simple)
- No active authentication endpoints or middleware implemented
- Intended for future admin panel functionality

**Rationale:**
Public-facing dental clinic websites typically don't require user authentication. The schema suggests future plans for a protected admin area to manage content.

### External Dependencies

**Third-Party Services:**

1. **BusinessDent Online Booking:**
   - Embedded iframe integration (`my.businessdent.md`)
   - Sandboxed for security
   - Institution ID: 1718966
   - Used for appointment scheduling

2. **Google Fonts:**
   - Onest font family (weights 100-900)
   - Preconnect optimization for performance

**Database Providers:**

1. **MongoDB Atlas:**
   - Cloud-hosted MongoDB
   - Configured via `MONGODB_URI` environment variable
   - Whitelist all IPs (0.0.0.0/0) for serverless functions
   - Connection string format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

2. **Neon Database (Optional):**
   - Serverless PostgreSQL
   - Configured via `DATABASE_URL` environment variable
   - Used with Drizzle ORM

**Deployment Platforms:**

1. **Vercel (Primary):**
   - Serverless function deployment
   - Custom `vercel.json` configuration
   - API routes proxied to `/api/index.js`
   - Static file serving from `dist/public`
   - Build command: `npm run build`
   - Output directory: `dist/public`

**Development Tools:**

1. **Replit:**
   - Custom Vite plugins for development environment
   - Cartographer and dev banner plugins
   - Runtime error modal overlay

**UI Component Dependencies:**

1. **Radix UI:**
   - Extensive use of headless UI components (20+ primitives)
   - Accessibility-compliant components
   - Dialog, dropdown, accordion, carousel, etc.

2. **Lucide Icons:**
   - Icon library for UI elements
   - Tree-shakeable for optimal bundle size

**Form & Validation:**

1. **React Hook Form:**
   - Form state management
   - Performance-optimized with minimal re-renders

2. **Zod:**
   - Runtime type validation
   - Schema generation via drizzle-zod
   - Resolver integration with React Hook Form

**Build & Development:**

1. **TypeScript:**
   - Strict mode enabled
   - Path aliases for cleaner imports (@/, @shared/, @assets/)
   - ESNext module system

2. **ESBuild:**
   - Production server bundling
   - Fast builds with minimal configuration

3. **PostCSS + Autoprefixer:**
   - CSS processing pipeline
   - Browser compatibility for Tailwind

**Key Architectural Decisions:**

- **Monorepo Structure:** Client, server, and shared code in a single repository with clear separation
- **API Versioning:** Not implemented; single API version at `/api/*`
- **Error Handling:** Graceful degradation when database unavailable (returns empty arrays)
- **Build Strategy:** Separate client (Vite) and server (ESBuild) builds, combined in production
- **Static Asset Strategy:** Assets in `attached_assets` directory, accessed via alias
- **Styling Approach:** Utility-first CSS with Tailwind, component variants via CVA
- **Type Safety:** End-to-end TypeScript with shared types between client and server