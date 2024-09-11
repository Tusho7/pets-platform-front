import axios from "axios";

export const createLostPet = async (formData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/create-lost-pet`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to create lost pet:", error);
    throw error;
  }
};
