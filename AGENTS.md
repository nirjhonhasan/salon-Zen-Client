# SalonZen — Agent Guide

Salon appointment booking platform (SalonBook assignment). Customers browse salon
services and book appointments; admins manage services, users, bookings and
transactions. Built with Next.js 16 App Router, MongoDB and BetterAuth.

Read this file before making changes. Keep the "Known gaps" section current when
you complete or break something.

The public brand in the UI (navbar logo, footer, titles) must read
**SalonBook** per the assignment; the repo/codename is SalonZen.

## Assignment requirements (source of truth)

Summary of "Assignment 9 – Category 002". When code and this list disagree,
this list wins.

### Deliverables and grading rules

- Two separate GitHub repos: client (this one) and server (`../salonZen-server`).
  Min **20 meaningful client commits** and **12 server commits**; commit
  messages must be descriptive. One feature per commit.
- README in both repos: name + description, features, tech stack, install,
  run locally, env var **names only**, live URL, client + server repo links.
- Never commit `.env` or secrets. Better Auth, MongoDB, Stripe (secret +
  webhook secret), Google OAuth and ImgBB keys all come from env vars.
- Deployment: no CORS / 404 / 504 errors, reload on any route works, private
  routes survive refresh, sessions persist, Stripe checkout + webhook work live,
  admin credentials supplied for evaluation must work live.
- Submit: admin email, admin password, live link, server repo, client repo.
- Challenge items: search by service name, sort by price, JWT verification
  middleware on the Express backend.

### Routes

| Route                               | Access        | Notes                                       |
| ----------------------------------- | ------------- | ------------------------------------------- |
| `/`                                 | public        | Banner, featured services, categories, +1 extra section |
| `/services`                         | public        | Active services only; search, category filter, price sort |
| `/services/[id]`                    | **protected** | Redirect to `/sign-in` if logged out; invalid id → friendly error; only active services bookable; admins cannot book |
| `/sign-in`, `/sign-up`              | public        | Redirect away when already logged in        |
| `/dashboard/customer`               | customer      | Overview stats (total/pending/confirmed/cancelled) |
| `/dashboard/customer/appointments`  | customer      | List, details, cancel (pending only), Pay Now (confirmed + unpaid only) |
| `/dashboard/admin`                  | admin         | Customers, active services, appointments, pending, confirmed, successful payments |
| `/dashboard/admin/services`         | admin         | List, edit, delete, activate/deactivate     |
| `/dashboard/admin/services/new` (+ edit) | admin    | Add/update form                             |
| `/dashboard/admin/appointments`     | admin         | List, details, confirm (pending only), cancel (pending or confirmed) |
| `/dashboard/admin/users`            | admin         | List customers, details, block/unblock      |
| `/dashboard/admin/transactions`     | admin         | Read-only                                   |
| `/dashboard/profile`                | both          | Name, image (upload or URL), phone          |
| `/payment/success`, `/payment/cancel` | customer    | Stripe redirect targets                     |

Navbar: logo "SalonBook"; public = Home, Browse Services, Sign In, Sign Up;
authenticated = Home, Services/Salon details, Dashboard, avatar dropdown (user
name, Dashboard, Logout). Navbar must update immediately on auth change.
Footer must contain: logo + short description, nav links, contact info,
address + opening hours, social links, copyright.

### Business rules

- Service: `price > 0`, `duration > 0` (minutes), image is a **file upload**
  (not a pasted URL) hosted on ImgBB, `status` defaults to `active`. Only
  admins create/update/delete. Inactive services are hidden publicly and
  cannot be booked.
- Appointment: fields date, **predefined time-slot list**, optional message.
  Defaults `status: "pending"`, `paymentStatus: "unpaid"`. Reject booking an
  inactive service; reject duplicate **active** (pending/confirmed)
  appointment for the same service/date/slot. `servicePrice` is copied from the
  service server-side, never from the client. Customer can cancel only their
  own **pending** appointments; only **pending** can be confirmed; admin can
  cancel pending or confirmed. Customers only see their own appointments.
