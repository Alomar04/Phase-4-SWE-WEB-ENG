import { createBrowserRouter } from "react-router";
import { AppLayout } from "./components/layout";
import { Landing } from "./components/auth/landing";
import { Login } from "./components/auth/login";
import { SignUp } from "./components/auth/signup";
import { AccessDenied } from "./components/auth/access-denied";
import { RouteGuard } from "./components/auth/route-guard";
import { ApplicantDashboard } from "./components/applicant/dashboard";
import { ApplicationsList } from "./components/applicant/applications-list";
import { ApplicationForm } from "./components/applicant/application-form";
import { ApplicationDetail } from "./components/applicant/application-detail";
import { AdvisorHome } from "./components/advisor/advisor-home";
import { ApplicantProfile } from "./components/advisor/applicant-profile";
import { AdvisorApplicationDetail } from "./components/advisor/advisor-detail";
import { AdminDashboard } from "./components/admin/admin-dashboard";
import { UserManagement } from "./components/admin/user-management";
import { SupportInbox } from "./components/admin/support-inbox";
import { CategoriesManagement } from "./components/admin/categories";
import { ReportedIssues } from "./components/admin/reported-issues";
import { AuditLog } from "./components/admin/audit-log";
function NotFound() {
  return <div className="text-center py-20">
      <h1 className="mb-2">404</h1>
      <p className="text-muted-foreground">Page not found</p>
    </div>;
}
export const router = createBrowserRouter([
  // Public routes
  { path: "/", Component: Landing },
  { path: "/login", Component: Login },
  { path: "/signup", Component: SignUp },
  { path: "/access-denied", Component: AccessDenied },
  // Applicant routes
  {
    path: "/applicant",
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <RouteGuard allowedRoles={["applicant"]}>
            <ApplicantDashboard />
          </RouteGuard>
      },
      {
        path: "applications",
        element: <RouteGuard allowedRoles={["applicant"]}>
            <ApplicationsList />
          </RouteGuard>
      },
      {
        path: "applications/new",
        element: <RouteGuard allowedRoles={["applicant"]}>
            <ApplicationForm />
          </RouteGuard>
      },
      {
        path: "applications/:id",
        element: <RouteGuard allowedRoles={["applicant"]}>
            <ApplicationDetail />
          </RouteGuard>
      },
      {
        path: "applications/:id/edit",
        element: <RouteGuard allowedRoles={["applicant"]}>
            <ApplicationForm />
          </RouteGuard>
      },
      {
        path: "archived",
        element: <RouteGuard allowedRoles={["applicant"]}>
            <ApplicationsList archived />
          </RouteGuard>
      }
    ]
  },
  // Advisor routes
  {
    path: "/advisor",
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <RouteGuard allowedRoles={["advisor"]}>
            <AdvisorHome />
          </RouteGuard>
      },
      {
        path: "applicant/:userId",
        element: <RouteGuard allowedRoles={["advisor"]}>
            <ApplicantProfile />
          </RouteGuard>
      },
      {
        path: "applicant/:userId/application/:appId",
        element: <RouteGuard allowedRoles={["advisor"]}>
            <AdvisorApplicationDetail />
          </RouteGuard>
      }
    ]
  },
  // Admin routes
  {
    path: "/admin",
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <RouteGuard allowedRoles={["admin"]}>
            <AdminDashboard />
          </RouteGuard>
      },
      {
        path: "users",
        element: <RouteGuard allowedRoles={["admin"]}>
            <UserManagement />
          </RouteGuard>
      },
      {
        path: "support",
        element: <RouteGuard allowedRoles={["admin"]}>
            <SupportInbox />
          </RouteGuard>
      },
      {
        path: "categories",
        element: <RouteGuard allowedRoles={["admin"]}>
            <CategoriesManagement />
          </RouteGuard>
      },
      {
        path: "issues",
        element: <RouteGuard allowedRoles={["admin"]}>
            <ReportedIssues />
          </RouteGuard>
      },
      {
        path: "audit",
        element: <RouteGuard allowedRoles={["admin"]}>
            <AuditLog />
          </RouteGuard>
      }
    ]
  },
  { path: "*", Component: NotFound }
]);
