import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaUsers, FaFileAlt, FaCog, FaPen } from "react-icons/fa"; // Import FaPen for posts
import Header from "./components/Header";
import { useState } from "react";
import Content from "./modals/Content";

const AdminDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isContentModalOpen, setIsContentModalOpen] = useState(false);

  const handleCloseContentModal = () => {
    setIsContentModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Header />
      <div className="p-4">
        <main className="max-w-[1200px] mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white/60 backdrop-blur-lg shadow-lg rounded-2xl p-8 flex flex-col justify-between transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <FaUsers className="text-indigo-600 text-5xl p-3 bg-indigo-100 rounded-full" />
                <h2 className="ml-4 text-3xl font-semibold text-gray-900">
                  {t("adminDashboard.overviewTitle")}
                </h2>
              </div>
              <p className="text-gray-600 text-lg">
                {t("adminDashboard.overviewDescription")}
              </p>
              <button
                onClick={() => navigate("/admin_users")}
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300"
              >
                {t("adminDashboard.manageUsersButton")}
              </button>
            </div>

            <div className="bg-white/60 backdrop-blur-lg shadow-lg rounded-2xl p-8 flex flex-col justify-between transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <FaFileAlt className="text-green-600 text-5xl p-3 bg-green-100 rounded-full" />
                <h2 className="ml-4 text-3xl font-semibold text-gray-900">
                  {t("adminDashboard.manageContentTitle")}
                </h2>
              </div>
              <p className="text-gray-600 text-lg">
                {t("adminDashboard.manageContentDescription")}
              </p>
              <button
                onClick={() => setIsContentModalOpen(true)}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300 text-center"
              >
                {t("adminDashboard.manageContentButton")}
              </button>
            </div>

            <div className="bg-white/60 backdrop-blur-lg shadow-lg rounded-2xl p-8 flex flex-col justify-between transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <FaCog className="text-yellow-600 text-5xl p-3 bg-yellow-100 rounded-full" />
                <h2 className="ml-4 text-3xl font-semibold text-gray-900">
                  {t("adminDashboard.settingsTitle")}
                </h2>
              </div>
              <p className="text-gray-600 text-lg">
                {t("adminDashboard.settingsDescription")}
              </p>
              <Link
                className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300 text-center"
                to="/admin_settings"
              >
                {t("adminDashboard.settingsButton")}
              </Link>
            </div>

            <div className="bg-white/60 backdrop-blur-lg shadow-lg rounded-2xl p-8 flex flex-col justify-between transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-6">
                <FaPen className="text-blue-600 text-5xl p-3 bg-blue-100 rounded-full" />
                <h2 className="ml-4 text-3xl font-semibold text-gray-900">
                  {t("adminDashboard.managePostsTitle")}
                </h2>
              </div>
              <p className="text-gray-600 text-lg">
                {t("adminDashboard.managePostsDescription")}
              </p>
              <button
                onClick={() => navigate("/admin_posts")}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition-all duration-300"
              >
                {t("adminDashboard.managePostsButton")}
              </button>
            </div>
          </div>

          {isContentModalOpen && <Content onClose={handleCloseContentModal} />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
