# Project Structure — AppliFlow (Phase 4 Frontend)

This document provides a detailed, annotated breakdown of every file and folder in the project.

---

## Root Files

| File | Purpose |
| --- | --- |
| `index.html` | HTML entry point. Contains the `<div id="root">` mount point and loads `src/main.js` as a module. |
| `package.json` | Project metadata, dependencies, and npm scripts (`dev`, `build`). Uses `"type": "module"` for ESM. |
| `vite.config.js` | Vite build configuration. Includes a custom `jsxInJs()` plugin (allows JSX in `.js` files), the React plugin, Tailwind CSS plugin, and a `@` → `src/` path alias. |
| `postcss.config.mjs` | PostCSS configuration (empty — Tailwind CSS v4 handles all PostCSS setup via its Vite plugin). |
| `ATTRIBUTIONS.md` | Credits for third-party assets (shadcn/ui components, Unsplash photos). |
| `README.md` | Comprehensive project documentation with setup, architecture, and usage details. |
| `PROJECT_STRUCTURE.md` | This file — annotated file/folder reference. |

---

## `src/`

The main source directory containing all application code, styles, and documentation.

```
src/
├── main.js
├── imports/
├── styles/
└── app/
```

### `src/main.js`

Application entry point. Imports the root `<App />` component and global styles, then mounts the React tree into `#root` using `createRoot`.

---

### `src/imports/`

```
src/imports/
└── appliflow-requirements.md
```

| File | Purpose |
| --- | --- |
| `appliflow-requirements.md` | Full product requirements document. Defines roles & permissions, information architecture, visual style guidelines, global data model, all screens to generate (Auth, Applicant, Advisor, Admin), navigation structure, microinteractions, and UX states. |

---

### `src/styles/`

```
src/styles/
├── index.css
├── fonts.css
├── tailwind.css
└── theme.css
```

| File | Purpose |
| --- | --- |
| `index.css` | Master stylesheet — imports `fonts.css`, `tailwind.css`, and `theme.css` in order. |
| `fonts.css` | Font-face declarations (currently empty — ready for custom fonts). |
| `tailwind.css` | Tailwind CSS v4 configuration. Uses `@import 'tailwindcss' source(none)` with `@source` directive pointing to all JS/TS files. Imports `tw-animate-css` for animation utilities. |
| `theme.css` | CSS custom properties for the design system. Defines light mode (`:root`) and dark mode (`.dark`) variables for colors, spacing, typography, charts, and sidebar theming. Also contains base layer styles for `body`, focus rings, and scrollbar-free containers. |

---

### `src/app/`

The core application directory.

```
src/app/
├── App.js
├── routes.js
├── lib/
└── components/
```

| File | Purpose |
| --- | --- |
| `App.js` | Root React component. Wraps the entire app in `<AuthProvider>`, renders `<RouterProvider>` with all routes, adds the `<SessionExpiredBanner>` overlay and `<Toaster>` for global notifications. |
| `routes.js` | Defines all application routes using React Router v7's `createBrowserRouter`. Routes are organized into public (landing, login, signup, access-denied), applicant (`/applicant/*`), advisor (`/advisor/*`), and admin (`/admin/*`) groups. Protected routes are wrapped in `<RouteGuard>` with `allowedRoles`. |

---

### `src/app/lib/`

Shared logic and data.

```
src/app/lib/
├── auth-context.js
└── mock-data.js
```

| File | Purpose |
| --- | --- |
| `auth-context.js` | React Context for authentication. Provides `login()`, `signup()`, `logout()`, `switchRole()`, session timeout (15 min inactivity), and `sessionExpired` state. Exposes `useAuth()` hook. |
| `mock-data.js` | All mock/seed data for the prototype. Exports: `mockUsers` (6 users across 3 roles), `mockApplications` (8 applications with attachments, notes, flags, recommendations, status history), `mockTickets` (3 support tickets), `mockCategories` (5 categories), `mockIssues` (3 reported issues), `mockAuditLog` (7 admin actions). |

---

### `src/app/components/`

All React components, organized by domain.

```
src/app/components/
├── layout.js
├── admin/
├── advisor/
├── applicant/
├── auth/
├── figma/
└── ui/
```

| File | Purpose |
| --- | --- |
| `layout.js` | `<AppLayout>` — Shared page shell with a responsive top navigation bar. Renders role-specific nav items (Applicant: Dashboard/Applications/Archived; Advisor: Applicants; Admin: Overview/Users/Support/Categories/Issues/Audit Log). Includes mobile hamburger menu, role badge, user name, and logout button. Child pages render via `<Outlet>`. |

---

### `src/app/components/admin/` — Admin Portal

6 components powering the platform administration interface.

```
admin/
├── admin-dashboard.js
├── audit-log.js
├── categories.js
├── reported-issues.js
├── support-inbox.js
└── user-management.js
```

