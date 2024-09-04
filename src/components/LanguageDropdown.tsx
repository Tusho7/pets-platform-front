import { useState } from "react";
import { useTranslation } from "react-i18next";
import EnglishFlag from "../../public/usa-flag.webp";
import GeorgiaFlag from "../../public/georgia-flag.svg";

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
        className=" text-indigo-600 rounded-full flex items-center gap-2"
      >
        {i18n.language === "en" ? (
          <img
            src={EnglishFlag}
            className="w-5 h-5 rounded-md"
            onClick={() => handleChangeLanguage("en")}
          />
        ) : (
          <img
            src={GeorgiaFlag}
            className="w-5 h-5 rounded-md"
            onClick={() => handleChangeLanguage("ge")}
          />
        )}

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
          <section
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200  rounded-lg cursor-pointer"
            onClick={() => handleChangeLanguage("en")}
          >
            <img src={EnglishFlag} className="w-5 h-5 rounded-md" />
            <p>English</p>
          </section>
          <section
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200  rounded-lg cursor-pointer"
            onClick={() => handleChangeLanguage("ge")}
          >
            <img src={GeorgiaFlag} className="w-5 h-5 rounded-md" />
            <p> ქართული</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
