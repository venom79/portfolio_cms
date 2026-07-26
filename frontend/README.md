# Base Camp HQ — Portfolio CMS Frontend

A React + Tailwind + shadcn-style admin dashboard for managing your portfolio's
Profile, Projects, and Milestones content, built against your existing
Node.js/Express + MongoDB API.

## Design system

Follows the established **Base Camp HQ** tokens:

- Colors: ink dark `#1c1710`, firelight amber `#c8860a` / `#e2a530`, worn canvas
  `#e8d5a3` / `#a4906b`, plus rust (destructive) and moss (success/published) accents.
- Type: Bebas Neue (display/headings), Special Elite (stamped/meta text), Oswald (body).
- Square corners throughout — no rounded UI.
- Expedition-coded navigation: Operations Log (dashboard), Base Profile, Arsenal
  (projects), Trail Markers (milestones).

## Getting started

```bash
npm install
cp .env.example .env   # then set VITE_API_BASE_URL to your backend
npm run dev
```

## Folder structure

```
src/
  api/            One file per backend module (auth, profile, projects, milestones)
  lib/            axios instance, constants/enums, cn() and formatting helpers
  context/        AuthContext (token storage + login/logout)
  hooks/          useAuth, useProfile, useProjects, useMilestones — all data logic
  components/
    ui/           shadcn-style primitives restyled to Base Camp HQ (button, dialog, table…)
    layout/       Sidebar, Header, AppLayout, ProtectedRoute
    shared/       PageHeader, EmptyState, LoadingState, ErrorBanner,
                  ImageUploader, ConfirmDialog, TagInput
    profile/      One form component per Profile section (identity, stats, skills…)
    projects/     ProjectsTable, ProjectDialog, ProjectGalleryDialog, thumbnail uploader
    milestones/   MilestonesTable, MilestoneDialog
  pages/          One page per route, composing the above
```

## Auth

`POST /auth/login` is expected to return a token (checked as `token`, `accessToken`,
or `data.token` in the response). It's stored in `localStorage` and attached as a
Bearer token to every request. A 401 anywhere clears the token and bounces to `/login`.

## Notes

- All destructive actions (project/milestone delete, image/resume removal) go through
  a confirm step first.
- Image and file uploads use `multipart/form-data` and match the field names implied
  by your route names (`image`, `thumbnail`, `resume`) — adjust in `src/api/*.js` if
  your backend expects different multipart field names.
- Soft-deleted projects/milestones (`isDeleted`) are expected to already be filtered
  out server-side by the `GET` list routes.
