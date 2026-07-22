# Game Of Bugs Portfolio v2
# Master Software Design Specification
# PART 02 — Public Website Specification

> This document defines the public-facing website.
> Every section must follow this specification.

---

# IMPORTANT

## Existing UI Components

The project already contains the source code for all selected UI components.

DO NOT recreate them.

Reuse them.

Refactor only if required.

Match:
- Orange / Black theme
- Existing typography
- Existing spacing
- Existing animation timing

---

# Website Flow

Loading Screen
↓
Navbar
↓
Hero
↓
About
↓
Featured Projects
↓
My Projects
↓
Skills
↓
Resume
↓
Reviews
↓
Contact
↓
Footer

---

# 1. LOADING SCREEN

UI Component:
Orange Block Loader

Position:
Center of screen

Layout

+------------------------------------------------+
|                                                |
|                 GAME OF BUGS                   |
|                                                |
|              [ Orange Loader ]                 |
|                                                |
|        Loading Developer Portfolio...          |
|                                                |
+------------------------------------------------+

Behavior

Show ONLY first page load.

Duration:
Minimum 1.2 seconds
Maximum 2.5 seconds

Fade into Hero.

---

# 2. NAVBAR

Desktop Height:
88px

Sticky:
Yes

Background:
Glass

Blur:
16px

Border Bottom:
1px rgba(255,255,255,.08)

Layout

LOGO | Home | Projects | Skills | Reviews | Contact | Resume

Resume button always highlighted.

Mobile

Use Bottom Glass Navigation component.

Do not create another navigation.

---

# 3. HERO SECTION

Height:
100vh

Container:
1320px

Padding:
48px

Layout

+---------------------------------------------------------------+
| Universe Card | Typewriter Content | Decorative Planet         |
+---------------------------------------------------------------+

Universe Card

Use existing Universe 3D Card.

Replace every green color with portfolio orange.

Replace every placeholder with database values.

Database fields

Avatar
Name
Role
Availability
Years
Projects

Nothing else.

Typewriter

Position:
Center column

Infinite loop.

Strings

Unity Gameplay Programmer
Solo Game Developer
Problem Solver
Game Of Bugs
Building Interactive Experiences

CTA Buttons

Use Resume Outline Button.

Buttons

Resume Preview
View Projects

Planet

Keep existing planet from current website.

Slow rotation.

Mouse parallax.

---

# 4. ABOUT SECTION

Purpose

Tell the developer story.

Layout

Terminal style left.

Developer image right.

Cards below.

Cards

Performance First

System Thinking

Always Learning

Small hover animation.

No excessive motion.

---

# 5. FEATURED PROJECTS

Source:
Database

Admin chooses featured.

Horizontal scrolling.

Each card

Artwork

Title

Engine

Platform

Status

Hover

Flip Card animation.

Back

Description

Tech

GitHub

Play

Case Study

Click

Open existing modal.

Never navigate away.

---

# 6. MY PROJECTS

Below Featured.

Every project.

Horizontal carousel.

Lazy loading enabled.

Pagination optional.

Database driven.

---

# 7. SKILLS

Database driven.

Use Glass Stack Cards.

Each skill

Logo

Name

Nothing else.

Animation

Cards appear

One

By

One

Using stagger animation.

Desktop

5-6 cards per row.

Mobile

Horizontal scroll.

---

# 8. RESUME

Section

Preview Resume

Button

Uses existing Resume Outline Button.

Click

Open modal.

Modal

PDF Preview

Download Button

Resume managed in Admin.

---

# 9. REVIEWS

Optional.

Admin toggle.

If disabled

Entire section hidden.

Supports

Text

Image

Rating

Author

Designation

Cards

Glass style.

Horizontal slider.

---

# 10. CONTACT

Layout

Left

Contact Form

Right

Social Cards

Fields

Name

Email

Subject

Message

Submit

Submit Flow

Website

↓

Supabase

↓

Email

↓

Admin Dashboard

Social

GitHub

LinkedIn

YouTube

itch.io

Email

Instagram in footer.

Use Social Circle Menu component.

---

# 11. FOOTER

Simple.

Logo

Copyright

Social icons

Version

Back To Top

Use existing Scroll To Top component.

---

# Responsive

Desktop

Three column hero.

Tablet

Two column hero.

Mobile

Single column.

Universe Card

↓

Typewriter

↓

Buttons

↓

Planet

All cards become horizontal scroll where appropriate.

---

# Animation Rules

Hero

Fade + Slide

Projects

Stagger

Skills

Stagger

Reviews

Fade

Contact

Slide Up

Buttons

Scale 1.03

Cards

Rotate max 4°

Duration

300-600ms

Ease

easeOut

---

# AI IMPLEMENTATION NOTE

The source code for every selected UI component already exists in the project.

Never recreate them.

Reuse.

Refactor.

Theme them to orange.

Preserve responsiveness.

Preserve interaction quality.

