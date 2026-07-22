# Game Of Bugs Portfolio v2 - Master Software Design Specification (Part 01)

This is Part 01 of the master specification.

## IMPORTANT
All selected UI component source code already exists inside the project folder.

Do NOT recreate them.
Reuse, refactor and restyle them to match the existing orange/black Game Of Bugs theme.

Components:
1. Universe 3D Card
2. Typewriter
3. Resume Outline Button
4. Social Circle Menu
5. Flip Card
6. Glass Stack Cards
7. Bottom Glass Navigation
8. Scroll To Top Button
9. Orange Block Loader
10. Game Cartridge Card

# Hero
Layout:
[ Universe Card ]   [ Typewriter ]   [ Decorative Planet ]

Universe Card contains only:
- Avatar
- Name
- Role
- Availability
- Years
- Projects

These values are fetched from Supabase.

Typewriter loops forever with developer roles.

# Projects
Featured Projects (admin controlled)
My Projects (database driven)

Display as horizontal scrolling cards.
Use Flip Card component.
Open existing project modal on click.

# Skills
Database driven.
Only icon + name.
Use Glass Stack styling.
Reveal with staggered animation.

# Resume
Preview modal first.
Download button inside preview.

# Reviews
Enable/Disable from admin.
Supports text or image reviews.

# Contact
Contact form + social links.
Save to Supabase.
Send email.
Visible in admin.

# Admin
Editable:
Hero
Projects
Featured toggle
Skills
Resume
Reviews
Social Links
Messages
Availability
Analytics

Analytics:
- Visitors Today
- Portfolio Views
- Resume Opens
- Resume Downloads
- Project Clicks
- Contact Form Submissions

# AI Rules
Never recreate UI components.
Reuse source code already present in project.
Match spacing, colors, typography and animations with existing website.
