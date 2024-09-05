import axiosInstance from "../../plugins/axios/index";

export const getAboutUs = async (language: string) => {
  return await axiosInstance.get(`/api/admin-auth/about_us`, {
    params: { language },
  });
};

export const updateAboutUs = async (
  id: string,
  data: {
    title: string;
    introductionOverview?: string;
    missionStatement?: string;
    historyBackground?: string;
    foundingStory?: string;
    features?: string[];
    howItWorks?: string;
    languageCode: string;
  }
) => {
  return await axiosInstance.post(`/api/admin-auth/update-aboutus/${id}`, data);
};
