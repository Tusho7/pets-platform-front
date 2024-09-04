import axiosInstance, { formDataInstance } from "../../plugins/axios/index";

export const registerUser = async (formData: FormData) => {
  return await formDataInstance.post("/api/auth/register", formData);
};

export const forgotPassword = async (email: string) => {
  return await axiosInstance.post("/api/auth/forgot-password", { email });
};

export const loginUser = async (email: string, password: string) => {
  return await axiosInstance.post("/api/auth/login", { email, password });
};
