"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
  login,
  signup,
  getCurrentUser,
} from "@/services/api";
import Cookies from "js-cookie";

interface AuthContextType {
  user: AuthResponse["user"] | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isAuthenticated = !!token && !!user;

  useEffect(() => {
    // Check for token in cookies on mount
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
      // Fetch user data
      getCurrentUser(storedToken)
        .then((data: AuthResponse) => {
          setUser(data.user);
        })
        .catch(() => {
          // If token is invalid, clear everything
          Cookies.remove("token");
          setToken(null);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      const response = await login(credentials);
      setUser(response.user);
      setToken(response.token);
      Cookies.set("token", response.token, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      localStorage.setItem("token", response.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    }
  };

  const handleSignup = async (credentials: SignupCredentials) => {
    try {
      setError(null);
      const response = await signup(credentials);
      setUser(response.user);
      setToken(response.token);
      Cookies.set("token", response.token, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      localStorage.setItem("token", response.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
      throw err;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isAuthenticated,
        login: handleLogin,
        signup: handleSignup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
