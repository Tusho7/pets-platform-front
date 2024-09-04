import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";
import { HeaderProps } from "../types/Header";
import { useUser } from "../contexts/UseUser";

const Header = ({ openLoginModal }: HeaderProps) => {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <header className="sticky top-0 left-0 w-full bg-headerBg text-headerText flex justify-between items-center p-4 shadow-md">
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
        {t("home.header")}
      </h1>
      <div className="flex gap-2 items-center">
        <LanguageDropdown />
        {user ? (
          <div className="flex items-center gap-2">
            {user.profilePicture && typeof user.profilePicture === "string" ? (
              <img
                src={import.meta.env.VITE_API_STORAGE + user.profilePicture}
                alt="User Profile"
                className="w-10 h-10 rounded-full border-2 border-gray-300"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
                {user.firstName ? user.firstName.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <span>{user.firstName}</span>
          </div>
        ) : (
          <button
            onClick={openLoginModal}
            className="bg-white text-indigo-600 py-2 px-6 rounded-full shadow-lg hover:bg-indigo-100 transition-all duration-300"
          >
            {t("home.login")}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
