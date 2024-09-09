import axiosInstance from "../../plugins/axios/index";

export const getUsers = async () => {
  return await axiosInstance.get("/api/admin-auth/users");
};

export const toggleUserBlock = async (id: number) => {
  return await axiosInstance.patch(`/api/admin-auth/toggle_block_user/${id}`);
};

export const deleteUserById = async (id: number) => {
  return await axiosInstance.delete(`/api/admin-auth/delete_user/${id}`);
};