| File | Component | Description |
| --- | --- | --- |
| `admin-dashboard.js` | `AdminDashboard` | Platform overview with key metrics (total users, applications, open tickets). Bar chart for application statuses and pie charts for types/user roles using Recharts. Loading skeleton states. Date range awareness. |
| `user-management.js` | `UserManagement` | User list table with search. Color-coded role badges (applicant/blue, advisor/amber, admin/purple). Actions: delete user (confirmation dialog), reset password. User profile detail drawer. |
| `support-inbox.js` | `SupportInbox` | Ticket list with status filtering (Open/In Progress/Closed). Ticket detail view with response composer and status update dropdown. Color-coded priority and status badges. Toast notifications for actions. |
| `categories.js` | `CategoriesManagement` | CRUD interface for application categories. Dialog for create/edit with name uniqueness validation. Delete protection when category is in use. Shows usage count per category. |
| `reported-issues.js` | `ReportedIssues` | Issues queue with status (New/Investigating/Resolved/Dismissed) and priority (Low/Medium/High/Critical). Detail view with internal notes and history timeline. Status and priority update dropdowns. |
| `audit-log.js` | `AuditLog` | Read-only table of admin actions. Columns: timestamp, actor, action type, details. Color-coded action badges. Responsive layout with hidden details on mobile. |

---

### `src/app/components/advisor/` — Advisor Portal

3 components for the career advisor/mentor experience.

```
advisor/
├── advisor-detail.js
├── advisor-home.js
└── applicant-profile.js
```

| File | Component | Description |
| --- | --- | --- |
| `advisor-home.js` | `AdvisorHome` | Applicant search interface. Search by name/email. Card grid showing applicants with stats (active applications, upcoming deadlines). Permission checking — locked state for unauthorized applicants. |
| `applicant-profile.js` | `ApplicantProfile` | Read-only applicant summary. Avatar, name, email, join date. Status count breakdown (Draft/Applied/Interview/Accepted/Rejected). Links to individual application detail views. Permission-gated access. |
| `advisor-detail.js` | `AdvisorApplicationDetail` | Multi-tab application review. Tabs: Overview, Deadlines, Documents, Notes & Flags, Recommendations. Advisors can add flags (positive/review/concern) with notes, and write actionable recommendations. Status and timeline view. |

---

### `src/app/components/applicant/` — Applicant Portal

4 components for the core applicant experience.

```
applicant/
├── application-detail.js
├── application-form.js
├── applications-list.js
└── dashboard.js
```

| File | Component | Description |
| --- | --- | --- |
| `dashboard.js` | `ApplicantDashboard` | Overview page with status count cards (Draft/Applied/Interview/Accepted/Rejected), upcoming deadlines list with urgency badges, and a prominent "Add Application" CTA button. Skeleton loading state. |
| `applications-list.js` | `ApplicationsList` | Searchable, filterable list of applications. Search across title/organization. Dropdown filters for type and status. Sort by deadline or last updated. Color-coded status badges. Empty state with CTA. Archive button on each item. Supports `archived` prop for archived list view. |
| `application-form.js` | `ApplicationForm` | Create/edit form with fields: title, organization, type (dropdown), status, deadline (datetime picker). Inline validation for required fields and past dates. Handles both new and edit modes via route params. Redirects to applications list on save. |
| `application-detail.js` | `ApplicationDetail` | Tabbed detail page. **Overview** — core fields with quick status update dropdown. **Deadlines & Reminders** — set deadline, configure reminders (7d/1d/1h). **Documents** — file upload, attachment list with download actions. **Notes & Follow-ups** — add notes with optional follow-up dates, timeline view. Actions: edit, delete (with confirmation), archive/restore. Toast notifications. |

---

### `src/app/components/auth/` — Authentication

6 components handling auth flows and access control.

```
auth/
├── access-denied.js
├── landing.js
├── login.js
├── route-guard.js
├── session-expired.js
└── signup.js
```

| File | Component | Description |
| --- | --- | --- |
| `landing.js` | `Landing` | Public marketing page. Feature highlights (Track Everything, Never Miss a Deadline, Advisor Support, Stay Organized). Top nav with branding, Login/Sign Up buttons. Demo quick-login buttons for all three roles. |
| `login.js` | `Login` | Email/password form. Email format validation and required field checks. Error messages for failed login attempts. Loading state on submit. Redirects to role-appropriate dashboard on success. |
| `signup.js` | `SignUp` | Registration form (name, email, password, confirm password). Password strength indicators (8+ chars, uppercase, number). Real-time validation feedback. Duplicate email check. Success state and redirect. |
| `route-guard.js` | `RouteGuard` | Higher-order component for route protection. Checks authentication status → redirects to `/login`. Validates role against `allowedRoles` array → redirects to `/access-denied`. Renders children if authorized. |
| `access-denied.js` | `AccessDenied` | Error page for unauthorized access. ShieldAlert icon, "Access Denied" heading, descriptive message, and a back button. |
| `session-expired.js` | `SessionExpiredBanner` | Full-screen overlay with backdrop blur. Shown after 15 minutes of inactivity. Clock icon, timeout message, and "Sign In" button. Dismisses on re-authentication. |

