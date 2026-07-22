# Game Of Bugs Portfolio v2
# Master Software Design Specification
# PART 03 — Admin Panel Specification

> This document defines the complete Content Management System (CMS) and Admin Panel.

---

# Purpose

The Admin Panel is the control center of the portfolio.

The public website should contain almost no hardcoded content.
Everything should be manageable from the admin dashboard.

---

# Technology

Frontend
- React + TypeScript
- Tailwind CSS
- Framer Motion

Backend
- Supabase

Authentication
- Supabase Auth

Only authenticated administrators can access the dashboard.

---

# Navigation Layout

Desktop

+-------------------------------------------------------------+
| Logo | Dashboard | Projects | Skills | Reviews | Settings   |
+-------------------------------------------------------------+

Sidebar

Dashboard
Hero
Projects
Featured Projects
Skills
Resume
Reviews
Messages
Social Links
Analytics
Settings
Logout

---

# Dashboard

Purpose

Quick overview of portfolio performance.

Cards

+-------------------------------------------------------------+
| Visitors Today                                               |
| Portfolio Views                                              |
| Resume Opens                                                 |
| Resume Downloads                                             |
| Project Clicks                                               |
| Contact Form Submissions                                     |
+-------------------------------------------------------------+

Below Cards

Recent Messages

Recent Reviews

Latest Projects

Latest Visitors (optional)

Charts

Future ready.

---

# Hero Management

Editable

Avatar

Name

Role

Availability

Years

Project Count

Planet Image (optional)

Buttons

Save

Preview

Reset

Changes immediately reflect on website.

---

# Projects

CRUD

Create

Edit

Delete

Duplicate

Archive

Fields

Title

Slug

Thumbnail

Banner

Description

Short Description

Engine

Platform

Technology Tags

Gallery Images

GitHub URL

itch.io URL

YouTube URL

Case Study

Featured Toggle

Published Toggle

Display Order

Status

Preview Button

Save Button

Delete Confirmation Required

---

# Featured Projects

Dedicated page.

Shows all projects.

Each row contains

Project

Thumbnail

Featured Toggle

Order

Admin chooses which projects appear in Featured section.

Maximum recommended:
4

---

# Skills

CRUD

Fields

Skill Logo

Skill Name

Category

Visible Toggle

Display Order

Only logo and name are shown publicly.

---

# Resume

Upload PDF

Preview PDF

Replace Resume

Version Number

Last Updated

Public Preview Toggle

---

# Reviews

Enable / Disable Entire Section

CRUD

Fields

Reviewer Name

Designation

Company

Rating

Text Review

Image Review (optional)

Avatar

Published Toggle

Feature Toggle

Display Order

Approve / Reject

---

# Contact Messages

Table

Name

Email

Subject

Message

Date

Status

Actions

Mark Read

Archive

Delete

Reply (future)

---

# Social Links

Editable

GitHub

LinkedIn

YouTube

itch.io

Email

Instagram

Visibility Toggle

Open in New Tab Toggle

---

# Analytics

Widgets

Visitors Today

Total Visitors

Portfolio Views

Resume Opens

Resume Downloads

Project Clicks

Contact Form Submissions

Most Viewed Project

Most Clicked Social Link

Traffic Trend (future)

---

# Settings

Website Title

Website Description

SEO Keywords

Favicon

Logo

Loader Enable

Review Section Toggle

Maintenance Mode

Footer Version

Theme Colors

Animation Speed

---

# Authentication

Protected Routes

Login

Forgot Password (optional)

Logout

Session Persistence

Unauthorized users redirected to login.

---

# Database Mapping

profile

projects

skills

reviews

messages

social_links

settings

analytics

All CRUD operations update Supabase.

---

# UI Rules

Keep the admin clean.

Use cards.

Rounded corners.

Consistent spacing.

Responsive.

Avoid excessive animations.

---

# AI IMPLEMENTATION RULES

Reuse the existing UI components wherever appropriate.

Do not recreate available components.

Keep styling consistent with the public website.

Respect the orange/black theme.

Maintain reusable architecture.

Separate presentation, state management, and data fetching.