- Payment: Pay Now only for `confirmed` + `unpaid`. Stripe Checkout → success /
  cancel pages. `paymentStatus` becomes `paid` and the `transactions` row is
  written **only** from a signature-verified Stripe webhook
  (`stripe.webhooks.constructEvent` with raw body + `STRIPE_WEBHOOK_SECRET`),
  never from the success page or any admin action. Admin cannot edit payment
  records. Handle failed/cancelled payments (`transactions.status: "failed"`).
- Users: admins can block/unblock customers; blocked users are rejected on every
  protected page and API. Profile updates may only touch name, image, phone —
  never `role`/`isBlocked`, never another user's record. Admin accounts are
  seeded, never created via sign-up.
- Password policy: min 6 chars, one upper, one lower.

### Cross-cutting UX requirements

- Toast notifications for every success/failure; **no `alert()`**.
- Loading indicators for: fetching services, dashboard data, creating
  appointments, processing payments.
- Error handling for: invalid routes (404), failed API calls, invalid forms,
  unauthorized access, failed image uploads, booking conflicts,
  failed/cancelled payments.
- Responsive (desktop/tablet/mobile), consistent salon theme, reusable
  components, status badges, confirmation dialogs for destructive actions
  (delete service, cancel appointment, block user), no dead buttons/links.
- Tables or lists for services, appointments, users, transactions; statistics
  cards on overviews.

## Stack

| Layer      | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Framework  | Next.js 16.4 (App Router, RSC by default)                     |
| React      | React 19.3                                                    |
| Language   | TypeScript (strict), path alias `@/*` → repo root              |
| Styling    | Tailwind CSS v4 (CSS-first, no `tailwind.config.*`)           |
| UI kit     | shadcn CLI v4, style `base-nova`, built on `@base-ui/react`    |
| Icons      | `lucide-react`                                                |
| Theming    | `next-themes` (`components/theme-provider.tsx`)               |
| Auth       | `better-auth` 1.7 + `@better-auth/mongo-adapter`               |
| Database   | MongoDB (`mongodb` driver, database `salon-zen`)               |

## Commands

```bash
npm run dev        # next dev
npm run build      # next build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run format     # prettier --write on ts/tsx
```

Add shadcn components with the CLI, never by hand-copying from Radix examples:

```bash
npx shadcn@latest add <component>
```

This project uses **`@base-ui/react`, not Radix**. Import primitives from
`@/components/ui/*`; do not add `@radix-ui/*` dependencies.

## Directory map

```
app/
  layout.tsx                 root layout: fonts, ThemeProvider only
  globals.css                Tailwind v4 theme tokens (oklch, sidebar/chart vars)
  (marketing)/
    layout.tsx               site Navbar + Footer for public pages
    page.tsx                 marketing home (Banner, About)
    services/page.tsx        public services placeholder
  (auth)/
    layout.tsx               redirects logged-in users to their dashboard
    sign-in/page.tsx
    sign-up/page.tsx
  dashboard/
    layout.tsx               requireUser() + sidebar + header shell
    page.tsx                 redirects to /dashboard/admin or /dashboard/customer
    admin/page.tsx           requireRole("admin") overview
    admin/users/page.tsx     stub ("Admin Users") — to be built
    customer/page.tsx        requireRole("customer") overview
    profile/page.tsx         profile page (both roles)
  blocked/page.tsx           shown when isBlocked is true
  api/auth/[...all]/route.ts BetterAuth handler
  Components/                feature components (see naming note below)
    Home/                    Navbar, NavLinks, MobileMenu, Banner, About, Footer
    DashboardSideBar.tsx     role-aware sidebar (client)
    sidebar-items.tsx        getSidebarItems(role) → nav config
    NavActions.tsx           sign in/up buttons or avatar dropdown
    ProfileDropdown.tsx      avatar popover: dashboard, profile, sign out
    ProfileForm.tsx          profile edit form (name + image)
    SignOutButton.tsx        shared sign-out button
    Services/                ServiceCard, EmptyServices
    dashboard/AddServiceForm.tsx  admin add-service form (client)
  Types/index.ts             SessionUser type
components/
  ui/                        shadcn generated primitives (avatar, card, sidebar, …)
  theme-provider.tsx
hooks/use-mobile.ts           shadcn sidebar breakpoint hook
lib/
  auth.ts                    BetterAuth server instance (Mongo adapter)
  auth-client.ts             BetterAuth React client (single instance)
  session.ts                 getCurrentUser / requireUser / requireRole
  mongo.ts                   shared `db` handle (server only)
  services.ts                getActiveServices() read helper (server only)
  service/add-service/page.tsx  MISPLACED page (see Known gaps #8)
  imgbb.ts                   uploadImageToImgBB helper (calls /api/upload)
  utils.ts                   cn()
public/                      logo.webp, banner_bg.webp
```

