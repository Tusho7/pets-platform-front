import { formDataInstance } from "../plugins/axios/index";
import axiosInstance from "../plugins/axios/index";
import { LostPet } from "../types/LostPetProps";

export const createLostPet = async (formData: FormData) => {
  const response = await formDataInstance.post(
    "/api/create-lost-pet",
    formData
  );

  return response.data;
};

export const getLostPets = async () => {
  const response = await axiosInstance.get("/api/lost-pets");
  return response.data;
};

export const getLostPetsByUserId = async (userId: string) => {
  const response = await axiosInstance.get(`/api/lost-pet/${userId}`);
  return response.data;
};

export const updateLostPetByUserId = async (
  formData: LostPet,
  userId: number
) => {
  const response = await axiosInstance.put(`/api/lost-pet/${userId}`, formData);

  return response.data;
};
