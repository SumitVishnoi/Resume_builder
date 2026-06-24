"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  hydrateUser: () => Promise<void>;
}

const Auth = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const hydrateUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hydrateUser(); // eslint error
  }, []);

  return (
    <Auth.Provider
      value={{
        user,
        setUser,
        loading,
        hydrateUser,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(Auth);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};