### Naming note

Feature components live in `app/Components/` (capital C) and are imported as
`@/app/Components/Home/Navbar` or with relative paths (`./Components/...`,
`../Types`). shadcn primitives live in `components/ui/`. Match the existing
folder when editing; do **not** create a second `components/Home/` tree, but
prefer `@/...` absolute imports in new files.

## Design system

SalonZen is dark-first with a gold accent. Reuse these tokens instead of
inventing new colors:

- Background `bg-zinc-950`, surfaces `bg-zinc-900`, borders `border-zinc-800`
- Text `text-zinc-100` / `text-zinc-300` / muted `text-zinc-400`–`zinc-500`
- Accent `amber-500` (hover `amber-600`), on-accent text `zinc-950`
- Destructive / blocked states use `red-400` on `red-500/10`
- Radii: `rounded-full` for CTAs and avatars, `rounded-xl` for panels/rows
- Fonts from `next/font/google`: `--font-heading` = Cormorant Garamond (display),
  `--font-sans` = Manrope (body). Global `--font-heading` is currently mapped to
  the sans variable in `globals.css`; use `font-heading` sparingly.
- Utilities: `cn()` from `@/lib/utils`. Prefer `className` composition over new
  CSS unless adding theme tokens to `globals.css`.

Formatting is enforced by `.prettierrc`: double quotes, **no semicolons**,
2-space indent, 80 cols, `prettier-plugin-tailwindcss` (classes auto-sorted).

## Authentication & authorization

`lib/auth.ts` (server only):

- MongoDB adapter on `process.env.BETTER_DB_URI`, database name `salon-zen`
- `baseURL: process.env.BETTER_AUTH_URL`
- Email/password enabled **and** Google OAuth (`GOOGLE_CLIENT_ID`,
  `GOOGLE_CLIENT_SECRET`)
- `user.additionalFields`:
  - `role: string`, `input: false`, `defaultValue: "customer"`
  - `isBlocked: boolean`, `input: false`, `defaultValue: false`

Both custom fields are server-writable only. Keep `input: false` so a signup
payload can never self-assign `role: "admin"` or clear its own block.

Reading the session in server components / route handlers:

```ts
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const session = await auth.api.getSession({ headers: await headers() })
```

Client-side (`"use client"`) code uses the singleton from `lib/auth-client.ts`:

```ts
import { authClient } from "@/lib/auth-client"

await authClient.signIn.email({ email, password })
await authClient.signUp.email({ name, email, password, image })
await authClient.signOut({ fetchOptions: { onSuccess: () => router.refresh() } })
```

Rules:

- Admin accounts are **never** created through `/sign-up`. Promote via DB update
  or a seed script.
- Route protection must be server-side (layout/route handler/middleware), not
  only conditional rendering. Blocked users (`isBlocked === true`) must be
  rejected before any data is returned.
- Every protected API route re-checks the session and role; never trust a
  `userId`/`role` coming from the request body.
- Never import `lib/auth.ts` into a client component.

### Auth file conventions

- Sign-in page: `app/(auth)/sign-in/page.tsx`; sign-up:
  `app/(auth)/sign-up/page.tsx` (client components, `Card` + `Input` + `Button`).
  Both redirect to `/dashboard` after success; `app/(auth)/layout.tsx` sends
  already-logged-in visitors to their dashboard.
- Server-side guards live in `lib/session.ts`:
  - `getCurrentUser()` → user or `null` (for public pages/navbar)
  - `requireUser()` → redirects to `/sign-in` or `/blocked`
  - `requireRole("admin" | "customer")` → also redirects on role mismatch
