import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAdmin } from "../../../contexts/UseAdmin";
import DropDown from "./DropDown";

const Header = () => {
  const { admin } = useAdmin();
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-md">
      <div className="max-w-[1200px] w-full mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("adminDashboard.title")}</h1>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2"
          >
            {admin ? (
              <>
                {admin.profilePicture ? (
                  <img
                    src={
                      import.meta.env.VITE_API_STORAGE + admin.profilePicture
                    }
                    alt="Admin Profile"
                    className="w-12 h-12 rounded-full border-2 border-gray-400"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white text-xl font-semibold">
                    {admin.firstName
                      ? admin.firstName.charAt(0).toUpperCase()
                      : "A"}
                  </div>
                )}
                <span className="hidden md:flex text-lg font-semibold">
                  {admin.firstName} {admin.lastName}
                </span>
              </>
            ) : (
              <span className="text-lg text-gray-300">Admin</span>
            )}
          </button>
          {dropdownOpen && <DropDown />}
        </div>
      </div>
    </header>
  );
};

export default Header;
