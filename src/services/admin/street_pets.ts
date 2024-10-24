import axiosInstance from "../../plugins/axios/index";

export const deleteStreetPetById = async (
    petId: number
  ) => {
    const response = await axiosInstance.delete(
      `/api/admin-auth/delete_street_pet/${petId}`
    );
    return response.data;
  };
  