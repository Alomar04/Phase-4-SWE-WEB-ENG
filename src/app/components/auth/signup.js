import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../lib/auth-context";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const passwordChecks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Contains uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "Contains a number", valid: /\d/.test(password) }
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    if (!passwordChecks.every((c) => c.valid)) {
      setError("Password does not meet requirements.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = signup(name, email, password);
      setLoading(false);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate("/applicant"), 1500);
      } else {
        setError(result.error || "Sign up failed.");
      }
    }, 500);
  };
  if (success) {
    return <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="mb-2">Account Created!</h1>
          <p className="text-sm text-muted-foreground">Welcome to AppliFlow. Redirecting you to your dashboard...</p>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm">AF</span>
            </div>
            <span className="text-foreground">AppliFlow</span>
          </Link>
          <h1 className="mb-1">Create your account</h1>
          <p className="text-sm text-muted-foreground">Start tracking your applications today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm" role="alert">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>}
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            {password && <ul className="space-y-1 mt-2">
                {passwordChecks.map((c) => <li key={c.label} className={`flex items-center gap-1.5 text-xs ${c.valid ? "text-green-600" : "text-muted-foreground"}`}>
                    <CheckCircle2 className="w-3 h-3" />
                    {c.label}
                  </li>)}
              </ul>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input id="confirm" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-foreground underline underline-offset-2 hover:text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>;
}
