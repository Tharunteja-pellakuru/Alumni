import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("alumnii_user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("alumnii_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("alumnii_user");
    }
  }, [user]);

  const login = (userData) => {
    // Expect an object with at least { email, name }
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (patch) => {
    setUser((prev) => ({ ...(prev || {}), ...patch }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
