import { Outlet, useNavigate, useLocation } from "react-router";
import { useAuth } from "../lib/auth-context";
import { Button } from "./ui/button";
import {
  LayoutDashboard,
  FileText,
  Archive,
  Users,
  BarChart3,
  Headphones,
  Tags,
  AlertTriangle,
  ClipboardList,
  LogOut,
  Menu,
  X,
  ShieldAlert
} from "lucide-react";
import { useState } from "react";
export function AppLayout() {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  if (!isAuthenticated || !currentUser) {
    return <Outlet />;
  }
  const role = currentUser.role;
  const navItems = role === "applicant" ? [
    { label: "Dashboard", path: "/applicant", icon: LayoutDashboard },
    { label: "Applications", path: "/applicant/applications", icon: FileText },
    { label: "Archived", path: "/applicant/archived", icon: Archive }
  ] : role === "advisor" ? [
    { label: "Applicants", path: "/advisor", icon: Users }
  ] : [
    { label: "Overview", path: "/admin", icon: BarChart3 },
    { label: "Users", path: "/admin/users", icon: Users },
    { label: "Support", path: "/admin/support", icon: Headphones },
    { label: "Categories", path: "/admin/categories", icon: Tags },
    { label: "Issues", path: "/admin/issues", icon: AlertTriangle },
    { label: "Audit Log", path: "/admin/audit", icon: ClipboardList }
  ];
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const isActive = (path) => location.pathname === path;
  return <div className="min-h-screen bg-background flex flex-col">
      {
    /* Top Nav */
  }
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <button
    onClick={() => navigate(role === "applicant" ? "/applicant" : role === "advisor" ? "/advisor" : "/admin")}
    className="flex items-center gap-2 cursor-pointer"
  >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm">AF</span>
              </div>
              <span className="hidden sm:inline text-foreground">AppliFlow</span>
            </button>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => <button
    key={item.path}
    onClick={() => navigate(item.path)}
    className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors ${isActive(item.path) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"}`}
  >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>)}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-secondary">
                <ShieldAlert className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground capitalize">{role}</span>
              </div>
              <span className="text-sm text-muted-foreground">{currentUser.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden sm:flex items-center gap-1">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
            <button
    className="md:hidden p-2 cursor-pointer"
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    aria-label="Toggle menu"
  >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {
    /* Mobile Menu */
  }
        {mobileMenuOpen && <div className="md:hidden border-t bg-card px-4 py-3 space-y-1">
            {navItems.map((item) => <button
    key={item.path}
    onClick={() => {
      navigate(item.path);
      setMobileMenuOpen(false);
    }}
    className={`flex items-center gap-2 w-full px-3 py-2 rounded-md cursor-pointer transition-colors ${isActive(item.path) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50"}`}
  >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>)}
            <div className="border-t pt-2 mt-2">
              <div className="flex items-center gap-2 px-3 py-1 text-sm text-muted-foreground">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span className="capitalize">{role}</span>
                <span>· {currentUser.name}</span>
              </div>
              <button
    onClick={handleLogout}
    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md cursor-pointer"
  >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>}
      </header>
      {
    /* Main Content */
  }
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>;
}
