import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";
import { HeaderProps } from "../types/Header";
import { useUser } from "../contexts/UseUser";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";
import PetLogo from "/pet-logo.png";

const Header = ({ openLoginModal }: HeaderProps) => {
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
    <header className="sticky top-0 left-0 w-full bg-gray-900 text-headerText flex justify-between items-center p-4 shadow-md z-50">
      <div className="max-w-[1200px] mx-auto flex justify-between w-full">
        <div className="flex gap-2 items-center justify-center">
          <img src={PetLogo} className="h-9" alt="Pet Logo" />
          <Link
            to="/"
            className="text-2xl md:text-3xl tracking-wide max-w-[150px] md:max-w-full"
          >
            {t("home.header")}
          </Link>
        </div>

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
