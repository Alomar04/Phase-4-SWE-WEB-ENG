import { Navigate } from "react-router";
import { useAuth } from "../../lib/auth-context";
export function RouteGuard({ allowedRoles, children }) {
  const { currentUser, isAuthenticated } = useAuth();
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/access-denied" replace />;
  }
  return <>{children}</>;
}
