import axiosInstance from "../plugins/axios/index";

export const getTerms = async (language: string) => {
  return await axiosInstance.get(`/api/terms`, { params: { language } });
};
