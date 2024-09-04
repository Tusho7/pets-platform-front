import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";
import { HeaderProps } from "../types/Header";

const Header = ({ openLoginModal }: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 left-0 w-full bg-headerBg text-headerText flex justify-between items-center p-4 shadow-md">
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
        {t("home.header")}
      </h1>
      <div className="flex gap-2 items-center">
        <LanguageDropdown />
        <button
          onClick={openLoginModal}
          className="bg-white text-indigo-600 py-2 px-6 rounded-full shadow-lg hover:bg-indigo-100 transition-all duration-300"
        >
          {t("home.login")}
        </button>
      </div>
    </header>
  );
};

export default Header;
