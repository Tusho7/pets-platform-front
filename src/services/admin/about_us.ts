import axiosInstance from "../../plugins/axios/index";

export const getAboutUs = async (language: string) => {
  return await axiosInstance.get(`/api/about_us`, { params: { language } });
};
