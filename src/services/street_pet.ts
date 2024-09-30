import { formDataInstance } from "../plugins/axios/index";
import axiosInstance from "../plugins/axios/index";
import { StreetPet } from "../types/StreetPetProps";

export const createStreetPet = async (formData: FormData) => {
  const response = await formDataInstance.post(
    "/api/create-street-pet",
    formData
  );

  return response.data;
};

export const getStreetPets = async () => {
  const response = await axiosInstance.get("/api/street-pets");
  return response.data;
};

export const getStreetPetsByUserId = async (userId: string) => {
  const response = await axiosInstance.get(`/api/street-pet/${userId}`);
  return response.data;
};

export const deleteStreetPetByUserId = async (
  userId: string,
  petId: string
) => {
  const response = await axiosInstance.delete(
    `/api/street-pet/${userId}/${petId}`
  );
  return response.data;
};

export const updateStreetPetByUserId = async (
  formData: StreetPet,
  userId: number
) => {
  const response = await axiosInstance.put(
    `/api/street-pet/${userId}`,
    formData
  );

  return response.data;
};

export const deleteStreetPetImageById = async (
  petId: string,
  filename: string,
  userId: number
) => {
  const response = await axiosInstance.delete(
    `/api/street-pet/${petId}/${filename}/${userId}`
  );
  return response.data;
};

export const updateStreetPetImages = async (
  formData: FormData,
  petId: string,
  userId: number
) => {
  const response = await formDataInstance.put(
    `/api/street-pet/${petId}/${userId}`,
    formData
  );

  return response.data;
};
