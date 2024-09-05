import axiosInstance, { formDataInstance } from "../../plugins/axios/index";

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
