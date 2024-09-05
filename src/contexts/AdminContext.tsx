import { createContext, useState, useEffect, ReactNode } from "react";
import { getAdmin } from "../services/api/getAdmin";
import { AdminContextType, Admin } from "../types/Admin";

export const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      const isLogin = localStorage.getItem("isAdminLogin") === "true";
      if (isLogin) {
        const { data } = await getAdmin();
        setAdmin(data);
      }
    };

    initializeUser();
  }, [setAdmin]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
