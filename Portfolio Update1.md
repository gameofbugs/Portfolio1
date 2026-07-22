# Game Of Bugs Portfolio v2 - Master Specification

> Version: 2.0 Tech Stack: React + TypeScript + Vite + Tailwind CSS +
> Supabase + Framer Motion

## Vision

Build a premium, cinematic, database-driven portfolio for **Game Of
Bugs**. The website should feel like an indie game studio rather than a
traditional resume site. Every interaction should support the
orange/black design language.

## Core Principles

-   Dark theme only (no light mode)
-   Orange accent matching the existing website
-   Smooth 60 FPS animations
-   Responsive desktop/tablet/mobile
-   Most content fetched from Supabase
-   Admin panel controls almost everything
-   Reuse existing project architecture whenever possible

------------------------------------------------------------------------

# IMPORTANT

The project already contains the source code for all selected UI
components.

**Do not recreate these components.** Reuse the existing source code
from the project folder, refactor them to match the existing
React/TypeScript architecture, and restyle them to the orange/black Game
Of Bugs theme.

## UI Components

1.  Universe 3D Card
2.  Typewriter
3.  Resume Outline Button
4.  Social Circle Menu
5.  Flip Card
6.  Glass Stack Cards
7.  Bottom Glass Navigation
8.  Scroll To Top Button
9.  Orange Block Loader
10. Game Cartridge Card

Every component must: - Match the portfolio color palette. - Share
common spacing, shadows, border radius and animation timing. - Avoid
looking like imported demos.

# Website Structure

1.  Loader
2.  Navbar
3.  Hero
4.  About
5.  Featured Projects
6.  My Projects
7.  Skills
8.  Resume Preview
9.  Reviews (toggleable)
10. Contact
11. Footer

# Hero

Use Universe 3D Card as the centerpiece.

Inside card: - Avatar - Name - Role - Availability - Years Experience -
Project Count

Only these values are shown.

Beside the card, use the Typewriter component.

Loop forever:

-   Unity Gameplay Programmer
-   Indie Game Developer
-   Problem Solver
-   Game Of Bugs
-   Building Interactive Experiences

# Navigation

Desktop: Top navigation.

Mobile: Bottom Glass Navigation.

No light/dark switch.

# Projects

Two sections.

## Featured Projects

Chosen manually from Admin.

Horizontal cards.

## My Projects

Fetched from database.

Horizontal scroll.

Opening a project displays the existing project detail modal.

# Skills

Fetched from database.

Each skill contains: - Logo - Name

No ratings or percentages.

Reveal animation: Staggered slide-up with fade.

# Resume

Resume button opens preview modal.

Inside modal: - Preview PDF - Download button

Resume editable from Admin.

# Reviews

Admin can enable/disable.

Supports: - Text reviews - Image reviews - Rating - Name - Designation

# Contact

Contains: - Contact Form - Social Links

Store submissions in Supabase and send email notification.

Messages visible inside Admin.

# Analytics Dashboard

Admin dashboard displays:

-   Visitors Today
-   Portfolio Views
-   Resume Opens
-   Resume Downloads
-   Project Clicks
-   Contact Form Submissions

# Admin Panel

Editable:

-   Hero
-   Avatar
-   Name
-   Role
-   Availability
-   Years
-   Resume
-   Projects
-   Featured toggle
-   Skills
-   Reviews
-   Social links
-   Contact details
-   Contact messages
-   Review toggle

# Theme

Background: Near black.

Accent: Orange.

Glassmorphism throughout.

Animations: Framer Motion.

# Performance

-   Lazy load heavy sections.
-   Optimize images.
-   Respect reduced motion when appropriate.
-   Maintain smooth scrolling.

# Database

Supabase stores:

-   profile
-   projects
-   skills
-   reviews
-   social_links
-   contact_messages
-   analytics
-   settings

# Final Goal

Create a portfolio that feels like a premium indie game studio website
rather than a resume, while remaining fully editable through an admin
panel and powered primarily by Supabase.
