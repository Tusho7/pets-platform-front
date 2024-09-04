import axiosInstance from "../../plugins/axios/index";

export const getUser = async () => {
  return await axiosInstance.get("/api/auth/get_user");
};
