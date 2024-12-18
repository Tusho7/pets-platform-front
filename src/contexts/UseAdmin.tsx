import { useContext } from "react";
import { AdminContext } from "./AdminContext";
import { AdminContextType } from "../types/Admin";

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within a AdminProvider");
  }
  return context;
};
