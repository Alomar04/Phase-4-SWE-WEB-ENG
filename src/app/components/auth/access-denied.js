import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { ShieldAlert } from "lucide-react";
export function AccessDenied() {
  const navigate = useNavigate();
  return <div className="text-center py-20">
      <ShieldAlert className="w-16 h-16 mx-auto text-destructive mb-4" />
      <h1 className="mb-2">Access Denied</h1>
      <p className="text-muted-foreground mb-6">You do not have permission to view this page.</p>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>;
}
