import { formDataInstance } from "../plugins/axios/index";
import axiosInstance from "../plugins/axios/index";

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
