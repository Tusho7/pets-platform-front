import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-white text-indigo-600 py-2 px-4 rounded-full shadow-lg flex items-center gap-2"
      >
        <span className="md:hidden">
          {i18n.language === "en" ? "EN" : "GE"}
        </span>
        <span className="hidden md:flex">
          {i18n.language === "en" ? "English" : "ქართული"}
        </span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-indigo-600 rounded-lg shadow-lg">
          <button
            onClick={() => handleChangeLanguage("en")}
            className=" w-full rounded-lg text-left px-4 py-2 hover:bg-gray-200"
          >
            English
          </button>
          <button
            onClick={() => handleChangeLanguage("ge")}
            className="w-full rounded-lg text-left px-4 py-2 hover:bg-gray-200"
          >
            ქართული
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
