import axiosInstance from "../plugins/axios/index";

export const getFaqs = async (language: string) => {
  return await axiosInstance.get(`/api/faqs`, { params: { language } });
};
