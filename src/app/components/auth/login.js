import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../lib/auth-context";
import { mockUsers } from "../../lib/mock-data";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AlertCircle } from "lucide-react";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.success) {
        const user = mockUsers.find((u) => u.email === email);
        const role = user?.role || "applicant";
        const roleRoutes = {
          applicant: "/applicant",
          advisor: "/advisor",
          admin: "/admin"
        };
        navigate(roleRoutes[role] || "/applicant");
      } else {
        setError(result.error || "Login failed.");
      }
    }, 500);
  };
  return <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm">AF</span>
            </div>
            <span className="text-foreground">AppliFlow</span>
          </Link>
          <h1 className="mb-1">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm" role="alert">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
    id="email"
    type="email"
    placeholder="you@example.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    autoComplete="email"
  />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
    id="password"
    type="password"
    placeholder="••••••••"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    autoComplete="current-password"
  />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-foreground underline underline-offset-2 hover:text-primary">
            Sign up
          </Link>
        </p>

        {
    /* Demo hint */
  }
        <div className="mt-8 p-3 rounded-lg bg-muted text-sm text-muted-foreground">
          <p className="mb-2">Demo accounts:</p>
          <ul className="space-y-1 text-xs">
            <li>Applicant: sarah.chen@email.com</li>
            <li>Advisor: emily.torres@university.edu</li>
            <li>Admin: admin@appliflow.com</li>
          </ul>
          <p className="text-xs mt-1">(any password works)</p>
        </div>
      </div>
    </div>;
}
