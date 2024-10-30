import axiosInstance from "../../plugins/axios/index";

export const deleteLostPetById = async (
    petId: number
  ) => {
    const response = await axiosInstance.delete(
      `/api/admin-auth/delete_lost_pet/${petId}`
    );
    return response.data;
  };
  