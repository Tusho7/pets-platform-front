import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-[1200px] mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {t("adminDashboard.overviewTitle")}
            </h2>
            <p className="text-gray-700">
              {t("adminDashboard.overviewDescription")}
            </p>
            <button
              onClick={() => navigate("/admin/users")}
              className="mt-4 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
            >
              {t("adminDashboard.manageUsersButton")}
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {t("adminDashboard.manageContentTitle")}
            </h2>
            <p className="text-gray-700">
              {t("adminDashboard.manageContentDescription")}
            </p>
            <button
              onClick={() => setIsContentModalOpen(true)}
              className="mt-4 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
            >
              {t("adminDashboard.manageContentButton")}
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {t("adminDashboard.settingsTitle")}
            </h2>
            <p className="text-gray-700">
              {t("adminDashboard.settingsDescription")}
            </p>
            <button
              onClick={() => navigate("/admin/settings")}
              className="mt-4 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300"
            >
              {t("adminDashboard.settingsButton")}
            </button>
          </div>
        </div>

        {isContentModalOpen && <Content onClose={handleCloseContentModal} />}
      </main>
    </div>
  );
};

export default AdminDashboard;
