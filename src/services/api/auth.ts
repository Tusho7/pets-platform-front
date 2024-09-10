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

export const logoutUser = async () => {
  return await axiosInstance.post("/api/auth/logout");
};

export const updateUser = async (id: number, formData: FormData) => {
  return await formDataInstance.put(`/api/auth/update_user/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
