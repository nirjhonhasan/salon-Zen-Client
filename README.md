# SalonZone — Salon Appointment Booking Platform

SalonZone is a full-stack salon appointment booking platform. Customers browse
salon services, book a time slot, and pay online once the salon confirms the
appointment. Admins manage services, customers, appointments and payments from
a dedicated dashboard.

This repository is the **client** (Next.js). The REST API, JWT verification and
Stripe webhook live in the separate **server** repository.

> The repository codename is **SalonZone**. The public brand in the interface is
> **SalonBook**.

## Live Demo and Repositories

| Item            | Link                                                      |
| --------------- | --------------------------------------------------------- |
| Live site       | `<add your live client URL here>`                         |
| Client (this)   | https://github.com/nirjhonhasan/salon-Zen-Client          |
| Server          | https://github.com/nirjhonhasan/salon-zen-server          |

Admin credentials for evaluation are provided in the assignment submission, not
in this repository.

## Features

### For everyone

- Home page with a banner, featured services, service categories, testimonials
  and a "Why choose us" section, plus a full footer (contact, address, opening
  hours, social links).
- Public `/services` page that shows **active services only**, with
  **search by service name**, **category filter** and **price sorting**.
- Sign up and sign in with email and password, or with Google. The password
  must have at least 6 characters, one uppercase and one lowercase letter.
- Responsive layout for desktop, tablet and mobile, with a consistent dark and
  gold theme.

### For customers

- Protected service details page. Logged-out visitors are sent to `/sign-in`.
- Booking page with a date, a predefined time-slot list and an optional
  message. Booked slots are disabled, and the price is always copied from the
  service on the server.
- Overview dashboard with total, pending, confirmed and cancelled counts.
- "My Appointments" with details, **cancel (pending only)** and **Pay Now
  (confirmed and unpaid only)** through Stripe Checkout.
- Profile page to update name, picture (upload) and an optional phone number.

### For admins

- Overview dashboard: customers, active services, appointment requests,
  pending, confirmed and successful payments.
- Services: add, edit, delete, activate and deactivate. Images are uploaded
  (not pasted as a URL) and hosted on ImgBB.
- Appointments: list, details, **confirm (pending only)** and **cancel (pending
  or confirmed)**.
- Users: list customers, block and unblock.
- Transactions: read-only list of Stripe payments.
- Admins cannot book appointments, and admin accounts are seeded, never created
  through sign-up.

### Security and quality

- Route protection on the server: `proxy.ts` redirects logged-out visitors, and
  every private page re-checks the session, the role and the blocked status.
- The Express server verifies a JWT on every protected endpoint and loads the
  user's role and blocked status from the database.
- A payment is marked **paid** only by the signature-verified Stripe webhook,
  never by the success page.
- Toast notifications for success and failure, loading skeletons, error
  boundaries, a custom 404 page and confirmation dialogs for destructive
  actions.

## Tech Stack

| Layer          | Technology                                           |
| -------------- | ---------------------------------------------------- |
| Framework      | Next.js 16 (App Router), React 19, TypeScript        |
| Styling        | Tailwind CSS v4, shadcn/ui (Base UI), Lucide icons   |
| Authentication | Better Auth (email and password, Google, JWT plugin) |
| Database       | MongoDB                                              |
| Payments       | Stripe Checkout and webhooks (handled by the server) |
| Image hosting  | ImgBB                                                |
| Notifications  | Sonner                                               |
| Backend        | Express 5 REST API (separate repository)             |

## Project Structure

```
app/
  (marketing)/        public pages with navbar and footer
    services/         service list, details and booking pages
    booking-success/  Stripe success redirect
    booking-canceled/ Stripe cancel redirect
  (auth)/             sign-in and sign-up
  dashboard/
    admin/            services, appointments, users, transactions
    customer/         overview and appointments
    profile/          profile page for both roles
  Components/         feature components
components/ui/        shadcn/ui primitives
lib/                  auth, session guards, API helpers
proxy.ts              redirects logged-out visitors
```

## Getting Started

### Prerequisites

- Node.js 20 or newer and npm
- A MongoDB database (for example MongoDB Atlas)
- The server repository running locally (see its README)

### Install

```bash
git clone https://github.com/nirjhonhasan/salon-Zen-Client.git
cd salon-Zen-Client
npm install
```

### Environment variables

Create a `.env` file in the project root. Only the **names** are listed here.
Never commit real values.

| Variable                      | Purpose                                         |
| ----------------------------- | ----------------------------------------------- |
| `BETTER_DB_URI`               | MongoDB connection string                       |
| `BETTER_AUTH_URL`             | Public URL of this client                       |
| `BETTER_AUTH_SECRET`          | Secret used by Better Auth                      |
| `GOOGLE_CLIENT_ID`            | Google OAuth client id                          |
| `GOOGLE_CLIENT_SECRET`        | Google OAuth client secret                      |
| `NEXT_PUBLIC_API_URL`         | Base URL of the Express server                  |
| `IMGBB_API_KEY`               | ImgBB key (server only, used by `/api/upload`) |
| `JWT_SECRET`                  | Secret used by the legacy token route           |

The server needs its own variables (database, Stripe keys, webhook secret). They
are listed in the server README.

### Run locally

```bash
npm run dev
```

Open http://localhost:3000. Start the server as well, or the services and
dashboards will show an error message.

### Scripts

| Command             | What it does                    |
| ------------------- | ------------------------------- |
| `npm run dev`       | Start the development server    |
| `npm run build`     | Create a production build       |
| `npm run start`     | Run the production build        |
| `npm run lint`      | Check the code with ESLint      |
| `npm run typecheck` | Check types with TypeScript     |
| `npm run format`    | Format the code with Prettier   |

## Booking and Payment Flow

1. A customer picks a service and books a date and time slot. The appointment
   starts as `pending` and `unpaid`.
2. An admin confirms the appointment (`confirmed`).
3. The customer clicks **Pay Now** and is sent to Stripe Checkout.
4. After paying, Stripe redirects to `/booking-success` and also calls the
   server webhook.
5. The webhook verifies the signature, sets the appointment to `paid` and saves
   a transaction. Failed or expired payments are saved as `failed`.

To test payments locally, use Stripe test mode with the card
`4242 4242 4242 4242`, any future expiry date and any CVC.

## Deployment Notes

- Set every environment variable on the hosting platform.
- Set `BETTER_AUTH_URL` to the live client URL and `NEXT_PUBLIC_API_URL` to the
  live server URL.
- Add the live URL to the Google OAuth authorized redirect URIs.
- Create the Stripe webhook endpoint on the server URL and give its signing
  secret to the server.

## Author

Built by Abul Hasan as part of the SalonZone assignment.
