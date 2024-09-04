import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="flex justify-center items-center mb-4">
      <p className="text-sm opacity-75">
        &copy; 2024 {t("home.header")}. {t("home.footer")}
      </p>
    </footer>
  );
};

export default Footer;
