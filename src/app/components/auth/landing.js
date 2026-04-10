import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useAuth } from "../../lib/auth-context";
import { FileText, Clock, Users, Shield, ArrowRight } from "lucide-react";
export function Landing() {
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  const features = [
    { icon: FileText, title: "Track Everything", description: "Organize all your job, internship, and program applications in one place." },
    { icon: Clock, title: "Never Miss a Deadline", description: "Set reminders and get notified before important due dates." },
    { icon: Users, title: "Advisor Support", description: "Get guidance from career advisors who can review and flag your applications." },
    { icon: Shield, title: "Stay Organized", description: "Archive, filter, and search through your application history effortlessly." }
  ];
  const demoLogin = (role) => {
    switchRole(role);
    navigate(role === "applicant" ? "/applicant" : role === "advisor" ? "/advisor" : "/admin");
  };
  return <div className="min-h-screen bg-background">
      {
    /* Nav */
  }
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm">AF</span>
            </div>
            <span className="text-foreground">AppliFlow</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          </div>
        </div>
      </header>

      {
    /* Hero */
  }
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl mb-4 tracking-tight">
            Track Your Applications,<br />
            <span className="text-muted-foreground">Land Your Dream Role</span>
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            AppliFlow helps students and professionals manage job, internship, and program applications
            with deadline tracking, document management, and advisor support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" onClick={() => navigate("/signup")} className="gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
        </div>
      </section>

      {
    /* Features */
  }
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-12">Everything you need to stay on top of applications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => <div key={f.title} className="bg-card border rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="mb-2">{f.title}</h4>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {
    /* Demo Access */
  }
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <h3 className="mb-2">Quick Demo Access</h3>
          <p className="text-sm text-muted-foreground mb-6">Try AppliFlow instantly with a demo account</p>
          <div className="flex flex-col gap-2">
            <Button variant="outline" onClick={() => demoLogin("applicant")} className="justify-between">
              <span>Applicant Demo</span>
              <span className="text-xs text-muted-foreground">sarah.chen@email.com</span>
            </Button>
            <Button variant="outline" onClick={() => demoLogin("advisor")} className="justify-between">
              <span>Advisor Demo</span>
              <span className="text-xs text-muted-foreground">emily.torres@university.edu</span>
            </Button>
            <Button variant="outline" onClick={() => demoLogin("admin")} className="justify-between">
              <span>Admin Demo</span>
              <span className="text-xs text-muted-foreground">admin@appliflow.com</span>
            </Button>
          </div>
        </div>
      </section>

      {
    /* Footer */
  }
      <footer className="border-t py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          © 2026 AppliFlow. Built for students, by students.
        </div>
      </footer>
    </div>;
}
