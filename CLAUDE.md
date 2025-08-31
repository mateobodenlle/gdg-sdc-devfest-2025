# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
yarn dev

# Build for production 
yarn build

# Start production server
yarn start

# Generate sitemap after build
yarn postbuild

# Add Apache license headers to source files
yarn license
```

## Architecture Overview

This is a **Next.js 13.4** TypeScript application for the DevFest Santiago de Compostela 2025 conference website. The architecture follows a modular, provider-based pattern for content management and data persistence.

### Content Management System (CMS) Architecture

The application uses a **provider pattern** for CMS integration (`lib/cms-api.ts`). It automatically detects and uses the configured CMS provider based on environment variables:

- **Agility CMS**: `AGILITY_GUID`, `AGILITY_API_FETCH_KEY`, `AGILITY_API_PREVIEW_KEY`
- **Contentful**: `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_SPACE_ID` 
- **DatoCMS**: `DATOCMS_READ_ONLY_API_TOKEN`
- **Storyblok**: `STORYBLOK_PREVIEW_TOKEN`
- **Prismic**: `PRISMIC_REPO_ID`
- **Strapi**: `STRAPI_API_URL`

All CMS providers implement the same interface with methods: `getAllSpeakers()`, `getAllStages()`, `getAllSponsors()`, `getAllJobs()`.

### Database Architecture

Similar provider pattern for data persistence (`lib/db-api.ts`):
- **Supabase**: Default database provider for user management and tickets
- **Redis**: Cache layer using `lib/redis.ts`

### Key TypeScript Types

Core domain types are defined in `lib/types.ts`:
- `Speaker`: Conference speakers with talks, bio, social links
- `Stage`: Live streaming stages with schedules and 100ms integration
- `Sponsor`: Partners with different tiers and marketing materials
- `Talk`: Conference sessions with timing and speaker assignments
- `ConfUser`: User accounts and ticket management
- `Job`: Job postings from sponsors

### Component Architecture

Components use **CSS Modules** (`.module.css`) for styling alongside **Tailwind CSS**. Key patterns:

- All components are in `/components` directory
- Import aliases configured: `@components/*`, `@lib/*`, `@styles/*`
- Custom Tailwind theme extends CSS custom properties for colors and spacing
- Layout component (`components/layout.tsx`) handles navigation and footer
- Mobile-first responsive design with dedicated mobile menu component

### Path Structure

- `/pages`: Next.js file-based routing
- `/pages/api`: API routes for GitHub OAuth, user registration, ticket generation
- `/pages/stage/[slug]`: Dynamic routes for live streaming stages
- `/pages/speakers/[slug]`: Dynamic speaker detail pages
- `/lib/hooks`: Custom React hooks
- `/public`: Static assets including Google Sans fonts
- `/styles`: Global CSS and component modules

### Key Features

- **Ticket System**: GitHub OAuth integration for personalized conference tickets
- **Live Streaming**: 100ms SDK integration for stage broadcasts
- **Image Optimization**: Next.js Image component with configured external domains
- **SEO**: Dynamic sitemap generation via `next-sitemap`
- **Analytics**: Google Analytics integration
- **Form Validation**: hCaptcha integration for form submissions

### Configuration Files

- `next.config.js`: Image domains, redirects (`/live` → Sessionize)
- `tsconfig.json`: Path aliases, strict TypeScript settings
- `tailwind.config.js`: Custom theme extending CSS custom properties
- `.eslintrc.json`: TypeScript ESLint with relaxed rules for development speed

### Environment Setup

The application requires environment variables for:
- CMS provider credentials (one of the supported providers)
- `NEXT_PUBLIC_SITE_ORIGIN`: Site URL for proper redirects
- Database connection strings for user/ticket management
- OAuth credentials for GitHub integration
- Analytics tracking IDs

### Development Notes

- Components follow functional React patterns with hooks
- All source files include Apache 2.0 license headers
- The site uses Spanish language content (`META_DESCRIPTION`, navigation)
- Some navigation items are commented out in `lib/constants.ts` (likely for pre-launch)
- Custom Google Sans font loading via Next.js font optimization