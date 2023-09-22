import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import homeTemplate_EN from "../src/locales/en/homeTemplate.json";
import homeTemplate_VI from "../src/locales/vi/homeTemplate.json";
import userTemplate_EN from "../src/locales/en/userTemplate.json";
import userTemplate_VI from "../src/locales/vi/userTemplate.json";
import adminTemplate_EN from "../src/locales/en/adminTemplate.json";
import adminTemplate_VI from "../src/locales/vi/adminTemplate.json";

const resources = {
  en: {
    homeTemplate: homeTemplate_EN,
    userTemplate: userTemplate_EN,
    adminTemplate: adminTemplate_EN,
  },
  vi: {
    homeTemplate: homeTemplate_VI,
    userTemplate: userTemplate_VI,
    adminTemplate: adminTemplate_VI,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  ns: ["homeTemplate", "userTemplate", "adminTemplate"],
  defaultNS: "homeTemplate",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
