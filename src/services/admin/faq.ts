import axiosInstance from "../../plugins/axios/index";

export const getFaqs = async (language: string) => {
  return await axiosInstance.get(`/api/admin-auth/faq`, {
    params: { language },
  });
};

export const updateFaq = async (id: number, data: any) => {
  return await axiosInstance.put(`/api/admin-auth/update-faq/${id}`, data);
};

export const deleteFaqById = async (id: number) => {
  return await axiosInstance.delete(`/api/admin-auth/delete-faq/${id}`);
};