---

### `src/app/components/figma/` — Figma Helpers

```
figma/
└── ImageWithFallback.js
```

| File | Purpose |
| --- | --- |
| `ImageWithFallback.js` | Utility component for rendering images with a fallback when the source fails to load. Used for robust image display throughout the app. |

---

### `src/app/components/ui/` — Reusable UI Primitives

50+ components forming the design system foundation. Based on [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives.

```
ui/
├── accordion.js          # Expandable/collapsible sections
├── alert-dialog.js       # Modal confirmation dialogs
├── alert.js              # Inline alert banners
├── aspect-ratio.js       # Constrained aspect ratio container
├── avatar.js             # User avatar with image + fallback
├── badge.js              # Status/label badges with variants
├── breadcrumb.js         # Navigation breadcrumbs
├── button.js             # Button with variants (default, secondary, destructive, outline, ghost, link)
├── calendar.js           # Date picker calendar (react-day-picker)
├── card.js               # Card container (header, content, footer)
├── carousel.js           # Image/content carousel (embla-carousel)
├── chart.js              # Chart container and tooltip helpers (recharts)
├── checkbox.js           # Checkbox input
├── collapsible.js        # Collapsible content section
├── command.js            # Command palette / combobox (cmdk)
├── context-menu.js       # Right-click context menu
├── dialog.js             # Modal dialog
├── drawer.js             # Bottom drawer (vaul)
├── dropdown-menu.js      # Dropdown menu with items/groups
├── form.js               # Form primitives (react-hook-form integration)
├── hover-card.js         # Hover-triggered popup card
├── input-otp.js          # One-time password input
├── input.js              # Text input field
├── label.js              # Form label
├── menubar.js            # Horizontal menu bar
├── navigation-menu.js    # Navigation menu with dropdowns
├── pagination.js         # Page navigation controls
├── popover.js            # Popover overlay
├── progress.js           # Progress bar
├── radio-group.js        # Radio button group
├── resizable.js          # Resizable panels (react-resizable-panels)
├── scroll-area.js        # Custom scroll container
├── select.js             # Dropdown select
├── separator.js          # Visual divider line
├── sheet.js              # Side panel / sheet overlay
├── sidebar.js            # Sidebar navigation component
├── skeleton.js           # Loading placeholder skeleton
├── slider.js             # Range slider
├── sonner.js             # Toast notification provider (sonner)
├── switch.js             # Toggle switch
├── table.js              # Table primitives (header, body, row, cell)
├── tabs.js               # Tab navigation
├── textarea.js           # Multi-line text input
├── toggle-group.js       # Group of toggle buttons
├── toggle.js             # Single toggle button
├── tooltip.js            # Hover tooltip
├── use-mobile.js         # Hook: `useIsMobile()` — returns true when viewport ≤ 768px
└── utils.js              # `cn()` utility — merges Tailwind classes via clsx + tailwind-merge
```

---

## Dependency Graph (Simplified)

```
main.js
  ├── styles/index.css ──→ fonts.css, tailwind.css, theme.css
  └── app/App.js
        ├── lib/auth-context.js ──→ lib/mock-data.js
        ├── routes.js
        │     ├── components/layout.js ──→ ui/*
        │     ├── components/auth/* ──→ lib/auth-context.js, ui/*
        │     ├── components/applicant/* ──→ lib/auth-context.js, lib/mock-data.js, ui/*
        │     ├── components/advisor/* ──→ lib/auth-context.js, lib/mock-data.js, ui/*
        │     └── components/admin/* ──→ lib/mock-data.js, ui/*
        ├── components/auth/session-expired.js
        └── components/ui/sonner.js
```

---

## Key Conventions

| Convention | Details |
| --- | --- |
| **File naming** | Lowercase kebab-case for all files (e.g., `application-detail.js`) |
| **JSX in `.js`** | A custom Vite plugin (`jsxInJs`) enables JSX syntax in `.js` files instead of `.jsx` |
| **Path alias** | `@` resolves to `src/` — e.g., `import { cn } from "@/app/components/ui/utils"` |
| **Component exports** | Named exports for all components (e.g., `export function AdminDashboard()`) |
| **State management** | React Context for auth; `useState`/`useCallback` for local state; no Redux or Zustand |
| **Styling** | Tailwind CSS utility classes + CSS custom properties for theming; `cn()` for conditional class merging |
| **Icons** | Lucide React icon library throughout |
| **Notifications** | Sonner toast library via `<Toaster>` in App.js |
