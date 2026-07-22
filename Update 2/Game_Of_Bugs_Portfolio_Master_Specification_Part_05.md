# Game Of Bugs Portfolio v2
# Master Software Design Specification
# PART 05 — Development Guide & AI Implementation Rules

> Final implementation guide for developers and AI coding assistants.

---

# Purpose

This document defines how the project should be developed, structured,
maintained and deployed.

It is the implementation contract for the portfolio.

---

# IMPORTANT

## Existing UI Components

The source code for all selected UI components already exists inside the project.

DO NOT recreate them.

DO NOT search for alternative implementations.

Reuse them.

Refactor only when necessary.

Update only:

- Theme colors
- Typography
- Spacing
- Responsiveness
- Data binding

Preserve their interaction and animation quality.

---

# Tech Stack

Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

Backend
- Supabase

Hosting
- Vercel

---

# Recommended Folder Structure

src/
  assets/
  components/
    common/
    layout/
    ui/          <-- Existing UI components
    sections/
    admin/
  pages/
  hooks/
  services/
  lib/
  types/
  utils/
  constants/
  styles/

Keep feature code grouped logically.

---

# Component Hierarchy

App
 ├─ Layout
 │   ├─ Navbar
 │   ├─ Footer
 │   └─ ScrollToTop
 ├─ Hero
 │   ├─ UniverseCard
 │   ├─ Typewriter
 │   └─ Planet
 ├─ About
 ├─ FeaturedProjects
 ├─ Projects
 ├─ Skills
 ├─ Resume
 ├─ Reviews
 ├─ Contact
 └─ Admin

---

# Coding Standards

- Prefer functional components.
- Use TypeScript interfaces.
- Avoid duplicated logic.
- Keep components small.
- One responsibility per component.
- Services handle Supabase access.
- UI components never query the database directly.

---

# State Management

Local state:
React hooks.

Server state:
Supabase service layer.

Avoid prop drilling where possible.

---

# Animation Standards

Library:
Framer Motion.

Section reveal:
Fade + Slide.

Cards:
Small lift + rotate.

Buttons:
Scale to 1.03.

Duration:
300–600ms.

Do not over-animate.

---

# Responsive Breakpoints

Mobile:
<768px

Tablet:
768–1023px

Desktop:
1024px+

Large Desktop:
1440px+

Maintain consistent spacing across breakpoints.

---

# Design Tokens

Background:
Dark

Accent:
Orange

Radius:
Consistent across cards.

Shadow:
Soft orange glow only for emphasis.

Glass:
Use sparingly.

---

# SEO

Unique title.

Meta description.

Open Graph image.

Twitter cards.

Sitemap.

Robots.

Structured data (future).

---

# Accessibility

Keyboard navigation.

Visible focus states.

Alt text.

ARIA labels.

Color contrast.

Reduced motion support.

---

# Performance

Lazy load large sections.

Code splitting.

Compress images.

Use modern formats.

Avoid unnecessary re-renders.

Memoize expensive calculations.

---

# Error Handling

Loading state.

Empty state.

Network error.

404 page.

Graceful fallbacks.

---

# Deployment

GitHub
  ↓
Vercel
  ↓
Environment Variables
  ↓
Supabase

Never commit secrets.

---

# Versioning

Use semantic versioning.

v1.0.0

Major:
Breaking UI changes.

Minor:
Features.

Patch:
Bug fixes.

---

# Future Roadmap

Blog

Timeline

Achievements

Certificates

Devlogs

Search

Theme customization (if ever required)

Multi-language support

---

# AI IMPLEMENTATION CONTRACT

AI assistants (Gemini, Copilot, Claude, Cursor, ChatGPT) must follow these rules:

1. Respect Parts 01–05.
2. Never recreate the existing UI components.
3. Use the UI component source code already present in the project.
4. Restyle components to match the orange/black Game Of Bugs theme.
5. Bind dynamic content to Supabase.
6. Keep admin editable wherever specified.
7. Reuse existing project modal for project details.
8. Maintain responsive layouts.
9. Preserve smooth animations.
10. Avoid introducing new design systems.

---

# Development Checklist

Phase 1
- Project setup
- Theme
- Routing
- Layout

Phase 2
- Hero
- About
- Projects
- Skills

Phase 3
- Resume
- Reviews
- Contact

Phase 4
- Admin Panel
- CRUD
- Analytics

Phase 5
- Optimization
- Testing
- SEO
- Deployment

---

# Completion Criteria

The portfolio is complete only when:

- Public website matches this specification.
- Admin panel controls all editable content.
- Supabase stores all dynamic data.
- Existing UI components are reused and themed.
- Performance and accessibility targets are met.
- The project is production-ready.
