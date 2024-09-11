import { formDataInstance } from "../plugins/axios/index";

export const createLostPet = async (formData: FormData) => {
  const response = await formDataInstance.post(
    "/api/create-lost-pet",
    formData
  );

  return response.data;
};
