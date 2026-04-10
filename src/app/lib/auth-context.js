import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { mockUsers } from "./mock-data";
const AuthContext = createContext(null);
const SESSION_TIMEOUT = 15 * 60 * 1e3;
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const timerRef = useRef(null);
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (currentUser) {
      timerRef.current = setTimeout(() => {
        setCurrentUser(null);
        setSessionExpired(true);
      }, SESSION_TIMEOUT);
    }
  }, [currentUser]);
  useEffect(() => {
    if (!currentUser) return;
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();
    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentUser, resetTimer]);
  const login = (email, _password) => {
    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      setCurrentUser(user);
      setSessionExpired(false);
      return { success: true };
    }
    return { success: false, error: "Invalid email or password. Please try again." };
  };
  const signup = (name, email, _password) => {
    if (mockUsers.find((u) => u.email === email)) {
      return { success: false, error: "An account with this email already exists." };
    }
    const newUser = {
      id: `u${Date.now()}`,
      name,
      email,
      role: "applicant",
      createdAt: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    };
    setCurrentUser(newUser);
    setSessionExpired(false);
    return { success: true };
  };
  const logout = () => {
    setCurrentUser(null);
    setSessionExpired(false);
  };
  const switchRole = (role) => {
    const user = mockUsers.find((u) => u.role === role);
    if (user) setCurrentUser(user);
  };
  const dismissSessionExpired = () => setSessionExpired(false);
  return <AuthContext.Provider
    value={{ currentUser, isAuthenticated: !!currentUser, login, signup, logout, switchRole, sessionExpired, dismissSessionExpired }}
  >
      {children}
    </AuthContext.Provider>;
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
