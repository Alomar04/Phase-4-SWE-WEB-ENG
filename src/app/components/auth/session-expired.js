import { useAuth } from "../../lib/auth-context";
import { Button } from "../ui/button";
import { Clock } from "lucide-react";
export function SessionExpiredBanner() {
  const { sessionExpired, dismissSessionExpired } = useAuth();
  if (!sessionExpired) return null;
  return <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border rounded-xl p-8 max-w-sm text-center shadow-lg">
        <Clock className="w-12 h-12 mx-auto text-amber-500 mb-4" />
        <h2 className="mb-2">Session Expired</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Your session has expired due to 15 minutes of inactivity. Please sign in again to continue.
        </p>
        <Button
    onClick={() => {
      dismissSessionExpired();
      window.location.href = "/login";
    }}
    className="w-full"
  >
          Sign In Again
        </Button>
      </div>
    </div>;
}
