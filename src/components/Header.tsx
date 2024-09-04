import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";
import { HeaderProps } from "../types/Header";
import { useUser } from "../contexts/UseUser";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";

const Header = ({ openLoginModal }: HeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      (e.target as Element).closest(".profile-dropdown") === null &&
      (e.target as Element).closest(".profile-image") === null
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownOpen]);

  return (
    <header className="sticky top-0 left-0 w-full bg-headerBg text-headerText flex justify-between items-center p-4 shadow-md">
      <div className="max-w-[1200px] mx-auto flex justify-between w-full">
        <h1
          className="text-2xl md:text-3xl font-extrabold tracking-wide max-w-[150px] md:max-w-full"
          onClick={() => navigate("/")}
        >
          {t("home.header")}
        </h1>
        <div className="flex gap-2 items-center justify-between relative">
          {user ? (
            <div className="flex items-center gap-2">
              {user.profilePicture &&
              typeof user.profilePicture === "string" ? (
                <img
                  src={import.meta.env.VITE_API_STORAGE + user.profilePicture}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer profile-image"
                  onClick={toggleDropdown}
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white cursor-pointer profile-image"
                  onClick={toggleDropdown}
                >
                  {user.firstName
                    ? user.firstName.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}
              {dropdownOpen && <DropDown />}
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="bg-white text-indigo-600 py-2 px-6 rounded-full shadow-lg hover:bg-indigo-100 transition-all duration-300"
            >
              {t("home.login")}
            </button>
          )}
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