- Dashboard routes: `/dashboard` redirects by role, `/dashboard/admin`,
  `/dashboard/customer`, `/dashboard/profile`.
- Password policy currently enforced in the sign-up form: min 6 chars, at least
  one upper and one lower case letter.
- Images upload through `uploadImageToImgBB()` in `lib/imgbb.ts`, which posts to
  our own route `app/api/upload/route.ts`. That route holds the private
  `IMGBB_API_KEY`, checks type (JPG/PNG/WEBP) and size (5 MB), and returns only
  the URL. Service pictures (`purpose: "service"`) are admin only; the sign-up
  picture is allowed for visitors who are not logged in. Profile images are then
  saved through `authClient.updateUser({ name, image })`.

## Data model

Collections in `salon-zen` (MongoDB). BetterAuth owns `user`, `session`,
`account`, `verification`; the rest are application collections.

```ts
user:         { name, email, emailVerified, image, role: "customer" | "admin", isBlocked: boolean, createdAt, updatedAt }
services:     { serviceName, category, description, price, duration, image, status: "active" | "inactive", createdAt }
appointments: { serviceId, customerId, appointmentDate, timeSlot, message,
                servicePrice, paymentStatus: "unpaid" | "paid",
                status: "pending" | "confirmed" | "cancelled", createdAt }
transactions: { appointmentId, customerId, amount, currency,
                stripeSessionId, status: "paid" | "failed", createdAt }
```

Shared client-facing types go in `app/Types/index.ts` (see `UserSession`).

## Feature status

Implemented:

- BetterAuth email/password + Google, `role` / `isBlocked` fields
- Route group `(auth)` with sign-in / sign-up (image upload, inline errors,
  loading state); logged-in visitors are redirected away
- Route group `(marketing)` so the site navbar/footer only appear on public
  pages, not on dashboards or auth screens
- Polished responsive navbar: active link highlight, mobile slide-in menu,
  sign-in/sign-up buttons, avatar dropdown
- Server-side guards in `lib/session.ts` (`getCurrentUser`, `requireUser`,
  `requireRole`) + `/blocked` page for `isBlocked` accounts
- Role-based dashboards: `/dashboard` → `/dashboard/admin` or
  `/dashboard/customer`, each guarded by `requireRole`
- Profile page at `/dashboard/profile`: edit name, upload a new picture via
  ImgBB, see role and active/blocked status
- Marketing home (`Banner`, `About`), services placeholder, theme hotkey
- Partial: `getActiveServices()` + `ServiceCard`/`EmptyServices`, and an
  `AddServiceForm` (admin) — not yet wired to a working route/API

Not built yet (assignment requirements):

- Home: featured services (≥6 active, from DB), categories section, extra
  section; Footer content (contact, address, hours, socials)
- Services CRUD (edit, delete, activate/deactivate), admin image **upload**
  flow, positive price/duration validation
- Public `/services`: search by name, category filter, price sort (challenge)
- `/services/[id]` protected detail page + booking form (date, time slot,
  message) with conflict/inactive/admin checks
- Customer overview stats and "My Appointments" (details, cancel, Pay Now)
- Admin appointment management (confirm/cancel, details)
- Admin user management (list, details, block/unblock via `isBlocked`)
- Admin transactions page (read-only)
- Stripe Checkout, `/payment/success`, `/payment/cancel`, **verified webhook**
- ~~Profile: phone field~~ — done: `phone` is an `additionalFields` entry with
  `input: true` and a zod validator in `lib/auth.ts`; role/isBlocked stay
  `input: false`
- Toasts (`sonner`), `loading.tsx`/skeletons, `error.tsx`, confirmation dialogs
- Role-specific sidebar items (currently only Dashboard / Browse Services /
  My Profile for both roles)
- Express JWT verification middleware (challenge) — see Backend API
- Middleware-level protection (guards currently run per page/layout)
- READMEs (both repos), deployment, seeded admin account

## Conventions

- Default to server components; add `"use client"` only for state, effects,
  event handlers or browser APIs.
