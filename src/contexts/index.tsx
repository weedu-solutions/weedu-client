import React from "react";
import { AuthProvider } from "./auth";
import { UserProvider } from "./user";

export const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
};
