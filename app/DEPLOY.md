# Deploy Guide

This is the merged project — public portfolio and admin panel now live in
one codebase, one Vercel project, with the original visual theme untouched.

## What changed vs. the two old projects

- **One project, one deploy.** Portfolio is at `/`, admin panel is at `/admin`. No more juggling two Vercel projects or two git repos.
- **No more hardcoded Supabase keys in source.** They now come from environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- **Real admin login.** The admin panel now uses Supabase Auth (email + password) instead of a custom `admin_users` table that anyone with the anon key could read (including the plaintext passwords). Even though the anon key still has to be in the frontend bundle (that's normal/expected for Supabase), it can no longer be used to write or delete your data — only a logged-in admin session can.
- **Skeleton loaders** on every section that loads from the database (hero, stats, games, tools, contact), instead of showing default placeholder text instantly.
- **Games support video links, a long-form description, and a screenshot gallery** (upload files or paste URLs — both work), shown in a Play Store-style lightbox.
- **A real Contact section**, with LinkedIn / Instagram / YouTube / GitHub / itch.io built in, plus an "Add Custom Link" button in the admin panel for anything else.
- **The thin white/grey border lines near the page edges are gone** — they were leftover boilerplate CSS from the original Vite template, unrelated to your actual design.
- Fully responsive pass on both the portfolio and the admin panel (the admin panel previously had zero mobile breakpoints).

Nothing about the existing color palette, fonts, animations, or layout style was changed — only restructured and extended.

---

## 1. Run the database migration

In the Supabase Dashboard → SQL Editor, run **`supabase/migration_v2.sql`** from this project (your original `supabase-setup.sql` should already have been run previously — if this is a brand new project, run that one first, then this one).

This adds the new columns/table, fixes the Row Level Security policies, and creates the `game-images` storage bucket.

## 2. Create your real admin login

Supabase Dashboard → **Authentication → Users → Add User** → enter the email and password you want to log into `/admin` with. The old `admin`/`admin123` username/password no longer works — that's intentional, see above.

## 3. Set environment variables

Copy `.env.example` to `.env` and fill in your project's URL and anon key (Supabase Dashboard → Project Settings → API):

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

**Important:** the anon key that was hardcoded in the old source files has already been shared in plaintext (in your old repo, and in this chat). It still works fine functionally since RLS now protects your data either way, but it's good practice to rotate it: Supabase Dashboard → Project Settings → API → Generate new anon key, then update `.env` (and Vercel's env vars) with the new one.

## 4. Local dev

```
npm install
npm run dev
```

## 5. Deploy to Vercel

- Push this folder to a single git repo.
- Import it into Vercel as one project (framework preset: Vite).
- In Vercel → Project Settings → Environment Variables, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for Production, Preview, and Development.
- Deploy. `/admin` will work correctly on refresh thanks to `vercel.json`'s SPA rewrite rule.
- You can delete your old separate admin-panel Vercel project once this one is live.

## 6. Enable Realtime on the new table

Supabase Dashboard → Database → Replication → toggle ON for `social_links` (the other three tables should already be on from your original setup).

---

## Using the new features

- **Contact tab (admin):** fill in a URL for any of the 5 built-in platforms to make it appear on the portfolio; leave it blank to hide it. Use "+ Add Custom Link" for anything else (Discord, X, Twitch, a personal site...).
- **Games tab (admin):** the new fields are 📝 Detailed Description, 🎬 Trailer/Video Link (YouTube/Vimeo links embed directly; anything else shows as a "Watch Trailer" button), and 🖼 Screenshots — click "Upload Image(s)" to upload files straight to Supabase Storage, or paste an existing image URL, or mix both.
