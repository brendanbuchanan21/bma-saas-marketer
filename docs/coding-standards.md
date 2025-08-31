# Coding Standards for BMA AI Content Automation

This document defines coding conventions and best practices for all code generated in this repository. Claude Code should always reference these standards when creating or modifying code.

---

## 1. General Principles
- Follow **clean code** principles: readable, maintainable, and self-documenting.
- Consistently use **English** for variable names, function names, and comments.
- Prefer **composition over inheritance** in code design.
- Avoid “magic numbers” or hardcoded strings; use constants or environment variables.


---

## 3. Naming Conventions
- **Variables & functions**: camelCase (`clientProfile`, `generatePost`)  
- **React Components & Classes**: PascalCase (`ClientProfileForm`)  
- **Files**: kebab-case (`client-profile-form.tsx`)  
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_POST_LENGTH`)  
- **Database tables/collections**: plural snake_case (`clients`, `posts`)  

---

## 4. Frontend (React/TypeScript)
- Always type props and state using TypeScript interfaces or types.
- Functional components only; use hooks instead of class components.
- Component files: one component per file.
- Styling: Tailwind CSS primarily; avoid inline styles unless dynamic.
- Use `useEffect` for side effects; cleanup effects properly.
- API calls should be centralized in `services/api.ts`.
- State management: use Context API or React Query for async data.
- Accessibility: semantic HTML, `alt` for images, `aria-label` for interactive elements.
- Error handling: show user-friendly error messages in UI.

---

## 5. Backend (Node.js/Express)
- Use ES Modules (`import/export`) consistently.
- Middleware for common tasks: logging, authentication, error handling.
- Routes: modular, one per resource (e.g., `clients.js`, `posts.js`).
- Controllers: handle requests, call services, return structured JSON:
```json
{
  "success": true,
  "data": {...},
  "error": null
}

