import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PetLogo from "/pet-logo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="dark:bg-gray-900 w-full">
      <div className="p-4 py-6 lg:py-8 mx-auto w-full max-w-[1200px]">
        <div className="md:flex md:justify-between items-center">
          <div className="flex justify-center gap-2 items-center">
            <img src={PetLogo} className="h-8 " alt="Pet Logo" />
            <span className="text-2xl font-semibold dark:text-white">
              {t("home.header")}
            </span>
          </div>
          <div>
            <ul className="text-gray-500 dark:text-gray-400 font-medium flex flex-col lg:flex-row justify-between gap-5">
              <Link to="/faqs" className="hover:underline">
                <a href="#" className="hover:underline">
                  {t("footer.faqs")}
                </a>
              </Link>
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.about_us")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.terms_conditions")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {t("footer.support")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <div className="text-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 {t("footer.all_rights_reserved")}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
