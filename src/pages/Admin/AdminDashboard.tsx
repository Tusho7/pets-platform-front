import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../services/api/adminAuth";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      localStorage.clear();
      navigate("/admin_login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Overview
            </h2>
            <p className="text-gray-700">
              Welcome to the Admin Dashboard. Manage your application, view
              statistics, and configure settings.
            </p>
            <button
              onClick={() => navigate("/admin/users")}
              className="mt-4 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
            >
              Manage Users
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Manage Content
            </h2>
            <p className="text-gray-700">
              Edit content, manage About Us and FAQs sections, and more.
            </p>
            <button
              onClick={() => navigate("/admin/content")}
              className="mt-4 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
            >
              Manage Content
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Settings
            </h2>
            <p className="text-gray-700">
              Configure general settings and preferences for the application.
            </p>
            <button
              onClick={() => navigate("/admin/settings")}
              className="mt-4 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
            >
              General Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
