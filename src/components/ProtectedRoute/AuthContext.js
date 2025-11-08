import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem("resumeAuthToken");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Hardcoded credentials
    const validCredentials = {
      email: "intern@demo.com",
      password: "pass123",
    };

    if (
      email === validCredentials.email &&
      password === validCredentials.password
    ) {
      const token = "demo-auth-token";
      localStorage.setItem("resumeAuthToken", token);
      setIsAuthenticated(true);
      return { success: true };
    } else {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("resumeAuthToken");
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
