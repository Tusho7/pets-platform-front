import { useTranslation } from "react-i18next";
import { useUser } from "../contexts/UseUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCog,
  faLifeRing,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const DropDown = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <div className="absolute right-0 mt-80 w-64 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-xl z-10 profile-dropdown">
      <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
        <p className="font-bold text-lg">{user?.firstName}</p>
        <p className="text-sm text-gray-200">{user?.email}</p>
      </div>
      <ul className="py-2">
        <li>
          <button className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition-all duration-200">
            <FontAwesomeIcon icon={faUser} className="mr-3 text-indigo-600" />
            {t("profile.viewProfile")}
          </button>
        </li>
        <li>
          <button className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition-all duration-200">
            <FontAwesomeIcon icon={faCog} className="mr-3 text-indigo-600" />
            {t("profile.settings")}
          </button>
        </li>
        <li>
          <button className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-indigo-100 hover:text-indigo-700 rounded-md transition-all duration-200">
            <FontAwesomeIcon
              icon={faLifeRing}
              className="mr-3 text-indigo-600"
            />
            {t("profile.support")}
          </button>
        </li>
        <li>
          <hr className="my-2 border-gray-200" />
        </li>
        <li>
          <button className="flex items-center px-4 py-2 text-sm w-full text-left hover:bg-red-100 hover:text-red-700 rounded-md transition-all duration-200">
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="mr-3 text-red-600"
            />
            {t("profile.logout")}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