- Data fetching: server components / route handlers. Mutations: `app/api/*`
  route handlers or server actions, never direct DB calls from the client.
- Validate and authorize every mutation server-side; return typed JSON errors.
- Keep the amber/zinc visual language and reuse `components/ui` primitives.
- Every async action shows loading + error feedback; use `sonner`-style toasts
  once added.
- Secrets stay in `.env` (git-ignored). Only `NEXT_PUBLIC_*` values may reach
  the browser. The ImgBB key is server-only (`IMGBB_API_KEY`).
- Environment variables used: `BETTER_DB_URI`, `BETTER_AUTH_URL`,
  `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`,
  `IMGBB_API_KEY` (server only), `NEXT_PUBLIC_API_URL`; Stripe adds
  `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` (server only). The README must
  list names only. Never commit `.env`.

## Backend API (sibling project)

`../salonZen-server` is a plain-JavaScript Express 5 + MongoDB API that shares
the same `salon-zen` database. It has its own `README.md` / `AGENTS.md`.

- Base URL: `http://localhost:4000/api/v1`
- Resources: `/services`, `/appointments`, `/users`, `/transactions`, `/health`
- Call it from the Next.js app via `NEXT_PUBLIC_API_URL` (client) or a server
  fetch helper.
- The API does **not** verify BetterAuth sessions yet. Until it does, keep
  session reads and role checks in the Next.js app and treat API responses as
  untrusted for authorization decisions.
- Assignment requires **JWT verification middleware on Express** and
  server-side role checks on every protected endpoint (services write,
  appointments, users, transactions). Plan: Next.js issues a short-lived JWT
  (BetterAuth `jwt` plugin or signed token) sent as `Authorization: Bearer`;
  Express verifies it, loads role/`isBlocked` from the DB and enforces
  role/ownership. Server also owns the Stripe webhook (raw body route mounted
  before `express.json()`), CORS allow-list for the client origin, and needs
  its own README + ≥12 commits. Currently `../salonZen-server` is just
  `index.js` + `package.json`.
- Never create users or passwords from the API — BetterAuth owns `user` and
  `session`.

## Known gaps and pitfalls

Fix these when touching the related area:

1. No `middleware.ts`: route protection runs in layouts/pages via
   `lib/session.ts`. If you add middleware, also enforce `isBlocked` and keep
   the `/blocked` redirect working.
2. No public 404-safe links: keep navbar/sidebar links pointing only at pages
   that exist, or ship the page in the same change.
3. Admin dashboard cards for services/bookings/users are marked "Coming next" —
   replace the badge with a real link when those pages land.
4. `/services` and `/dashboard/*` are still placeholders beyond the overview and
   profile screens.
5. Some components carry Bengali comments; keep new code comments in English for
   consistency, identifiers always English.
6. `components.json` style is `base-nova` — generated components may differ from
   the classic shadcn docs; read the generated file before extending it.
7. Profile image previews use plain `<img>` (blob/ImgBB URLs) with an eslint
   disable comment; switch to `next/image` + `images.remotePatterns` if you want
   optimisation.

<!-- BEGIN:nextjs-agent-rules -->

8. `lib/service/add-service/page.tsx` is a route page living under `lib/`, so it
   is **not routable**. Move it to `app/dashboard/admin/services/new/page.tsx`
   (and delete the `lib/service/` folder). It also uses semicolons and Bengali
   comments — reformat to Prettier rules and English comments.
9. `app/dashboard/admin/users/page.tsx` is a placeholder with no guard. Add
   `requireRole("admin")` before building it; every new admin page must call it.
10. ~~ImgBB key exposed to the browser~~ — fixed: uploads go through
    `app/api/upload` with the private `IMGBB_API_KEY`. The old key was public, so
    regenerate it in ImgBB.
11. UI branding says SalonZen in places; the spec requires "SalonBook".
12. Sidebar and `/services` links must only point to routes that exist; add
    admin/customer items (appointments, services, users, transactions) as
    each page ships.
13. The spec lists the user fields as name/email/image/role/isBlocked; a
    `phone` field is needed for profile editing — add via BetterAuth
    `additionalFields` rather than a new collection.

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
