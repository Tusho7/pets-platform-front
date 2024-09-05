import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { logoutAdmin } from "../../../services/api/adminAuth";
import { useNavigate } from "react-router-dom";
import LanguageDropdown from "../../../components/LanguageDropdown";

const DropDown = () => {
  const { t } = useTranslation();
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
    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-300">
      <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
        <p className="font-bold text-lg">{t("adminDashboard.title")}</p>
      </div>
      <ul className="py-2">
        <li>
          <button className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition-all duration-200">
            <FontAwesomeIcon icon={faUser} className="mr-3 text-indigo-600" />
            {t("adminDashboard.profile")}
          </button>
        </li>
        <li>
          <button className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition-all duration-200">
            <FontAwesomeIcon icon={faCog} className="mr-3 text-indigo-600" />
            {t("adminDashboard.settingsTitle")}
          </button>
        </li>
        <li>
          <div className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition-all duration-200">
            <LanguageDropdown />
          </div>
        </li>
        <li>
          <hr className="my-2 border-gray-200" />
        </li>
        <li>
          <button
            className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-red-100 hover:text-red-700 rounded-md transition-all duration-200"
            onClick={handleLogout}
          >
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="mr-3 text-red-600"
            />
            {t("adminDashboard.logoutButton")}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
