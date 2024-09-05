import enTranslation from "./locales/en/translation.json";
import geTranslation from "./locales/ge/translation.json";

const config = {
  resources: {
    en: {
      translation: enTranslation,
    },
    ge: {
      translation: geTranslation,
    },
  },
  lng: "ge",
  fallbackLng: "ge",
  debug: false,
  interpolation: {
    escapeValue: false,
  },
};

export default config;
