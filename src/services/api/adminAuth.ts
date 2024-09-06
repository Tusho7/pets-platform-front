import axiosInstance, { formDataInstance } from "../../plugins/axios/index";
import { UpdateAdminData } from "../../types/Admin";

export const registerAdmin = async (formData: FormData) => {
  return await formDataInstance.post("/api/admin-auth/register", formData);
};

export const forgotPassword = async (email: string) => {
  return await axiosInstance.post("/api/admin-auth/forgot-password", { email });
};

export const loginAdmin = async (email: string, password: string) => {
  return await axiosInstance.post("/api/admin-auth/login", { email, password });
};

export const logoutAdmin = async () => {
  return await axiosInstance.post("/api/admin-auth/logout");
};

export const updateAdmin = async (
  id: number,
  formData: Partial<UpdateAdminData>
) => {
  return await axiosInstance.put(
    `/api/admin-auth/update_admin/${id}`,
    formData
  );
};
