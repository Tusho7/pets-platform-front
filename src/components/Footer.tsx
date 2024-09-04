import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="absolute bottom-0 left-0 w-full p-6 bg-transparent text-center">
      <p className="text-sm opacity-75">
        &copy; 2024 {t("home.header")}. {t("home.footer")}
      </p>
    </footer>
  );
};

export default Footer;
