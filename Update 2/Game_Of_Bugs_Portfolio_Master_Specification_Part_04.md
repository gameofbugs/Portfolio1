# Game Of Bugs Portfolio v2
# Master Software Design Specification
# PART 04 — Supabase Database Architecture

> This document defines the backend architecture, database schema,
> storage strategy and data flow for the portfolio.

---

# Purpose

The website should be database driven.

Only layout, animations and branding assets should be hardcoded.

Everything else must come from Supabase.

---

# Backend Stack

Database
- Supabase PostgreSQL

Authentication
- Supabase Auth

Storage
- Supabase Storage

Realtime
- Optional

---

# High Level Architecture

Browser
    ↓
React + TypeScript
    ↓
Service Layer
    ↓
Supabase Client
    ↓
Database / Storage

Never access database directly from UI components.
Use reusable services.

---

# Core Tables

## profile

Stores hero information.

Columns

id (uuid)

avatar_url

name

role

availability

years_experience

projects_count

updated_at

---

## projects

id

slug

title

short_description

full_description

thumbnail_url

banner_url

engine

platform

status

github_url

itch_url

youtube_url

case_study

featured (boolean)

published (boolean)

display_order

created_at

updated_at

---

## project_gallery

id

project_id

image_url

display_order

---

## skills

id

name

logo_url

category

display_order

visible

---

## reviews

id

reviewer_name

designation

company

rating

review_text

image_url

avatar_url

featured

published

display_order

created_at

---

## social_links

id

platform

icon

url

visible

display_order

---

## resume

id

pdf_url

version

updated_at

public_visible

---

## contact_messages

id

name

email

subject

message

status

created_at

---

## analytics

Daily aggregated metrics.

date

visitors

portfolio_views

resume_opens

resume_downloads

project_clicks

contact_submissions

---

## settings

website_title

website_description

seo_keywords

maintenance_mode

reviews_enabled

loader_enabled

theme_color

footer_version

---

# Relationships

profile

Independent

projects

1 → many

project_gallery

projects

No direct relation with skills (store as tags or future join table)

---

# Storage Buckets

avatars

project-thumbnails

project-banners

gallery-images

skill-icons

review-images

resume

misc

Public URLs where appropriate.

---

# Row Level Security (RLS)

Public

Read:
Published projects
Visible skills
Visible reviews
Profile
Social links
Settings required by website

Authenticated Admin

Full CRUD on every table.

Contact messages:
Insert allowed publicly.
Read restricted to admin.

---

# Authentication Flow

Admin Login

↓

Supabase Auth

↓

Session

↓

Protected Dashboard

↓

CRUD Operations

---

# Contact Form Flow

Visitor

↓

Validation

↓

Insert into contact_messages

↓

Email notification

↓

Admin dashboard

↓

Mark read / archive

---

# Resume Flow

Admin uploads PDF

↓

Storage bucket

↓

resume table updated

↓

Website preview automatically reflects latest file

---

# Featured Project Flow

Admin toggles featured

↓

projects.featured = true

↓

Featured Projects section updates automatically

---

# Review Flow

Admin creates review

↓

Optional image upload

↓

published = true

↓

Visible on website

reviews_enabled = false

↓

Entire section hidden

---

# Analytics Flow

Visitor opens portfolio

↓

Increment portfolio view

↓

Project click

↓

Increment project_clicks

↓

Resume preview

↓

Increment resume_opens

↓

Download

↓

Increment resume_downloads

↓

Contact submit

↓

Increment contact_submissions

---

# API / Service Layer

Create dedicated services.

profileService

projectService

skillService

reviewService

resumeService

contactService

analyticsService

settingsService

Avoid database logic inside React components.

---

# Performance

Only fetch required columns.

Paginate projects.

Lazy load galleries.

Cache profile and settings.

Use image optimization.

---

# Security

Validate all uploads.

Restrict admin routes.

Sanitize contact input.

Never expose service role keys.

Use environment variables.

---

# Future Expansion

blog_posts

experience

certificates

timeline

achievements

testimonials_video

newsletter

---

# AI IMPLEMENTATION RULES

Use this schema as the default backend.

Prefer reusable typed interfaces.

Keep queries isolated in services.

Never hardcode content that already exists in Supabase.

Reuse existing UI components from the project folder and bind them to this schema rather than rebuilding them.
