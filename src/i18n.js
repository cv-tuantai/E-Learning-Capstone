import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import homeTemplate_EN from "../src/locales/en/homeTemplate.json";
import homeTemplate_VI from "../src/locales/vi/homeTemplate.json";

const resources = {
  en: {
    homeTemplate: homeTemplate_EN,
  },
  vi: {
    homeTemplate: homeTemplate_VI,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  ns: ["homeTemplate"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
