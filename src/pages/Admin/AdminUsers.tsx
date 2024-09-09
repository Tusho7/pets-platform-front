import { useState, useEffect, MouseEvent } from "react";
import { FaBan, FaEllipsisV } from "react-icons/fa";
import { getUsers } from "../../services/admin/users";
import { toggleUserBlock } from "../../services/admin/users"; // Import the toggleUserBlock function
import { User } from "../../types/User";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

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
      case "edit":
        console.log(`Edit user ${user.id}`);
        break;
      case "block":
        try {
          await toggleUserBlock(user.id);
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u.id === user.id ? { ...u, isBlocked: !u.isBlocked } : u
            )
          );
          console.log(
            `User ${user.id} ${user.isBlocked ? "unblocked" : "blocked"}`
          );
        } catch (error) {
          console.error("Error toggling user block status:", error);
        }
        break;
      case "delete":
        console.log(`Delete user ${user.id}`);
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

  return (
    <div className="p-6 relative">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Admin Users
      </h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg relative">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {users.map((user: User) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 hover:bg-gray-50 relative"
                >
                  <td className="px-6 py-4">
                    <img
                      src={
                        import.meta.env.VITE_API_STORAGE + user.profilePicture
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
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
                        <FaBan className="mr-2" /> Blocked
                      </span>
                    ) : (
                      <span className="text-green-600">Active</span>
                    )}
                  </td>
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4 relative">
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
              className="fixed bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            >
              <button
                onClick={() => handleOptionClick(selectedUser, "edit")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Edit
              </button>
              <button
                onClick={() => handleOptionClick(selectedUser, "block")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                {selectedUser.isBlocked ? "Unblock" : "Block"}
              </button>
              <button
                onClick={() => handleOptionClick(selectedUser, "delete")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
