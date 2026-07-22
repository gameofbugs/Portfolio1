# Game Of Bugs Portfolio v2
# Master Software Design Specification
# PART 06 — UI/UX Blueprint & Visual Layout Bible

> This document defines the visual composition of every public section.
> It complements Parts 01–05.

---

# GLOBAL RULE

## IMPORTANT

All 10 selected UI component source codes already exist inside the project.

**DO NOT recreate any UI component.**

Always:

- Reuse existing component.
- Refactor if necessary.
- Convert styling to Game Of Bugs design language.
- Preserve original interaction quality.
- Replace placeholder content with Supabase data.

---

# DESIGN GRID

Desktop
- Max Width: 1320px
- Horizontal Padding: 48px
- Section Gap: 140px
- Card Gap: 24px

Tablet
- Max Width: 960px
- Padding: 32px

Mobile
- Width: 100%
- Padding: 20px

---

# HERO WIREFRAME

+--------------------------------------------------------------------------------+
| NAVBAR                                                                         |
+--------------------------------------------------------------------------------+
|                                                                                |
| [ Universe 3D Card ]   [ Typewriter + CTA ]   [ Rotating Planet ]             |
|                                                                                |
|                                                                                |
+--------------------------------------------------------------------------------+

Universe Card:
- Left aligned
- Width ~420px
- Uses Universe 3D component
- Database fields only:
  Avatar, Name, Role, Availability, Years, Projects

Typewriter:
- Center aligned vertically
- Infinite loop
- Resume Preview button below
- View Projects button beside Resume

Planet:
- Existing portfolio planet
- Slow rotation
- Mouse parallax
- Decorative only

Animation Order:
1. Loader
2. Navbar
3. Universe Card
4. Typewriter
5. CTA Buttons
6. Planet

---

# ABOUT WIREFRAME

+--------------------------------------------------------------+
| Terminal Story                     Developer Illustration     |
+--------------------------------------------------------------+
| Performance | System Thinking | Always Learning               |
+--------------------------------------------------------------+

Cards animate upward on scroll.

---

# FEATURED PROJECTS

Title
Subtitle

< Horizontal Scroll >

[ Flip Card ][ Flip Card ][ Flip Card ][ Flip Card ]

Use existing Flip Card component.

Front:
- Thumbnail
- Project Name

Back:
- Short Description
- Tech Stack
- GitHub
- itch.io
- Case Study

Admin decides featured projects.

---

# MY PROJECTS

Same card style.

Unlimited projects.

Loaded from Supabase.

Horizontal scroll with drag support.

Existing modal reused.

---

# SKILLS

Glass Stack Card styling.

Logo + Name only.

Reveal:
One card after another.

Grid:
Desktop: 6 columns
Tablet: 4 columns
Mobile: horizontal scroll.

---

# RESUME

Centered section.

Resume Outline Button.

Click opens modal.

Modal:
+----------------------------------+
| PDF Preview                      |
|                                  |
| [ Download Resume ]              |
+----------------------------------+

---

# REVIEWS

If disabled in settings:
Section hidden.

If enabled:

< Horizontal Slider >

★★★★★
Review
Author
Company

Supports image or text reviews.

---

# CONTACT

+--------------------------------------------------------------+
| Contact Form             Social Circle Menu                  |
+--------------------------------------------------------------+

Form:
Name
Email
Subject
Message

Submit

Flow:
Website -> Supabase -> Email -> Admin

---

# FOOTER

Logo

Quick Links

Social Links

Version

Copyright

Scroll To Top component.

---

# COMPONENT MAPPING

Universe 3D Card -> Hero
Typewriter -> Hero
Resume Button -> Hero + Resume
Bottom Glass Navigation -> Mobile Navbar
Flip Card -> Projects
Glass Stack -> Skills
Social Circle Menu -> Contact
Orange Loader -> Initial Load
Scroll To Top -> Footer
Game Cartridge -> Featured Highlight (optional)

---

# COLOR CONVERSION

Original component colors:
Green / Blue / Purple

Replace with:
Primary Orange
Dark Gray
White

No component should retain its original accent color.

---

# SPACING

Cards: 24px gap

Sections: 140px

Buttons: 16px gap

Text spacing:
8 / 16 / 24 rhythm

---

# MICRO INTERACTIONS

Buttons:
Glow + scale

Cards:
Lift + rotate <=4°

Inputs:
Orange border focus

Links:
Animated underline

---

# FINAL AI RULES

- Follow Parts 01–06 together.
- Never redesign existing UI components.
- Use project folder UI source code.
- Bind UI to Supabase.
- Keep visual consistency.
- Respect spacing and layout.
- Prioritize performance and responsiveness.
