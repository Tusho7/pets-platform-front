import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAdmin } from "../../../contexts/UseAdmin";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";

const Header = () => {
  const { admin } = useAdmin();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-md">
      <div className="max-w-[1200px] w-full mx-auto flex justify-between items-center">
        <Link to="/admin_dashboard" className="text-3xl font-bold">
          {t("adminDashboard.title")}
        </Link>
        <div className="relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="flex items-center gap-2">
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
          {isOpen && <DropDown />}
        </div>
      </div>
    </header>
  );
};

export default Header;
