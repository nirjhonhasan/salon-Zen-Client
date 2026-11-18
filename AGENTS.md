<!-- BEGIN:nextjs-agent-rules -->

# Project Context: SalonBook - Salon Appointment Booking Platform
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Authentication**: BetterAuth (MongoDB adapter)
- **UI Framework**: Shadcn UI
- **Custom Schema**:
  - `user`: `name`, `email`, `image`, `role` (string), `isBlocked` (boolean).
  - `services`: `serviceName`, `category`, `description`, `price`, `duration`, `image` (upload), `status` (active/inactive), `createdAt`.
  - `appointments`: `serviceId`, `customerId`, `appointmentDate`, `timeSlot`, `message`, `servicePrice`, `paymentStatus` (unpaid/paid), `status` (pending/confirmed/cancelled), `createdAt`.
  - `transactions`: `appointmentId`, `customerId`, `amount`, `currency`, `stripeSessionId`, `status` (paid/failed), `createdAt`.


# Guidelines
1. **Authentication**: Use `lib/auth.ts` (server) and `lib/auth-client.ts` (client). Admin accounts must NOT be created through public registration.
2. **Schema Integrity**: Ensure user/service/appointment/transaction collections follow the specified DB architecture.
3. **Authorization**: Implement server-side role verification on all protected APIs. Prevent access to another role's dashboard.
4. **Core Features**:
   - Customers: Browse/search/filter/sort services, book/cancel appointments, pay via Stripe.
   - Admin: Manage services (CRUD), upload images (ImgBB), manage appointments (confirm/cancel), manage users (block/unblock), view transactions.
5. **Security/Stripe**: Secure all keys/credentials in `.env`. Use verified Stripe webhooks for payment updates.
6. **UI/UX**: Responsive design, toast notifications, loading states for async actions.
7. **Next.js Conventions**: This project uses Next.js 16. Consult `node_modules/next/dist/docs/` for latest API changes.

<!-- END:nextjs-agent-rules -->

