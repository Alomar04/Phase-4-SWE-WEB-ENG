
# AppliFlow — Application Tracking Platform (Phase 4 Frontend)

A responsive, role-based web application for tracking job, internship, and program applications. Built with **React 18**, **Vite 6**, and **Tailwind CSS 4**, AppliFlow provides dedicated portals for Applicants, Career Advisors, and Platform Administrators.

> **Note:** This is a frontend-only prototype. All data is served from in-memory mock data — no backend or database is required.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Role-Based Portals](#role-based-portals)
- [Routing](#routing)
- [Authentication & Session Management](#authentication--session-management)
- [Design System & Theming](#design-system--theming)
- [Mock Data](#mock-data)
- [Demo Accounts](#demo-accounts)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [License](#license)
- [Attributions](#attributions)

---

## Features

| Area | Highlights |
| --- | --- |
| **Applicant Portal** | Dashboard with status widgets, upcoming deadlines, full CRUD for applications, file attachments, notes/follow-ups timeline, deadline reminders, archive/restore |
| **Advisor Portal** | Search applicants, view read-only profiles, review applications, flag items, write recommendations |
| **Admin Portal** | Platform analytics with charts, user management, support ticket inbox, category CRUD, reported issues queue, audit log |
| **Auth & Security** | Role-based route guards, access-denied screen, 15-minute session timeout with auto-logout banner |
| **UX Polish** | Loading skeletons, empty states with CTAs, confirmation dialogs for destructive actions, toast notifications, responsive mobile/desktop layouts |

---

## Tech Stack

| Category | Technology | Version |
| --- | --- | --- |
| Framework | React | 18.3.1 |
| Bundler | Vite | 6.3.5 |
| Routing | React Router | 7.13.0 |
| Styling | Tailwind CSS | 4.1.12 |
| UI Primitives | Radix UI (shadcn/ui based) | various |
| Charts | Recharts | 2.15.2 |
| Animations | Motion (Framer Motion) | 12.23.24 |
| Forms | React Hook Form | 7.55.0 |
| Date Utilities | date-fns | 3.6.0 |
| Icons | Lucide React | 0.487.0 |
| Toasts | Sonner | 2.0.3 |
| Date Picker | React Day Picker | 8.10.1 |
| Drag and Drop | React DnD | 16.0.1 |
| Package Manager | pnpm (recommended) / npm | — |

---

## Prerequisites

- **Node.js** ≥ 18.x
- **pnpm** ≥ 8.x (recommended) — or npm / yarn

```bash
# Verify installations
node -v    # e.g. v18.20.0+
pnpm -v    # e.g. 8.15.0+
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Alomar04/Phase-4-SWE-WEB-ENG.git
cd Phase-4-SWE-WEB-ENG
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Start the Development Server

```bash
pnpm dev
# or
npm run dev
```

The app will be available at **http://localhost:5173** (default Vite port).

### 4. Build for Production

```bash
pnpm build
# or
npm run build
```

The production-optimized bundle is output to the `dist/` directory.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite dev server with hot module replacement |
| `pnpm build` | Create a production build in `dist/` |

---

## Project Structure

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for a full annotated breakdown. Below is a high-level summary:

```
Phase-4-SWE-WEB/
├── index.html                  # HTML entry point
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite config (React, Tailwind, JSX-in-JS plugin, @ alias)
├── postcss.config.mjs          # PostCSS (empty — Tailwind v4 handles it)
├── ATTRIBUTIONS.md             # Third-party credits
├── PROJECT_STRUCTURE.md        # Detailed folder/file documentation 
├── src/
│   ├── main.js                 # React DOM entry — mounts <App />
│   ├── imports/
│   │   └── appliflow-requirements.md   # Product requirements document
│   ├── styles/
│   │   ├── index.css           # Master stylesheet (imports below)
│   │   ├── fonts.css           # Font declarations
│   │   ├── tailwind.css        # Tailwind CSS v4 config
│   │   └── theme.css           # CSS custom properties (light + dark themes)
│   └── app/
│       ├── App.js              # Root component (AuthProvider, Router, Toaster)
│       ├── routes.js           # All route definitions with role guards
│       ├── lib/
│       │   ├── auth-context.js # AuthContext with login/signup/logout/session timeout
│       │   └── mock-data.js    # All mock data (users, applications, tickets, etc.)
│       └── components/
│           ├── layout.js       # AppLayout — responsive top nav + role-based sidebar items
│           ├── admin/          # Admin portal components (6 files)
│           ├── advisor/        # Advisor portal components (3 files)
│           ├── applicant/      # Applicant portal components (4 files)
│           ├── auth/           # Authentication components (6 files)
│           ├── figma/          # Figma helper components
│           └── ui/             # Reusable UI primitives (50+ components)
```

---

## Architecture Overview

```
index.html
  └── src/main.js
        └── <App />                    (App.js)
              ├── <AuthProvider>        (lib/auth-context.js — context for auth state)
              ├── <RouterProvider>      (routes.js — all page routes)
              ├── <SessionExpiredBanner> (auto-logout overlay after 15 min)
              └── <Toaster>            (global toast notifications)
```

**Key architectural decisions:**

- **Single-page application** using React Router v7 `createBrowserRouter` with nested layouts.
- **Role-based routing** implemented via `<RouteGuard allowedRoles={[...]}>`— wraps protected routes and redirects unauthorized users.
- **Shared layout** — `<AppLayout>` provides a persistent top navigation bar with role-appropriate menu items. Page content renders via React Router's `<Outlet>`.
- **State management** — Authentication state lives in React Context (`AuthProvider`). Component-level state uses `useState` / `useCallback`. No external state library.
- **Mock data layer** — All data lives in `src/app/lib/mock-data.js` and is imported directly by components. Local mutations use component state.
- **Path alias** — `@` is aliased to `src/` in `vite.config.js` for clean imports (e.g., `@/app/lib/mock-data`).

---

## Role-Based Portals

### Applicant Portal (`/applicant/*`)

| Route | Component | Description |
| --- | --- | --- |
| `/applicant` | `ApplicantDashboard` | Status widgets, upcoming deadlines, "Add Application" CTA |
| `/applicant/applications` | `ApplicationsList` | Searchable/filterable table of active applications |
| `/applicant/applications/new` | `ApplicationForm` | Create a new application with validation |
| `/applicant/applications/:id` | `ApplicationDetail` | Tabbed detail view (Overview, Deadlines, Documents, Notes) |
| `/applicant/applications/:id/edit` | `ApplicationForm` | Edit an existing application |
| `/applicant/archived` | `ApplicationsList` | Archived applications with restore option |

### Advisor Portal (`/advisor/*`)

| Route | Component | Description |
| --- | --- | --- |
| `/advisor` | `AdvisorHome` | Search/browse applicants with permission states |
| `/advisor/applicant/:userId` | `ApplicantProfile` | Read-only applicant summary + application list |
| `/advisor/applicant/:userId/application/:appId` | `AdvisorApplicationDetail` | Review application, add flags, write recommendations |

### Admin Portal (`/admin/*`)

| Route | Component | Description |
| --- | --- | --- |
| `/admin` | `AdminDashboard` | Platform stats, charts (Recharts), user/application analytics |
| `/admin/users` | `UserManagement` | User table, delete user, reset password |
| `/admin/support` | `SupportInbox` | Support ticket list with detail view and response composer |
| `/admin/categories` | `CategoriesManagement` | CRUD categories with in-use protection |
| `/admin/issues` | `ReportedIssues` | Reported issues queue with status, priority, internal notes |
| `/admin/audit` | `AuditLog` | Read-only table of admin actions with timestamps |

### Public Routes

| Route | Component | Description |
| --- | --- | --- |
| `/` | `Landing` | Marketing page with feature highlights and demo logins |
| `/login` | `Login` | Email/password login form |
| `/signup` | `SignUp` | Registration with password strength validation |
| `/access-denied` | `AccessDenied` | Shown when a user lacks role permissions |

---

## Authentication & Session Management

Authentication is handled entirely on the client side via `AuthProvider` in `src/app/lib/auth-context.js`.

| Feature | Details |
| --- | --- |
| **Login** | Matches email against `mockUsers`. Password is accepted but not validated (prototype). |
| **Sign Up** | Creates a new user with `role: "applicant"`. Checks for duplicate emails. |
| **Session Timeout** | 15-minute inactivity timer. Activity (mouse, keyboard, scroll, touch) resets the timer. On expiry, the user is logged out and a full-screen "Session Expired" banner appears. |
| **Route Guards** | `<RouteGuard allowedRoles={["applicant"]}>` checks `currentUser.role`. Redirects to `/login` if not authenticated, or `/access-denied` if the role is not allowed. |
| **Role Switching** | The `switchRole(role)` function allows quickly switching between demo personas (used on the landing page). |

---

## Design System & Theming

The UI is built on a **shadcn/ui** foundation using **Radix UI** primitives and **Tailwind CSS v4**.

### Theme Variables

Defined in `src/styles/theme.css` as CSS custom properties on `:root` (light) and `.dark` (dark mode):

| Variable | Purpose |
| --- | --- |
| `--primary` / `--primary-foreground` | Primary brand color (`#2563eb` blue) |
| `--secondary` / `--secondary-foreground` | Secondary surfaces |
| `--destructive` / `--destructive-foreground` | Destructive actions (`#d4183d` red) |
| `--muted` / `--muted-foreground` | Subdued text and backgrounds |
| `--accent` / `--accent-foreground` | Highlight states |
| `--background` / `--foreground` | Page background and text |
| `--border` | Border color |
| `--radius` | Global border radius (`0.625rem`) |
| `--chart-1` through `--chart-5` | Chart color palette |

### UI Components (`src/app/components/ui/`)

Over 50 reusable primitives including: `Button`, `Card`, `Dialog`, `AlertDialog`, `Table`, `Tabs`, `Badge`, `Form`, `Input`, `Select`, `Calendar`, `Accordion`, `Sheet`, `Drawer`, `Tooltip`, `Popover`, `DropdownMenu`, `Skeleton`, `Progress`, `Switch`, `Checkbox`, `RadioGroup`, `Sonner` (toasts), and more.

---

## Mock Data

All mock data is defined in `src/app/lib/mock-data.js`:

| Export | Description |
| --- | --- |
| `mockUsers` | 6 users — 3 applicants, 2 advisors, 1 admin |
| `mockApplications` | 8 applications across applicants with statuses, attachments, notes, flags, recommendations, and status history |
| `mockTickets` | 3 support tickets (Open, In Progress, Closed) |
| `mockCategories` | 5 categories (Technology, Consulting, Design, Research, Non-Profit) |
| `mockIssues` | 3 reported issues with priority levels and internal notes |
| `mockAuditLog` | 7 audit log entries for admin actions |

---

## Demo Accounts

Use these credentials on the login page, or click the quick-login buttons on the landing page:

| Role | Email | Password |
| --- | --- | --- |
| Applicant | `sarah.chen@email.com` | any value |
| Applicant | `marcus.j@email.com` | any value |
| Applicant | `aisha.p@email.com` | any value |
| Advisor | `emily.torres@university.edu` | any value |
| Advisor | `james.w@university.edu` | any value |
| Admin | `admin@appliflow.com` | any value |

> Since this is a frontend prototype, any password will work for the emails listed above.

---

## Accessibility

The application follows WCAG 2.1 AA basics:

- Keyboard navigable (all interactive elements)
- Strong color contrast ratios
- Labeled inputs with associated form labels
- ARIA attributes via Radix UI primitives
- Responsive layouts for desktop and mobile viewports
- Focus indicators for keyboard navigation

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

This project is private. See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) for third-party credits.

---

## Attributions

- UI components based on [shadcn/ui](https://ui.shadcn.com/) (MIT License)
- Photos from [Unsplash](https://unsplash.com) (Unsplash License)
  
