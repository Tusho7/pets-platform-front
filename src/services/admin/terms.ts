import axiosInstance from "../../plugins/axios/index";
import { TermPropsForUpdate } from "../../types/Terms";

export const getTerms = async (language: string) => {
  return await axiosInstance.get(`/api/admin-auth/terms`, {
    params: { language },
  });
};

export const updateTerm = async (id: number, data: TermPropsForUpdate) => {
  return await axiosInstance.put(`/api/admin-auth/update-terms/${id}`, data);
};

export const deleteTermById = async (id: number) => {
  return await axiosInstance.delete(`/api/admin-auth/delete-terms/${id}`);
};
