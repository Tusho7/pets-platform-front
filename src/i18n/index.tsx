import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import config from "./config";

i18n.use(LanguageDetector).use(initReactI18next).init(config);

export default i18n;
