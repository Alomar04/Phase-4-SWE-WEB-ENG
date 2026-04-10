Design a responsive web app called “AppliFlow” for tracking job/internship/program applications.

ROLES & PERMISSIONS
- Roles: Applicant (main user), Career Advisor (Mentor), Platform Manager (Admin).  [oai_citation:1‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
- Enforce role-based access: Applicants cannot access Admin pages; Advisors only see permitted applicants.  [oai_citation:2‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)

INFORMATION ARCHITECTURE (create 3 areas + shared auth)
1) Shared: Authentication
2) Applicant Portal
3) Advisor Portal
4) Admin Portal

VISUAL STYLE
- Clean, modern, student-friendly SaaS UI.
- Use a simple design system: Primary button, Secondary button, Destructive button, Inputs, Selects, Date/time picker, Toasts, Empty states, Confirm dialogs, Tabs, Badges, Tables, Cards.
- Accessibility basics: keyboard navigable, strong contrast, labeled inputs (WCAG 2.1 AA basics).  [oai_citation:3‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
- Responsive layouts for desktop + mobile.  [oai_citation:4‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)

GLOBAL DATA MODEL (use realistic sample data)
Application fields:
- Title / Opportunity name (required)
- Organization (required)
- Type (dropdown): Job, Internship, Organization, Program  [oai_citation:5‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)  [oai_citation:6‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
- Status (dropdown): Draft, Applied, Interview, Accepted, Rejected (plus allow “Other” if needed)  [oai_citation:7‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
- Deadline date/time (date-time picker)  [oai_citation:8‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
- Attachments (CV/supporting docs): file upload with file type/size validation (PDF/DOCX, max size note)  [oai_citation:9‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)  [oai_citation:10‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
- Notes / follow-up logs (text + optional follow-up date) shown in a timeline/history area  [oai_citation:11‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
- Reminder settings (7 days / 1 day / 1 hour before, configurable)  [oai_citation:12‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
- Archived flag (separate archived list)  [oai_citation:13‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)

PERFORMANCE/UX CONSTRAINTS (reflect in UI copy & feedback)
- Key actions should feel fast; use skeleton loading and clear empty states. (Target: most actions within 5 seconds)  [oai_citation:14‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
- Search/filter should handle up to 1,000 apps; include fast filter UX.  [oai_citation:15‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
- Session security: show auto-logout messaging or “Session expired” screen (15 min inactivity requirement)  [oai_citation:16‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)

SCREENS TO GENERATE (make desktop + mobile variants)
A) AUTH (Shared)  [oai_citation:17‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
1. Sign Up (Name, Email, Password + password policy hint; success confirmation state)
2. Login (Email, Password; error state)
3. Logged-out landing (light marketing + “Sign up” / “Login”)

B) APPLICANT PORTAL
1. Applicant Dashboard (overview widgets)
   - Widgets: counts by status + “Upcoming deadlines” list with due date/time and urgency badge  [oai_citation:18‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
   - Primary CTA: “Add Application” (very visible)  [oai_citation:19‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
2. Applications List
   - Table or card list with: Title, Organization, Type, Status badge, Deadline, Last updated
   - Search bar + Filters (Type, Status, Date) + Sort (Deadline, Status update)  [oai_citation:20‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
   - Bulk/quick actions optional: Archive
   - Empty state with CTA
3. Add / Edit Application (form page or modal)
   - Fields: Title, Organization, Type, Status, Deadline  [oai_citation:21‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
   - Validation states for required fields and invalid dates
4. Application Detail (use tabs)
   - Overview tab: core fields + status dropdown (quick status update)  [oai_citation:22‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
   - Deadlines & Reminders tab: set deadline + configure reminders (7d/1d/1h)  [oai_citation:23‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
   - Documents tab: upload + list attachments + download/view actions  [oai_citation:24‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
   - Notes & Follow-ups tab: add note, optional follow-up date; show timeline/history  [oai_citation:25‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
   - Actions: Edit, Delete (with confirmation dialog)  [oai_citation:26‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
   - Archive action (with confirmation) and Archived indicator  [oai_citation:27‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
5. Archived Applications List
   - Similar list UI, with “Restore to active” optional

C) ADVISOR PORTAL (Mentor)
1. Advisor Home / Applicant Search
   - Search/select an applicant profile (with permission/locked states)  [oai_citation:28‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
2. Applicant Profile (read-only)
   - Summary + “Applications” section entry point  [oai_citation:29‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
3. Advisor View: Applicant Applications List
   - Similar list UI; show upcoming deadlines emphasis  [oai_citation:30‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
4. Advisor View: Application Detail (Advisor capabilities)
   - Progress/status view + indicators  [oai_citation:31‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
   - Deadlines view  [oai_citation:32‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
   - Documents review (open/download)  [oai_citation:33‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
   - Flags: “Flag item” with flag type + optional notes; show flag chips on the record  [oai_citation:34‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
   - History timeline (status changes + key events)  [oai_citation:35‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
   - Recommendations composer: write actionable guidance, submit, triggers “Applicant notification” banner/state  [oai_citation:36‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)

D) ADMIN PORTAL (Platform Manager)
1. Admin Dashboard
   - Platform stats summary + charts/tables (users/applications; date range filter)  [oai_citation:37‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
2. User Management
   - User list table; user profile drawer
   - Actions: Delete user account (confirm destructive), Reset password  [oai_citation:38‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
3. Support Inbox
   - Ticket list (Open/In progress/Closed), ticket detail with response composer and status update  [oai_citation:39‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
4. Categories Management
   - CRUD category list used by applicants; validate unique name; prevent delete-if-in-use warning state  [oai_citation:40‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
5. Reported Issues Queue
   - List with status/priority + internal notes, history log UI  [oai_citation:41‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)
6. Audit Log (simple table)
   - Show timestamp, actor, action for admin actions  [oai_citation:42‡APPLIFLOW-3-Requirements.docx](sediment://file_00000000b6a0720aa6a48ec422139c71)

NAVIGATION
- Shared top nav with role-based items.
- Applicant: Dashboard, Applications, Archived, Settings (optional), Logout.
- Advisor: Applicants, Selected Applicant (Profile/Applications), Logout.
- Admin: Overview, Users, Support, Categories, Issues, Audit Log, Logout.

MICROINTERACTIONS & STATES (must include)
- Loading skeletons for dashboard widgets and lists.
- Empty states for no applications, no search results, no tickets.
- Form validation errors for required fields, invalid email, invalid date, invalid login.
- Confirm dialogs for delete/archive and admin destructive actions.
- “Access denied” screen for role/permission failures.

DELIVERABLE IN FIGMA
- Create a page per area: Auth, Applicant, Advisor, Admin.
- For each key screen, generate a desktop frame (1440w) + mobile frame (390w).
- Create reusable components for buttons, inputs, badges, table rows, cards, modals, tabs, toast notifications.
- Use consistent spacing (8px grid) and a simple typography scale.