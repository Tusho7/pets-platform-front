import { formDataInstance } from "../plugins/axios/index";
import axiosInstance from "../plugins/axios/index";

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
