# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SaaS platform for automating daily blog posting and content distribution for client businesses. The system generates AI-powered content and automatically publishes it to WordPress and LinkedIn.

## Architecture Goals

The planned architecture consists of:

- **Frontend/UI**: Dashboard for admins and clients to manage profiles, review scheduled posts, and view published content
- **Backend**: Node.js/Express server handling API calls, user authentication, and task scheduling
- **Database**: PostgreSQL or MongoDB to store client profiles, API keys, schedules, and generated content
- **AI Pipeline**: OpenAI (or other LLM API) integration for content generation
- **Scheduler**: Automated daily content generation and publishing jobs using cron jobs or queue system
- **Integrations**: WordPress REST API and LinkedIn API

## Key Features to Implement

- Business Input Profile system for client context (services, niche, industry, values, keywords)
- AI content generation for blog posts, social posts, and SEO-optimized content
- Automated scheduling for daily publishing (7 days/week)
- WordPress integration via secure API plugin
- LinkedIn integration for automated posting
- SEO optimization with metadata, titles, keywords, and formatting

## Development Status

### Frontend (Completed)
- React/TypeScript application built with Vite
- Tailwind CSS for styling with clean white/blue design theme
- Three main components: Dashboard, Client Profile Management, Content Schedule
- Responsive design with modern UI components
- Mock data for demonstration purposes

### Development Commands
```bash
cd frontend
npm install      # Install dependencies
npm run dev     # Start development server (usually http://localhost:5173 or 5174)
npm run build   # Build for production
npm run preview # Preview production build
```

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Not yet implemented (planned: Node.js/Express)
- **Database**: Not yet implemented (planned: PostgreSQL or MongoDB)

## Future Extensions

- Additional platform support (Instagram, Facebook, X/Twitter)
- Content performance analytics and reporting
- Multi-language support
- Custom tone/style fine-tuning



## Reference Documents
Claude Code should always reference the following docs when generating code:
- /docs/coding-standards.md
- /docs/api-design.md

- /docs/frontend-guidelines.md
- /docs/ai-pipeline.md

