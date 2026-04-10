import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./lib/auth-context";
import { SessionExpiredBanner } from "./components/auth/session-expired";
import { Toaster } from "./components/ui/sonner";
export default function App() {
  return <AuthProvider>
      <RouterProvider router={router} />
      <SessionExpiredBanner />
      <Toaster position="bottom-right" />
    </AuthProvider>;
}
