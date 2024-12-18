import { useState, useEffect, MouseEvent } from "react";
import { FaBan, FaEllipsisV } from "react-icons/fa";
import { deleteUserById, getUsers } from "../../services/admin/users";
import { toggleUserBlock } from "../../services/admin/users";
import { User } from "../../types/User";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";

const AdminUsers = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleOptionClick = async (user: User, action: string) => {
    switch (action) {
      case "block":
        try {
          await toggleUserBlock(user.id);
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u.id === user.id ? { ...u, isBlocked: !u.isBlocked } : u
            )
          );
        } catch (error) {
          console.error("Error toggling user block status:", error);
        }
        break;
      case "delete":
        try {
          const result = await Swal.fire({
            title: t("deleteAlert.title"),
            text: t("deleteAlert.text"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: t("deleteAlert.confirm"),
            cancelButtonText: t("deleteAlert.cancel"),
          });

          if (result.isConfirmed) {
            await deleteUserById(user.id);
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
            Swal.fire({
              icon: "success",
              title: t("deleteSuccess.title"),
              text: t("deleteSuccess.text"),
            });
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            icon: "error",
            title: t("error.title"),
            text: t("error.text"),
          });
        }
        break;
      default:
        break;
    }
    setDropdownVisible(false);
  };

  const handleDropdownToggle = (
    event: MouseEvent<HTMLButtonElement>,
    user: User
  ) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setSelectedUser(user);
    setDropdownVisible(!dropdownVisible);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.phoneNumber?.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      (user.isBlocked ? "blocked" : "active")
        .toLowerCase()
        .includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Header />
      <section className="p-4">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
            {t("adminUsers.title")}
          </h1>
          <div className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={t("adminUsers.searchPlaceholder")}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-600">
              {t("adminUsers.noUsers")}
            </p>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      {t("adminUsers.profile")}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      {t("adminUsers.name")}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      {t("adminUsers.email")}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      {t("adminUsers.phone")}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      {t("adminUsers.status")}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      {t("adminUsers.userId")}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                      {t("adminUsers.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user: User) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <img
                          src={`${import.meta.env.VITE_API_STORAGE}${
                            user.profilePicture
                          }`}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.phoneNumber || "N/A"}</td>
                      <td className="px-6 py-4">
                        {user.isBlocked ? (
                          <span className="flex items-center text-red-600">
                            <FaBan className="mr-2" /> {t("adminUsers.blocked")}
                          </span>
                        ) : (
                          <span className="text-green-600">
                            {t("adminUsers.active")}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">{user.id}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(event) => handleDropdownToggle(event, user)}
                          className="text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                          <FaEllipsisV className="text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {dropdownVisible && selectedUser && (
                <div
                  style={{
                    top: dropdownPosition?.top,
                    left: dropdownPosition?.left,
                  }}
                  className="fixed bg-white border border-gray-300 rounded-lg shadow-lg z-50"
                >
                  <button
                    onClick={() => handleOptionClick(selectedUser, "block")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    {selectedUser.isBlocked
                      ? t("adminUsers.unblock")
                      : t("adminUsers.block")}
                  </button>
                  <button
                    onClick={() => handleOptionClick(selectedUser, "delete")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    {t("adminUsers.delete")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminUsers;
