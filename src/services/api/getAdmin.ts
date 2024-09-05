import axiosInstance from "../../plugins/axios/index";

export const getAdmin = async () => {
  return await axiosInstance.get("/api/admin-auth/get_admin");
};
